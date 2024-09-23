<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleBrand extends Model
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
        'code',
        'name',
        'type',
        'image_url',
    ];

    public function models()
    {
        return $this->hasMany(VehicleModel::class, 'brand_code', 'code')->orderBy('name');
    }

    public function variants()
    {
        return $this->hasMany(VehicleVariant::class, 'brand_code', 'code')->orderBy('name');
    }

    public function vehicle_groups()
    {
        return $this->hasMany(VehicleGroup::class);
    }
}
