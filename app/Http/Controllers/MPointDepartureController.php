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
        $m_point_departures = MPointDeparture::paginate(10);

        return Inertia::render('MPointDeparture/Index', [
            'm_point_departures' => $m_point_departures
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
        MPointDeparture::createMPointDeparture([
            'point_departure_name' => $request->point_departure_name,
            'zip' => $request->zip,
            'address' => $request->address,
        ]);

        return to_route('MPointDepartures.index')->with([
            'message' => '登録しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MPointDeparture $m_point_departure)
    {
        return Inertia::render('MPointDeparture/Edit', [
            'm_point_departure' => $m_point_departure
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMPointDepartureRequest $request, MPointDeparture $m_point_departure)
    {
        $m_point_departure->point_departure_name = $request->point_departure_name;
        $m_point_departure->zip = $request->zip;
        $m_point_departure->address = $request->address;
        $m_point_departure->save();
        return to_route('MPointDepartures.index')
        ->with([
            'message' => '更新しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MPointDeparture $m_point_departure)
    {
        //
    }
}
