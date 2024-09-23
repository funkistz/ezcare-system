<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class VehicleFloorStockRequest extends FormRequest
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
            //
        ];
    }

    protected function passedValidation()
    {
        $this->merge([
            'date_in' => Carbon::parse($this->date_in)->setTimezone('Asia/Kuala_Lumpur'),
            'date_expired' => Carbon::parse($this->date_expired)->setTimezone('Asia/Kuala_Lumpur'),
            'settlement_date' => Carbon::parse($this->settlement_date)->setTimezone('Asia/Kuala_Lumpur'),
            'contra_date' => Carbon::parse($this->contra_date)->setTimezone('Asia/Kuala_Lumpur'),
        ]);
    }
}
