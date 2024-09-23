<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class VehicleWarrantyRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'vehicle_id' => 'required',
            'policy_no' => 'required',
            // 'date' => 'required',
            // 'amount' => 'required',
            // 'validity_date' => 'required',
        ];
    }

    protected function passedValidation()
    {
        $this->merge([
            'date' => Carbon::parse($this->date)->setTimezone('Asia/Kuala_Lumpur'),
            'validity_date' => Carbon::parse($this->validity_date)->setTimezone('Asia/Kuala_Lumpur'),
        ]);
    }
}
