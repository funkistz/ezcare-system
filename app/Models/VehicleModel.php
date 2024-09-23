<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleModel extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'brand_code',
        'code',
        'name',
        'type',
    ];

    public function brand()
    {
        return $this->belongsTo(VehicleBrand::class);
    }

    public function vehicle_groups()
    {
        return $this->belongsToMany(
            VehicleGroup::class,
            'models_vehicle_groups',
            'vehicle_model_id',
            'vehicle_group_id',
        );
    }
}
