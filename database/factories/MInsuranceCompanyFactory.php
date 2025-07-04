<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MInsuranceCompany>
 */
class MInsuranceCompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'insurance_company_name' => $this->faker->company,
            'insurance_company_kana' => $this->faker->kanaName,
            'policy_number' => $this->faker->bothify('POL#######'),
            'person_name' => $this->faker->name,
            'tel' => $this->faker->phoneNumber,
            'email' => $this->faker->safeEmail,
        ];
    }
}
