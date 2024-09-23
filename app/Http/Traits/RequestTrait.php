<?php

namespace App\Http\Traits;

use App\Models\Branch;
use App\Models\Dealer;
use App\Models\File;
use App\Models\FreePromo;
use App\Models\InspectionStatus;
use App\Models\User;
use App\Models\WarrantyPlan;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

trait RequestTrait
{

    public function getStatusColorAttribute()
    {
        if ($this->status_code == 'pending') {
            return 'orange';
        } else  if ($this->status_code == 'ongoing') {
            return 'pink';
        } else  if ($this->status_code == 'completed') {
            return 'green';
        } else  if ($this->status_code == 'pending') {
            return 'green';
        } else  if ($this->status_code == 'proceed') {
            return 'green';
        } else  if ($this->status_code == 'rejected') {
            return 'red';
        } else {
            return 'gray';
        }
    }

    public function getCreatedByNameAttribute()
    {
        if ($this->author) {
            return $this->author->name;
        } else {
            return '';
        }
    }

    public function getMarketingOfficerNameAttribute()
    {
        if ($this->marketingOfficer) {
            return $this->marketingOfficer->name;
        } else {
            return '';
        }
    }
    public function getDealerNameAttribute()
    {
        if ($this->dealer) {
            return $this->dealer->name;
        } else {
            return '';
        }
    }
    public function getWarrantyPlanNameAttribute()
    {
        if ($this->warrantyPlan) {
            return $this->warrantyPlan->name;
        } else {
            return '';
        }
    }

    public function marketingOfficer()
    {
        return $this->belongsTo(User::class, 'marketing_officer_id', 'id');
    }

    public function dealer()
    {
        return $this->belongsTo(Dealer::class, 'dealer_id', 'id');
    }

    public function warrantyPlan()
    {
        return $this->belongsTo(WarrantyPlan::class, 'warranty_plan_id', 'id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function statuses()
    {
        return $this->morphMany(InspectionStatus::class, 'inspectable');
    }

    public function scopeByDate(Builder $query, $date): void
    {
        $start = $date->copy()->startOfDay();
        $end = $date->copy()->endOfDay();

        $query->where('created_at', '>=', $start)->where('created_at', '<=', $end);
    }

    public function scopeByCreatedDate(Builder $query, $date): void
    {
        $start = $date->copy()->startOfDay();
        $end = $date->copy()->endOfDay();

        $query->where('created_at', '>=', $start)->where('created_at', '<=', $end);
    }

    public function scopeByBranch(Builder $query, $branch): void
    {
        if (!empty($branch) && $branch != 'all') {
            $query->where('branch_id', $branch);
        }
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'fileable');
    }
}
