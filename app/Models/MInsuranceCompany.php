<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MInsuranceCompany extends Model
{
    /** @use HasFactory<\Database\Factories\MInsuranceCompanyFactory> */
    use HasFactory;

    protected $fillable = [
        'insurance_company_name',
        'insurance_company_kana',
        'policy_number',
        'person_name',
        'tel',
        'email',
    ];

    public static function createMInsuranceCompany(array $attributes)
    {
        return self::create($attributes);
    }

    public function updateMInsuranceCompany(array $data): void
    {
        $this->fill($data)->save();
    }
}
