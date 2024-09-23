<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'variant',
        'type',
        'name',
        'remarks',
        'service_id',
        'file_id',
        'created_by',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
