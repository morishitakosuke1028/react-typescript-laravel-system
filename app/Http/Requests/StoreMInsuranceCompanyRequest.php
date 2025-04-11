<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMInsuranceCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'insurance_company_name' => ['required', 'string', 'max:50'],
            'insurance_company_kana' => ['required', 'string', 'max:50', 'regex:/^[ァ-ヶー\s]+$/u'],
            'policy_number' => ['required', 'string', 'max:50', 'unique:m_insurance_companies,policy_number'],
            'person_name' => ['required', 'string', 'max:50'],
            'tel' => ['required', 'string', 'max:20', 'regex:/^0\d{1,4}-\d{1,4}-\d{3,4}$|^0\d{9,10}$/', 'unique:m_insurance_companies,tel'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:m_insurance_companies,email'],
        ];
    }
}
