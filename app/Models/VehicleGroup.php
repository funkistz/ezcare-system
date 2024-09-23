<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleGroup extends Model
{
    use HasFactory,
        \App\Http\Traits\ToSelectDataTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'desc',
        'vehicle_brand_id',
    ];

    public function vehicle_brand()
    {
        return $this->belongsTo(VehicleBrand::class);
    }

    public function vehicle_models()
    {
        return $this->belongsToMany(
            VehicleModel::class,
            'models_vehicle_groups',
            'vehicle_group_id',
            'vehicle_model_id'
        );
    }

    public function plan_pricings()
    {
        return $this->hasMany(PlanPricing::class);
    }
}
