<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClaimRequest;
use App\Http\Requests\UpdateClaimRequest;
use App\Models\Claim;
use App\Models\MUnitPrice;
use App\Models\MPointDeparture;
use App\Models\MInsuranceCompany;
use Inertia\Inertia;

class ClaimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $claims = Claim::with('insuranceCompany')->paginate(10);

        return Inertia::render('Claim/Index', [
            'claims' => $claims
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Claim/Create', [
            'pointDepartures' => MPointDeparture::all(),
            'insuranceCompanies' => MInsuranceCompany::all(),
            'unitPrices' => MUnitPrice::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClaimRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Claim $claim)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClaimRequest $request, Claim $claim)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Claim $claim)
    {
        //
    }
}
