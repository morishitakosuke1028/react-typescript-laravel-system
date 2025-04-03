<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MPointDeparture extends Model
{
    /** @use HasFactory<\Database\Factories\MPointDepartureFactory> */
    use HasFactory;

    protected $fillable = [
        'point_departure_name',
        'zip',
        'address',
    ];

    public static function createMPointDeparture(array $attributes)
    {
        return self::create($attributes);
    }
}
