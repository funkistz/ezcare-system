<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoverageFile extends Model
{
    use HasFactory;
    protected $table = 'coverages_file';
    protected $primaryKey = 'id';

    protected $fillable = [
        'type',
        'name',
        'remarks',
        'coverage_id',
        'file_id',
        'created_by',
        'mime',
        'url',
        'thumbnail_url',
        'activate_date'
    ];

    public function coverage()
    {
        return $this->belongsTo(Coverage::class);
    }
}
