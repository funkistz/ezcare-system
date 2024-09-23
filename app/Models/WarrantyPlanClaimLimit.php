<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarrantyPlanClaimLimit extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'remarks',
        'warranty_plan_id',
        'amount_limit',
    ];

    public function warrantyPlan()
    {
        return $this->belongsTo(WarrantyPlan::class);
    }
}
