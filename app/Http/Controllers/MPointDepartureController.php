<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMPointDepartureRequest;
use App\Http\Requests\UpdateMPointDepartureRequest;
use App\Models\MPointDeparture;
use Inertia\Inertia;

class MPointDepartureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $m_point_departures = MPointDeparture::all();

        return Inertia::render('MPointDeparture/Index', [
            'm_point_departures' => $m_point_departures,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('MPointDeparture/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMPointDepartureRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MPointDeparture $m_point_departure)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MPointDeparture $m_point_departure)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMPointDepartureRequest $request, MPointDeparture $m_point_departure)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MPointDeparture $m_point_departure)
    {
        //
    }
}
