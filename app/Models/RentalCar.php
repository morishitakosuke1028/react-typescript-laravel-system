<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
                $attributes[$field] = $attributes[$newKey]->store("rental_car_images", 'public');
            } elseif (!empty($attributes[$newKey]) && is_string($attributes[$newKey])) {
                $tempPath = $attributes[$newKey];
                $filename = basename($tempPath);
                $sourcePath = "temp_rental_car_images/{$filename}";
                $targetPath = "rental_car_images/{$filename}";

                if (Storage::disk('public')->exists($sourcePath)) {
                    Storage::disk('public')->move($sourcePath, $targetPath);
                    $attributes[$field] = $targetPath;
                }
            }

            unset($attributes[$newKey]);
        }

        return self::create($attributes);
    }

    public function updateRentalCar(array $data): void
    {
        foreach ([
            'car_image_front',
            'car_image_side',
            'car_image_rear',
        ] as $field) {
            $newKey = 'new_' . $field;

            if (isset($data[$newKey]) && $data[$newKey] instanceof \Illuminate\Http\UploadedFile) {
                $data[$field] = $data[$newKey]->store($field, 'public');
            } elseif (!empty($data[$newKey]) && is_string($data[$newKey])) {
                $filename = basename($data[$newKey]);
                $sourcePath = "temp_rental_car_images/{$filename}";
                $targetPath = "{$field}/{$filename}";

                if (Storage::disk('public')->exists($sourcePath)) {
                    Storage::disk('public')->move($sourcePath, $targetPath);
                    $data[$field] = $targetPath;
                }
            }

            unset($data[$newKey]);
        }

        $this->fill($data)->save();
    }
}
