<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    /** @use HasFactory<\Database\Factories\ClaimFactory> */
    use HasFactory;

    protected $fillable = [
        'm_point_departure_id',
        'other_point_departure_address',
        'local_address',
        'arrival_point_address',
        'transportation_image',
        'price',
        'm_insurance_company_id',
        'status',
        'm_unit_price_id',
        'workday',
        'worktime',
        'name',
        'customer_contact',
    ];

    public static function createClaim(array $attributes)
    {
        if (isset($attributes['transportation_image']) && $attributes['transportation_image'] instanceof \Illuminate\Http\UploadedFile) {
            $attributes['transportation_image'] = $attributes['transportation_image']->store('transportation_images', 'public');
        } else {
            unset($attributes['transportation_image']);
        }

        return self::create($attributes);
    }

    public function updateClaim(array $data): void
    {
        $this->fill($data)->save();
    }

    public function insuranceCompany()
    {
        return $this->belongsTo(MInsuranceCompany::class, 'm_insurance_company_id');
    }
}
