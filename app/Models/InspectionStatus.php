<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InspectionStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'inspectable_id',
        'inspectable_type',
        'status_code',
        'reason_code',
        'remarks',
        'created_by',
    ];

    public function inspectable()
    {
        return $this->morphTo();
    }
}
