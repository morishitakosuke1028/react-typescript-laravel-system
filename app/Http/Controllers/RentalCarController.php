<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmRentalCarRequest;
use App\Http\Requests\StoreRentalCarRequest;
use App\Http\Requests\UpdateRentalCarRequest;
use App\Models\RentalCar;
use Inertia\Inertia;

class RentalCarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rental_cars = RentalCar::paginate(10);

        return Inertia::render('RentalCar/Index', [
            'rental_cars' => $rental_cars
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('RentalCar/Create');
    }

    /**
     * Display the specified resource.
     */
    public function confirm(ConfirmRentalCarRequest $request)
    {
        $validated = $request->validated();

        foreach (['car_image_front', 'car_image_side', 'car_image_rear'] as $field) {
            if ($request->hasFile($field)) {
                $validated[$field] = $request->file($field)->store('temp_rental_car_images', 'public');

            }
        }

        if ($request->hasFile('car_image_front')) {
            $path = $request->file('car_image_front')->store('temp_rental_car_images', 'public');
            logger("保存パス: $path");
            dd($path);
        }

        return Inertia::render('RentalCar/Confirm', [
            'form' => $validated,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRentalCarRequest $request)
    {
        $data = $request->validated();

        RentalCar::createRentalCar($data);

        return redirect()->route('RentalCars.create')->with('success', '登録しました。');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RentalCar $rental_car)
    {
        return Inertia::render('RentalCar/Edit', [
            'rental_car' => $rental_car
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRentalCarRequest $request, RentalCar $rental_car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RentalCar $rental_car)
    {
        //
    }
}
