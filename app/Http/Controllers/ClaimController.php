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
        Claim::createClaim(
            $request->only([
                'm_point_departure_id',
                'other_point_departure_address',
                'local_address',
                'arrival_point_address',
                'transportation_image',
                'price',
                'm_insurance_company_id',
                'status',
                'm_unit_price_id',
                'workday',
                'worktime',
                'name',
                'customer_contact'
            ])
        );

        return to_route('Claims.index')->with([
            'message' => '登録しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Claim $claim)
    {
        return Inertia::render('Claim/Edit', [
            'claim' => $claim,
            'pointDepartures' => MPointDeparture::all(),
            'insuranceCompanies' => MInsuranceCompany::all(),
            'unitPrices' => MUnitPrice::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClaimRequest $request, Claim $claim)
    {
        $claim->updateClaim(
            $request->only([
                'm_point_departure_id',
                'other_point_departure_address',
                'local_address',
                'arrival_point_address',
                'transportation_image',
                'price',
                'm_insurance_company_id',
                'status',
                'm_unit_price_id',
                'workday',
                'worktime',
                'name',
                'customer_contact'
            ])
        );

        return to_route('Claims.index')->with([
            'message' => '登録しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Claim $claim)
    {
        //
    }
}
