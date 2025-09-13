<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'payment_method_id',
        'amount',
        'currency',
        'status',
        'transaction_id',
    ];

    /**
     * 決済を行ったユーザー
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 使用した支払い方法（カード）
     */
    public function method()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }

    /**
     * 金額をフォーマットするアクセサ（例: 1,200円）
     */
    public function getFormattedAmountAttribute()
    {
        return number_format($this->amount) . ' ' . $this->currency;
    }
}
