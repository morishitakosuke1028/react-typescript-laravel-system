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

    public function test_store_creates_new_departure()
    {
        $data = [
            'point_departure_name' => 'テスト出発地',
            'zip' => '1234567',
            'address' => '東京都港区',
        ];

        $response = $this->post(route('MPointDepartures.store'), $data);

        $response->assertRedirect(route('MPointDepartures.index'));
        $this->assertDatabaseHas('m_point_departures', $data);
    }

    public function test_edit_displays_existing_departure()
    {
        $departure = MPointDeparture::factory()->create();

        $response = $this->get(route('MPointDepartures.edit', $departure));
        $response->assertStatus(200);
    }

    public function test_update_edits_existing_departure()
    {
        $departure = MPointDeparture::factory()->create();

        $updatedData = [
            'point_departure_name' => '更新された出発地',
            'zip' => '7654321',
            'address' => '大阪市北区',
        ];

        $response = $this->put(route('MPointDepartures.update', $departure), $updatedData);

        $response->assertRedirect(route('MPointDepartures.index'));
        $this->assertDatabaseHas('m_point_departures', $updatedData);
    }

    public function test_destroy_deletes_departure()
    {
        $departure = MPointDeparture::factory()->create();

        $response = $this->delete(route('MPointDepartures.destroy', $departure));
        $response->assertRedirect(route('MPointDepartures.index'));

        $this->assertDatabaseMissing('m_point_departures', ['id' => $departure->id]);
    }

    public function test_destroy_fails_with_nonexistent_id()
    {
        $response = $this->delete(route('MPointDepartures.destroy', ['m_point_departure' => 9999]));

        $response->assertStatus(404);
    }
}
