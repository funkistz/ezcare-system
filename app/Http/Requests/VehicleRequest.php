<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class VehicleRequest extends FormRequest
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
            'stock_no' => 'required'
        ];
    }

    protected function passedValidation()
    {
        $this->merge([
            'year' => Carbon::parse($this->year)->setTimezone('Asia/Kuala_Lumpur'),
            'date_arrived_my' => Carbon::parse($this->date_arrived_my)->setTimezone('Asia/Kuala_Lumpur'),
            'eta' => Carbon::parse($this->eta)->setTimezone('Asia/Kuala_Lumpur'),
        ]);
    }
}
