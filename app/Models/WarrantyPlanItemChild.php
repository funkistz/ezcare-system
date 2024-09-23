<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarrantyPlanItemChild extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'warranty_plan_item_id',
    ];

    public function warrantyPlanItem()
    {
        return $this->belongsTo(WarrantyPlanItem::class);
    }
}
