<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\m_point_departure>
 */
class MPointDepartureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'point_departure_name' => $this->faker->city . '出発地',
            'zip' => $this->faker->postcode(),
            'address' => $this->faker->address(),
        ];
    }
}
