<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PlanDiscount extends Model
{
    use HasFactory;

    use HasFactory,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'name',
        'description',
        'type',
        'amount',
    ];

    public function getRealDiscountAttribute()
    {
        if ($this->type == 'percentage') {
            return (float)$this->amount . '%';
        } else if ($this->type == 'exact') {
            return $this->amount;
        } else if ($this->type == 'year') {
            return (int)$this->amount . ' year';
        }
    }

    public function scopeToRealDiscount(Builder $query)
    {
        return $query->get()->map(function ($brand) {

            if ($brand->type == 'percentage') {
                $brand->discount = (float)$brand->amount . '%';
            } else if ($brand->type == 'exact') {
                $brand->discount = $brand->amount;
            } else if ($brand->type == 'year') {
                $brand->discount = (int)$brand->amount . ' year';
            }

            return $brand;
        });
    }
}
