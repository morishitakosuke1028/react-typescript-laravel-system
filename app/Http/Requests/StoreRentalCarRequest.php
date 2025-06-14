<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRentalCarRequest extends FormRequest
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
            'car_type' => ['nullable', 'string', 'max:255'],
            'car_inspection' => ['nullable', 'string', 'max:255'],
            'new_car_image_front' => ['nullable', 'string'],
            'new_car_image_side' => ['nullable', 'string'],
            'new_car_image_rear' => ['nullable', 'string'],
        ];

        return $rules;
    }
}
