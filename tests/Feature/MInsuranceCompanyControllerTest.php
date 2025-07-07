<?php

namespace Tests\Feature;

use App\Models\MInsuranceCompany;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Log;

class MInsuranceCompanyControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();
        $this->actingAs($user);
        $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
    }

    public function test_index_displays_companies()
    {
        MInsuranceCompany::factory()->count(3)->create();

        $response = $this->get(route('MInsuranceCompanies.index'));

        $response->assertStatus(200);
    }

    public function test_store_creates_new_company()
    {
        $this->actingAs(User::factory()->create());

        $data = [
            'insurance_company_name' => 'テスト保険',
            'insurance_company_kana' => 'テストホケン',
            'policy_number' => 'POL1234567',
            'person_name' => '田中太郎',
            'tel' => '09012345678',
            'email' => 'test@example.com',
        ];

        $response = $this->post(route('MInsuranceCompanies.store'), $data);

        $response->assertRedirect(route('MInsuranceCompanies.index'));

        $this->assertDatabaseHas('m_insurance_companies', $data);
    }

    public function test_update_edits_existing_company()
    {
        $company = MInsuranceCompany::factory()->create();

        $updatedData = [
            'insurance_company_name' => '新社名',
            'insurance_company_kana' => 'シンシャメイ',
            'policy_number' => 'POL7654321',
            'person_name' => '佐藤次郎',
            'tel' => '08012345678',
            'email' => 'update@example.com',
        ];

        $response = $this->put(route('MInsuranceCompanies.update', $company), $updatedData);

        $response->assertRedirect(route('MInsuranceCompanies.index'));
        $this->assertDatabaseHas('m_insurance_companies', $updatedData);
    }

    public function test_destroy_deletes_company()
    {
        $company = MInsuranceCompany::factory()->create();

        $response = $this->delete(route('MInsuranceCompanies.destroy', $company));

        $response->assertRedirect(route('MInsuranceCompanies.index'));
        $this->assertDatabaseMissing('m_insurance_companies', ['id' => $company->id]);
    }
}
