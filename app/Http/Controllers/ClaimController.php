<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreclaimRequest;
use App\Http\Requests\UpdateclaimRequest;
use App\Models\claim;

class ClaimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreclaimRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(claim $claim)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(claim $claim)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateclaimRequest $request, claim $claim)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(claim $claim)
    {
        //
    }
}
