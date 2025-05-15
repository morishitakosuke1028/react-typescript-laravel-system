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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRentalCarRequest $request)
    {
        //
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
