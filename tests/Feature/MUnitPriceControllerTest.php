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

    public function test_create_displays_form()
    {
        $response = $this->get(route('MUnitPrices.create'));
        $response->assertStatus(200);
    }

    public function test_store_creates_new_unit_price()
    {
        $data = [
            'unit_price_name' => 'テスト単価',
            'km_unit_price' => 1000,
        ];

        $response = $this->post(route('MUnitPrices.store'), $data);

        $response->assertRedirect(route('MUnitPrices.index'));
        $this->assertDatabaseHas('m_unit_prices', $data);
    }

    public function test_edit_displays_existing_unit_price()
    {
        $unitPrice = MUnitPrice::factory()->create();

        $response = $this->get(route('MUnitPrices.edit', $unitPrice));
        $response->assertStatus(200);
    }

    public function test_update_edits_existing_unit_price()
    {
        $unitPrice = MUnitPrice::factory()->create();

        $updatedData = [
            'unit_price_name' => '更新単価',
            'km_unit_price' => 2000,
        ];

        $response = $this->put(route('MUnitPrices.update', $unitPrice), $updatedData);
        $response->assertRedirect(route('MUnitPrices.index'));

        $this->assertDatabaseHas('m_unit_prices', $updatedData);
    }

    public function test_destroy_deletes_unit_price()
    {
        $unitPrice = MUnitPrice::factory()->create();

        $response = $this->delete(route('MUnitPrices.destroy', $unitPrice));
        $response->assertRedirect(route('MUnitPrices.index'));

        $this->assertDatabaseMissing('m_unit_prices', ['id' => $unitPrice->id]);
    }
}
