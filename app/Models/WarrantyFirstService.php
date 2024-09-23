<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarrantyFirstService extends Model
{
    use HasFactory;

    protected $appends = ['service_type_name'];

    public function getServiceTypeNameAttribute()
    {
        return $this->serviceType->name;
    }

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class, 'service_type_id', 'id');
    }
}
