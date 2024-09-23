<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'addressable_id',
        'addressable_type',
        'line1',
        'line2',
        'line3',
        'postcode',
        'city',
        'state',
        'country',
        'is_primary',
    ];
}
