<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalCar extends Model
{
    /** @use HasFactory<\Database\Factories\RentalCarFactory> */
    use HasFactory;

    protected $fillable = [
        'car_type',
        'car_inspection',
        'car_image_front',
        'car_image_side',
        'car_image_rear',
        'memo',
    ];
}
