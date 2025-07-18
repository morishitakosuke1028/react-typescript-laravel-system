<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\MPointDeparture;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MPointDepartureControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithoutMiddleware;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
        $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
    }

    public function test_index_displays_departures()
    {
        MPointDeparture::factory()->count(5)->create();

        $response = $this->get(route('MPointDepartures.index'));
        $response->assertStatus(200);
    }

    public function test_create_displays_form()
    {
        $response = $this->get(route('MPointDepartures.create'));
        $response->assertStatus(200);
    }
}
