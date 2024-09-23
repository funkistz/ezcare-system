<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Vehicle extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'registration_no',
        'chassis_no',
        'engine_no',
        'description',
        'power_capacity',
        'power_type',
        'mileage',
        'year',
        'registration_date',
        'vehicle_brand_id',
        'vehicle_model_id',
        'vehicle_variant_id',
        'vehicle_condition_id',
    ];

    protected $appends = ['name', 'power', 'brand_name', 'model_name', 'condition_name'];

    protected function registrationNo(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => strtoupper($value),
        );
    }

    public function getNameAttribute($value)
    {
        $name = '';
        if (isset($this->brand)) {
            $name = strtoupper($this->brand->name);
        }
        if (isset($this->model)) {
            $name .= ' ' . strtoupper($this->model->name);
        }

        return $name;
    }

    public function getBrandNameAttribute($value)
    {
        return isset($this->brand) ? $this->brand->name : '';
    }

    public function getModelNameAttribute($value)
    {
        return isset($this->model) ? $this->model->name : '';
    }

    public function getConditionNameAttribute($value)
    {
        return isset($this->condition) ? $this->condition->name : '';
    }

    public function getPowerAttribute($value)
    {
        return $this->power_capacity . $this->power_type;
    }

    public function brand()
    {
        return $this->belongsTo(VehicleBrand::class, 'vehicle_brand_id', 'id');
    }

    public function model()
    {
        return $this->belongsTo(VehicleModel::class, 'vehicle_model_id', 'id');
    }

    public function condition()
    {
        return $this->belongsTo(VehicleCondition::class, 'vehicle_condition_id', 'id');
    }

    public static function addOrUpdate($attr)
    {
        $registration_date = new Carbon($attr['registration_date']);
        $year = Carbon::parse($attr['year'])->setTimezone(config('app.timezone'));
        $year =  $year->year;

        if (!empty($attr['id'])) {
            $vehicle = Vehicle::find($attr['id']);
            $vehicle = $vehicle->update(
                [
                    'registration_no' => !empty($attr['registration_no']) ? $attr['registration_no'] : null,
                    'chassis_no' => !empty($attr['chassis_no']) ? $attr['chassis_no'] : null,
                    'engine_no' => !empty($attr['engine_no']) ? $attr['engine_no'] : null,
                    'mileage' => !empty($attr['mileage']) ? $attr['mileage'] : null,
                    'year' => !empty($attr['year']) ? $year : null,
                    'registration_date' => !empty($attr['registration_date']) ? $registration_date : null,
                ]
            );
        } else {

            $vehicle = self::updateOrCreate(
                ['registration_no' => $attr['registration_no']],
                [
                    'registration_no' => !empty($attr['registration_no']) ? $attr['registration_no'] : null,
                    'chassis_no' => !empty($attr['chassis_no']) ? $attr['chassis_no'] : null,
                    'engine_no' => !empty($attr['engine_no']) ? $attr['engine_no'] : null,
                    // 'description' => !empty($attr['description']) ? $attr['description'] : null,
                    'power_capacity' => !empty($attr['power_capacity']) ? $attr['power_capacity'] : null,
                    'power_type' => !empty($attr['power_type']) ? $attr['power_type'] : null,
                    'mileage' => !empty($attr['mileage']) ? $attr['mileage'] : null,
                    'year' => !empty($attr['year']) ? $year : null,
                    'registration_date' => !empty($attr['registration_date']) ? $registration_date : null,
                    'vehicle_brand_id' => !empty($attr['vehicle_brand_id']) ? $attr['vehicle_brand_id'] : null,
                    'vehicle_model_id' => !empty($attr['vehicle_model_id']) ? $attr['vehicle_model_id'] : null,
                    'vehicle_variant_id' => !empty($attr['vehicle_variant_id']) ? $attr['vehicle_variant_id'] : null,
                    'vehicle_condition_id' => !empty($attr['vehicle_condition_id']) ? $attr['vehicle_condition_id'] : null,
                ]
            );
        }

        return $vehicle;
    }
}
