<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClaimItem extends Model
{
    use HasFactory;

    protected $appends = ['real_item_name'];

    public function getRealItemNameAttribute()
    {
        if ($this->item) {
            return $this->item->name;
        } else if (!empty($this->item_name)) {
            return $this->item_name;
        } else {
            return '';
        }
    }

    public function item()
    {
        return $this->belongsTo(WarrantyPlanItemChild::class, 'item_id', 'id');
    }
}
