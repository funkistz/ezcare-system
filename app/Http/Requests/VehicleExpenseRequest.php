<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class VehicleExpenseRequest extends FormRequest
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
            // 'expense_type_id' => 'required',
            // 'expense_category_id' => 'required',
            // 'entity_id' => 'required',
            'price' => 'required',
            // 'invoice_no' => 'required',
            // 'date' => 'required',
        ];
    }

    protected function passedValidation()
    {
        $this->merge([
            'date' => Carbon::parse($this->date)->setTimezone('Asia/Kuala_Lumpur'),
        ]);
    }
}
