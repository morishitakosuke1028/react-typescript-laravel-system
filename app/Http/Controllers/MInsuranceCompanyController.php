<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMInsuranceCompanyRequest;
use App\Http\Requests\UpdateMInsuranceCompanyRequest;
use App\Models\MInsuranceCompany;
use Inertia\Inertia;

class MInsuranceCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $m_insurance_companies = MInsuranceCompany::paginate(10);

        return Inertia::render('MInsuranceCompany/Index', [
            'm_insurance_companies' => $m_insurance_companies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('MInsuranceCompany/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMInsuranceCompanyRequest $request)
    {
        MInsuranceCompany::createMInsuranceCompany(
            $request->only([
                'insurance_company_name',
                'insurance_company_kana',
                'policy_number',
                'person_name',
                'tel',
                'email',
            ])
        );

        return to_route('MInsuranceCompanies.index')->with([
            'message' => '登録しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MInsuranceCompany $m_insurance_company)
    {
        return Inertia::render('MInsuranceCompany/Edit', [
            'm_insurance_company' => $m_insurance_company
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMInsuranceCompanyRequest $request, MInsuranceCompany $m_insurance_company)
    {
        $m_insurance_company->updateMInsuranceCompany(
            $request->only([
                'insurance_company_name',
                'insurance_company_kana',
                'policy_number',
                'person_name',
                'tel',
                'email',
            ])
        );

        return to_route('MInsuranceCompanies.index')
        ->with([
            'message' => '更新しました。',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $company = MInsuranceCompany::findOrFail($id);
        $company->delete();

        return to_route('MInsuranceCompanies.index')->with([
            'message' => '削除しました。',
            'status' => 'danger',
        ]);
    }
}
