<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class OilType extends Model
{
    use HasFactory;

    protected $casts = [
        'mileage_cycle' => 'json',
        'month_cycle' => 'json',
    ];

    protected $fillable = [
        'type',
        'service_type_id',
        'name',
        'description',
        'mileage_cycle',
        'month_cycle',
    ];

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function warrantyPlans()
    {
        return $this->belongsToMany(OilType::class, 'warranty_plan_oil_type', 'oil_type_id', 'warranty_plan_id');
    }

    public function warrantyPlanIDs()
    {
        return $this->warrantyPlans->pluck('id');
    }

    public function scopeToSelectData(Builder $query)
    {
        return $query->get()->map(function ($model) {
            return [
                'label' => ucwords($model->name),
                'value' => strval($model->id),
                'type' => strval($model->type),
                'description' => strval($model->description),
            ];
        });
    }

    public function getCycle($cycle)
    {

        $mileage_cycle = [];
        $month_cycle = [];

        for ($i = 0; $i < 100; $i++) {
            $mileage_cycle = array_merge($mileage_cycle, $this->mileage_cycle);
            $month_cycle = array_merge($month_cycle, $this->month_cycle);
        }

        return [
            'mileage_cycle' => $mileage_cycle[$cycle],
            'month_cycle' => $month_cycle[$cycle],
        ];
    }
}
