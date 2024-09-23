<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportQuotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone_no',
        'vehicle_model',
        'vehicle_year',
        'message',
    ];

    public function status()
    {
        return $this->hasOne(SupportQuoteStatus::class, 'support_quote_id', 'id');
    }
}
