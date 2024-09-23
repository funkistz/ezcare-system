<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class File extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
        'mime',
        'url',
        'thumbnail_url',
    ];

    public function warrantyPlans(): MorphToMany
    {
        return $this->morphedByMany(WarrantyPlan::class, 'fileable');
    }

    public function vehicles(): MorphToMany
    {
        return $this->morphedByMany(Vehicle::class, 'fileable');
    }

    public function policies()
    {
        return $this->morphedByMany(Policy::class, 'fileable');
    }

    public function policyFile()
    {
        return $this->hasOne(PolicyFile::class);
    }
}
