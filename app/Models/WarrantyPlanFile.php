<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarrantyPlanFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'remarks',
        'policy_id',
        'file_id',
        'created_by',
    ];

    public function warrantyPlan()
    {
        return $this->belongsTo(WarrantyPlan::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
