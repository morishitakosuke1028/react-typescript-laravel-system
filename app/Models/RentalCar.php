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

    public static function createRentalCar(array $attributes): self
    {
        foreach ([
            'car_image_front',
            'car_image_side',
            'car_image_rear',
        ] as $field) {
            $newKey = 'new_' . $field;

            if (isset($attributes[$newKey]) && $attributes[$newKey] instanceof \Illuminate\Http\UploadedFile) {
                $attributes[$field] = $attributes[$newKey]->store($field, 'public');
            } elseif (!empty($attributes[$field]) && is_string($attributes[$field])) {
                $tempPath = $attributes[$field];
                $filename = basename($tempPath);
                $newPath = "rental_car_images/{$filename}";

                if (Storage::disk('public')->exists("temp_rental_car_images/{$filename}")) {
                    Storage::disk('public')->move("temp_rental_car_images/{$filename}", $newPath);
                    $attributes[$field] = $newPath;
                }
            }
            unset($attributes[$newKey]);
        }

        return self::create($attributes);
    }

    public function updateRentalCar(array $data): void
    {
        if (isset($data['new_car_image_front']) && $data['new_car_image_front'] instanceof \Illuminate\Http\UploadedFile) {
            $data['car_image_front'] = $data['new_car_image_front']->store('car_image_front', 'public');
            unset($data['new_car_image_front']);
        } elseif (isset($data['new_car_image_front'])) {
            unset($data['new_car_image_front']);
        }
        if (isset($data['new_car_image_side']) && $data['new_car_image_side'] instanceof \Illuminate\Http\UploadedFile) {
            $data['car_image_side'] = $data['new_car_image_side']->store('car_image_side', 'public');
            unset($data['new_car_image_side']);
        } elseif (isset($data['new_car_image_side'])) {
            unset($data['new_car_image_side']);
        }
        if (isset($data['new_car_image_rear']) && $data['new_car_image_rear'] instanceof \Illuminate\Http\UploadedFile) {
            $data['car_image_rear'] = $data['new_car_image_rear']->store('car_image_rear', 'public');
            unset($data['new_car_image_rear']);
        } elseif (isset($data['new_car_image_rear'])) {
            unset($data['new_car_image_rear']);
        }

        $this->fill($data)->save();
    }
}
