<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarrantyPlanItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'type',
        'warranty_plan_id',
    ];

    public function warrantyPlan()
    {
        return $this->belongsTo(WarrantyPlan::class);
    }

    public function childs()
    {
        return $this->hasMany(WarrantyPlanItemChild::class);
    }
}
