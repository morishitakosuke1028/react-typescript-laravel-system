<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMUnitPriceRequest;
use App\Http\Requests\UpdateMUnitPriceRequest;
use App\Models\MUnitPrice;
use Inertia\Inertia;

class MUnitPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $m_unit_prices = MUnitPrice::paginate(10);

        return Inertia::render('MUnitPrice/Index', [
            'm_unit_prices' => $m_unit_prices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('MUnitPrice/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMUnitPriceRequest $request)
    {
        MUnitPrice::createMUnitPrice(
            $request->only([
                'unit_price_name',
                'km_unit_price',
            ])
        );

        return to_route('MUnitPrices.index')->with([
            'message' => '登録しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MUnitPrice $m_unit_price)
    {
        return Inertia::render('MUnitPrice/Edit', [
            'm_unit_price' => $m_unit_price
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMUnitPriceRequest $request, MUnitPrice $m_unit_price)
    {
        $m_unit_price->updateMUnitPrice(
            $request->only([
                'unit_price_name',
                'km_unit_price',
            ])
        );

        return to_route('MUnitPrices.index')
        ->with([
            'message' => '更新しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $m_unit_price = MUnitPrice::findOrFail($id);
        $m_unit_price->delete();
        return to_route('MUnitPrices.index')
        ->with([
            'message' => '削除しました。',
            'status' => 'danger',
        ]);
    }
}
