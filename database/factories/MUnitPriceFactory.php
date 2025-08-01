<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MUnitPrice>
 */
class MUnitPriceFactory extends Factory
{
    protected $model = \App\Models\MUnitPrice::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'unit_price_name' => $this->faker->word(),
            'km_unit_price' => 1000,
        ];
    }
}
