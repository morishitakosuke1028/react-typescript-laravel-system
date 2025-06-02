<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmRentalCarRequest extends FormRequest
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
            'car_type' => ['required', 'string', 'max:255'],
            'car_inspection' => ['nullable', 'string', 'max:255'],
            'car_image_front' => ['nullable', 'file', 'image', 'max:2048'],
            'car_image_side' => ['nullable', 'file', 'image', 'max:2048'],
            'car_image_rear' => ['nullable', 'file', 'image', 'max:2048'],
            'memo' => ['nullable', 'string', 'max:65535'],
        ];
    }
}
