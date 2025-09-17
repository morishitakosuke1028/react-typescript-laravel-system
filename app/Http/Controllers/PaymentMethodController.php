<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentMethodRequest;
use App\Models\PaymentMethod;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $methods = auth()->user()->paymentMethods()->latest()->get();
        return view('payment_methods.index', compact('methods'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('payment_methods.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentMethodRequest $request)
    {
        PaymentMethod::create([
            'user_id' => auth()->id(),
            'provider' => 'stripe',
            'token' => $request->token,
            'brand' => $request->brand,
            'last4' => $request->last4,
            'exp_month' => $request->exp_month,
            'exp_year' => $request->exp_year,
        ]);

        return redirect()->route('payment_methods.index')
                         ->with('success', 'カードを登録しました。');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        if ($paymentMethod->user_id !== auth()->id()) {
            abort(403, 'このカードを削除する権限がありません。');
        }

        $paymentMethod->delete();

        return redirect()->route('payment_methods.index')
                         ->with('success', 'カードを削除しました。');
    }
}
