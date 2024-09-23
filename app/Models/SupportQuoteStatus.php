<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportQuoteStatus extends Model
{
    use HasFactory;
    protected $table = 'support_quote_status';

    protected $fillable = [
        'support_quote_id',
        'status',
    ];

    public function supportquotation()
    {
        return $this->belongsTo(SupportQuotation::class, 'support_quote_id', 'id');
    }
}
