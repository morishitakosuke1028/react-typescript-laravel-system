<?php

namespace Tests\Feature;

use App\Models\MInsuranceCompany;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MInsuranceCompanyControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_companies()
    {
        MInsuranceCompany::factory()->count(3)->create();

        $response = $this->get(route('MInsuranceCompanies.index'));

        $response->assertStatus(200);
        $response->assertSeeInertia(fn ($page) =>
            $page->component('MInsuranceCompany/Index')
                ->has('m_insurance_companies.data', 3)
        );
    }

    public function test_store_creates_new_company()
    {
        $data = [
            'insurance_company_name' => 'Test Insurance',
            'insurance_company_kana' => 'テストインシュアランス',
            'policy_number' => 'POL123456',
            'person_name' => '担当者名',
            'tel' => '0123456789',
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
            'insurance_company_name' => 'Updated Name',
            'insurance_company_kana' => 'アップデートネーム',
            'policy_number' => 'POL987654',
            'person_name' => '新しい担当者',
            'tel' => '0987654321',
            'email' => 'updated@example.com',
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
