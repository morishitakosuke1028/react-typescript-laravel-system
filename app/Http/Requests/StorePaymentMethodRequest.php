<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentMethodRequest extends FormRequest
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
            'token' => ['required', 'string'],
            'brand' => ['nullable', 'string', 'max:50'],
            'last4' => ['nullable', 'string', 'size:4'],
            'exp_month' => ['nullable', 'integer', 'between:1,12'],
            'exp_year' => ['nullable', 'integer', 'min:' . date('Y')],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'カード情報のトークンが必要です。',
            'last4.size' => 'カード番号の下4桁を正しく入力してください。',
            'exp_month.between' => '有効期限の月は1〜12で指定してください。',
            'exp_year.min' => '有効期限の年は現在の年以降で指定してください。',
        ];
    }
}
