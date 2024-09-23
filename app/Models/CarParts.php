<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarParts extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'name',
        'description',
        'code',
        'variant',
        'supplier_id',
        'brand_id',
        'model_id',
        'year',
        'cost_price',
        'selling_price',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }

    public function VehicleModel()
    {
        return $this->belongsTo(VehicleModel::class, 'model_id', 'id');
    }

    public function VehicleBrand()
    {
        return $this->belongsTo(VehicleBrand::class, 'brand_id', 'id');
    }
}
