<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Claim extends Model  implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $casts = [
        'mileage' => 'integer',
    ];

    protected $fillable = [
        'type',
        'policy_id',
        'date',
        'mileage',
        'workshop',
        'remarks',
        'status_code',
        'created_by',
    ];

    protected $appends = ['created_by_name', 'can_edit', 'can_add_item', 'froze', 'can_pre_approve', 'can_pre_reject', 'can_approve', 'can_reject', 'can_appeal', 'can_generate_report'];

    public function getCreatedByNameAttribute()
    {
        if ($this->user) {
            return $this->user->name;
        } else {
            return '';
        }
    }

    public function getCanEditAttribute()
    {
        if ($this->status_code == config('constant.status.withdraw.value') || $this->status_code == config('constant.status.rejected.value') || $this->status_code == config('constant.status.approved.value')) {
            return false;
        } else {
            return true;
        }
    }

    public function getCanAddItemAttribute()
    {
        if ($this->type != 'claim') {
            return false;
        } else {
            return $this->can_edit;
        }
    }

    public function getFrozeAttribute()
    {
        if ($this->status_code == config('constant.status.withdraw.value') || $this->status_code == config('constant.status.approved.value')) {
            return false;
        } else {
            return true;
        }
    }

    public function getCanPreApproveAttribute()
    {
        if ($this->status_code == config('constant.status.draft.value') || $this->status_code == config('constant.status.pre_rejected.value')) {
            return true;
        } else {
            return false;
        }
    }

    public function getCanPreRejectAttribute()
    {
        if ($this->status_code == config('constant.status.draft.value') || $this->status_code == config('constant.status.pre_approved.value')) {
            return true;
        } else {
            return false;
        }
    }

    public function getCanApproveAttribute()
    {
        if (
            $this->status_code == config('constant.status.draft.value') || $this->status_code == config('constant.status.pre_approved.value') ||
            $this->status_code == config('constant.status.pre_rejected.value') || $this->status_code == config('constant.status.appeal.value') || config('constant.status.appeal.value')
        ) {
            return true;
        } else {
            return false;
        }
    }
    public function getCanRejectAttribute()
    {
        if (
            $this->status_code == config('constant.status.draft.value') || $this->status_code == config('constant.status.pre_approved.value') ||
            $this->status_code == config('constant.status.pre_rejected.value') || $this->status_code == config('constant.status.appeal.value') || config('constant.status.appeal.value')
        ) {
            return true;
        } else {
            return false;
        }
    }
    public function getCanAppealAttribute()
    {
        if (
            $this->status_code == config('constant.status.rejected.value')
        ) {
            return true;
        } else {
            return false;
        }
    }
    public function getCanGenerateReportAttribute()
    {
        if (
            count($this->claim_items) > 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    // public function getFilesAttribute()
    // {
    //     $this->files();
    // }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
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

    public function claim_statuses()
    {
        return $this->hasMany(ClaimStatus::class, 'claim_id', 'id');
    }

    public function files()
    {
        return $this->hasMany(ClaimFile::class, 'claim_id', 'id');
    }
}
