<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class PolicyClaim extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'policy_id',
        'customer_phone_no',
        'location',
        'workshop_name',
        'workshop_phone_no',
        'remarks',
        'technician_id',
        'status_code',
        'created_by',
    ];

    protected $appends = ['created_by_name', 'technician_name', 'location_name', 'can_edit', 'can_add_item', 'can_approve', 'can_deny'];

    public function getCanApproveAttribute()
    {
        if ($this->status_code == 'processing') {
            return true;
        } else {
            return false;
        }
    }

    public function getCanDenyAttribute()
    {
        if ($this->status_code == 'processing') {
            return true;
        } else {
            return false;
        }
    }

    public function policy()
    {
        return $this->belongsTo(Policy::class, 'policy_id', 'id');
    }

    public function getLocationNameAttribute()
    {
        if ($this->location == 1) {
            return 'home';
        } else {
            return 'workshop';
        }
    }

    public function getCreatedByNameAttribute()
    {
        if ($this->createdBy) {
            return $this->createdBy->name;
        } else {
            return '';
        }
    }

    public function getTechnicianNameAttribute()
    {
        if ($this->technician_id) {
            return $this->technician->name;
        } else {
            return '';
        }
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id', 'id');
    }

    public function getCanEditAttribute()
    {
        if ($this->status_code == 'denied' || $this->status_code == 'approved') {
            return false;
        } else {
            return true;
        }
    }

    public function getCanAddItemAttribute()
    {
        if ($this->status_code == 'pending' || $this->status_code == 'denied' || $this->status_code == 'approved') {
            return false;
        } else {
            return true;
        }
    }

    public function claim_statuses()
    {
        return $this->hasMany(ClaimStatus::class, 'claim_id', 'id');
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'fileable');
    }

    public function covered_items()
    {
        return $this->claim_items->whereNotNull('item_id');
    }

    public function uncovered_items()
    {
        return $this->claim_items->whereNull('item_id');
    }

    public function claim_items()
    {
        return $this->hasMany(ClaimItem::class, 'claim_id', 'id');
    }

    public function claim_payments()
    {
        return $this->hasMany(ClaimPayment::class, 'claim_id', 'id');
    }
}
