<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentMethodFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'provider',
        'token',
        'brand',
        'last4',
        'exp_month',
        'exp_year',
    ];

    /**
     * 所有者ユーザー
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * このカードで行われた決済一覧
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
