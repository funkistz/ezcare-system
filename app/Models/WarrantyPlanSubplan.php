<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WarrantyPlanSubplan extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'code',
        'name',
        'description',
        'warranty_plan_code',
    ];

    public function warrantyPlan()
    {
        return $this->belongsTo(WarrantyPlan::class, 'warranty_plan_code', 'code');
    }
}
