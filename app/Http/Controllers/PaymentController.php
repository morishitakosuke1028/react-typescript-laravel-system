<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Models\Payment;
use App\Models\PaymentMethod;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = auth()->user()
            ->payments()
            ->with('method')
            ->orderByDesc('created_at')
            ->get();

        return view('payments.index', compact('payments'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $method = PaymentMethod::where('user_id', auth()->id())
            ->findOrFail($request->payment_method_id);

        $transactionId = 'ch_' . uniqid();

        Payment::create([
            'user_id' => auth()->id(),
            'payment_method_id' => $method->id,
            'amount' => $request->amount,
            'currency' => $request->currency,
            'status' => 'succeeded',
            'transaction_id' => $transactionId,
        ]);

        return redirect()->route('payments.index')
                         ->with('success', '支払いが完了しました。');
    }
}
