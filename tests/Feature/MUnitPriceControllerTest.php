<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\MUnitPrice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MUnitPriceControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithoutMiddleware;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
        $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
    }

    public function test_index_displays_unit_prices()
    {
        MUnitPrice::factory()->count(3)->create();

        $response = $this->get(route('MUnitPrices.index'));
        $response->assertStatus(200);
    }
}
