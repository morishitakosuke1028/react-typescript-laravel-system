<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClaimRequest extends FormRequest
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
        $rules = [
            'm_point_departure_id' => ['nullable', 'integer', 'min:1'],
            'other_point_departure_address' => ['nullable', 'string', 'max:255'],
            'local_address' => ['nullable', 'string', 'max:255'],
            'arrival_point_address' => ['nullable', 'string', 'max:255'],
            'price' => ['nullable', 'integer', 'min:0'],
            'm_insurance_company_id' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:0,1'],
            'm_unit_price_id' => ['required', 'integer', 'min:1'],
            'workday' => ['nullable', 'date'],
            'worktime' => ['nullable', 'date_format:Y-m-d H:i:s'],
            'name' => ['required', 'string', 'max:50'],
            'customer_contact' => ['required', 'string', 'max:255'],
        ];

        // ファイルがアップロードされた場合のみバリデーションを適用
        if ($this->hasFile('transportation_image')) {
            $rules['transportation_image'] = ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png', 'max:2048'];
        }

        return $rules;
    }
}
