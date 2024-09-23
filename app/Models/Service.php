<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Service extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $appends = ['oil_name', 'oil_type_name', 'created_by_name'];

    public function getCreatedByNameAttribute()
    {
        if ($this->user) {
            return $this->user->name;
        } else {
            return '';
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function getOilNameAttribute()
    {
        $name = !empty($this->oilType) ? $this->oilType->name : '';
        return $name;
    }
    public function getOilTypeNameAttribute()
    {
        $name = !empty($this->oilType) ? $this->oilType->type : '';
        return $name;
    }

    public function oilType()
    {
        return $this->belongsTo(OilType::class, 'oil_type_id', 'id');
    }

    public function files()
    {
        return $this->hasMany(ServiceFile::class, 'service_id', 'id');
    }

    public function reminderFiles()
    {
        return $this->hasMany(ServiceFile::class, 'service_id', 'id')->where('variant', 'reminder');
    }

    public function workshopFiles()
    {
        return $this->hasMany(ServiceFile::class, 'service_id', 'id')->where('variant', 'workshop');
    }

    public function mileageFiles()
    {
        return $this->hasMany(ServiceFile::class, 'service_id', 'id')->where('variant', 'mileage');
    }

    public function otherFiles()
    {
        return $this->hasMany(ServiceFile::class, 'service_id', 'id')->where('variant', 'other');
    }

    public static function addService()
    {
    }
}
