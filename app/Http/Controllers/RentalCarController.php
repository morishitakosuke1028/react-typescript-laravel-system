<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmRentalCarRequest;
use App\Http\Requests\StoreRentalCarRequest;
use App\Http\Requests\UpdateRentalCarRequest;
use Illuminate\Http\Request;
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
    public function create(Request $request)
    {
        if ($request->query('clear_session') === '1') {
            session()->forget('rental_car_form');
        }

        return Inertia::render('RentalCar/Create');
    }

    /**
     * Display the specified resource.
     */
    public function confirm(ConfirmRentalCarRequest $request)
    {
        $validated = $request->validated();

        $fileFields = [
            'new_car_image_front',
            'new_car_image_side',
            'new_car_image_rear',
        ];

        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                $validated[$field] = $request->file($field)->store('temp_rental_car_images', 'public');
            }
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

        return redirect()->route('RentalCars.index')->with([
            'message' => '更新しました。',
            'status' => 'success',
        ]);
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
        $data = $request->validated();
        $rental_car->updateRentalCar($data);

        return redirect()->route('RentalCars.index')->with([
            'message' => '更新しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RentalCar $rental_car)
    {
        $rental_car->delete();
        return to_route('RentalCars.index')
        ->with([
            'message' => '削除しました。',
            'status' => 'danger',
        ]);
    }
}
