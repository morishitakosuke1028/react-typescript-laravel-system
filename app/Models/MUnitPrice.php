<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MUnitPrice extends Model
{
    /** @use HasFactory<\Database\Factories\MUnitPriceFactory> */
    use HasFactory;

    protected $fillable = [
        'unit_price_name',
        'km_unit_price',
    ];

    public static function createMUnitPrice(array $attributes)
    {
        return self::create($attributes);
    }

    public function updateMUnitPrice(array $data): void
    {
        $this->fill($data)->save();
    }
}
