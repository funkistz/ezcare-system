<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class VehicleTtRequest extends FormRequest
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
            'foreign_price' => 'required',
            'foreign_currency_rate' => 'required',
            'bank_charges' => 'required',
            'price' => 'required',
            'date' => 'required',
        ];
    }

    protected function passedValidation()
    {
        $this->merge([
            'date' => Carbon::parse($this->date)->setTimezone('Asia/Kuala_Lumpur'),
        ]);
    }
}
