<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleVariant extends Model
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
        'model_code',
        'code',
        'name',
    ];

    public function model()
    {
        return $this->belongsTo(VehicleModel::class);
    }

    public function brand()
    {
        return $this->belongsTo(VehicleModel::class);
    }
}
