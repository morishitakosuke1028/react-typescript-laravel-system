<?php

namespace App\Http\Controllers;

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
        $rental_car = RentalCar::paginate(10);

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
    public function confirm(RentalCar $rental_car)
    {
        $validated = $request->validate([
            'car_type' => ['required', 'string', 'max:255'],
            'car_inspection' => ['required', 'string', 'max:255'],
            'car_image_front' => ['nullable', 'file', 'image', 'max:2048'],
            'car_image_side' => ['nullable', 'file', 'image', 'max:2048'],
            'car_image_rear' => ['nullable', 'file', 'image', 'max:2048'],
            'memo' => ['nullable', 'string', 'max:65535'],
        ]);

        // 一時保存
        foreach (['car_image_front', 'car_image_side', 'car_image_rear'] as $field) {
            if ($request->hasFile($field)) {
                $tempPath = $request->file($field)->store('temp_rental_car_images', 'public');
                $validated[$field] = $tempPath;
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
        $data = $request->all();

        foreach (['car_image_front', 'car_image_side', 'car_image_rear'] as $field) {
            if (!empty($data[$field])) {
                $filename = basename($data[$field]);
                $newPath = "rental_car_images/{$filename}";
                Storage::disk('public')->move("temp_rental_car_images/{$filename}", $newPath);
                $data[$field] = $newPath;
            }
        }

        RentalCar::create($data);

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
