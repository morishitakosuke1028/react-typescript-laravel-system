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

    public static function createRentalCar(array $attributes)
    {
        if (isset($attributes['new_car_image_front']) && $attributes['new_car_image_front'] instanceof \Illuminate\Http\UploadedFile) {
            $attributes['car_image_front'] = $attributes['new_car_image_front']->store('car_image_front', 'public');
        } else {
            unset($attributes['car_image_front']);
        }
        if (isset($attributes['new_car_image_side']) && $attributes['new_car_image_side'] instanceof \Illuminate\Http\UploadedFile) {
            $attributes['car_image_side'] = $attributes['new_car_image_side']->store('car_image_side', 'public');
        } else {
            unset($attributes['car_image_side']);
        }
        if (isset($attributes['new_car_image_rear']) && $attributes['new_car_image_rear'] instanceof \Illuminate\Http\UploadedFile) {
            $attributes['car_image_rear'] = $attributes['new_car_image_rear']->store('car_image_rear', 'public');
        } else {
            unset($attributes['car_image_rear']);
        }

        return self::create($attributes);
    }
}
