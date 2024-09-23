<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Coverage extends Model
{
    use HasFactory,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'name',
        'description',
        'price',
        'dealer_price',
        'is_active',
    ];

    public function document()
    {
        return $this->hasMany(CoverageFile::class)->orderBy('activate_date', 'desc');
    }

    public function getDocByCondition($policyActiveDate)
    {
        $check = $this->hasMany(CoverageFile::class)->get();
        
        $data = $this->hasMany(CoverageFile::class)
        ->orderBy('activate_date', 'desc')
        ->where('activate_date', '<=', Carbon::createFromFormat('j/n/Y', $policyActiveDate)->format('Y-m-d'))
        ->first();

        return $data;

    }

}