<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WarrantyPlan extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'code',
        'name',
        'remarks',
        'year_package',
    ];

    protected $appends = ['oil_type_ids', 'available_service_types'];

    public function getOilTypeIdsAttribute()
    {
        $service_types = ServiceType::all();
        $result = [];

        foreach ($service_types as $key => $service_type) {
            $result["'" . $service_type->id . "'"] = $this->warrantyPlanOilTypes()->where('service_type_id', $service_type->id)->get()->pluck('oil_type_id')->toArray();
        }
        return $result;
    }

    public function warrantyPlanOilTypes()
    {
        return $this->hasMany(WarrantyPlanOilType::class, 'warranty_plan_id', 'id');
    }

    public function items()
    {
        return $this->hasMany(WarrantyPlanItem::class);
    }

    public function addonItems()
    {
        return $this->hasMany(WarrantyPlanItem::class)->where('type', 'addon');
    }

    public function coveredItems()
    {
        return $this->hasMany(WarrantyPlanItem::class)->where('type', 'covered');
    }

    public function itemChilds($with_addon)
    {
        $allItemId = $this->coveredItems->pluck('id');

        if ($with_addon == 1) {
            $addonItemId = $this->addonItems->pluck('id');

            if (!empty($addonItemId)) {
                $allItemId = $allItemId->merge($addonItemId);
            }
        }

        return WarrantyPlanItemChild::whereIn('warranty_plan_item_id', $allItemId)->get();

        // $items = [];
        // foreach ($childs as $key => $child) {
        //     array_push($items, [
        //         'label' => $child->name,
        //         'value' => (string)$child->id,
        //     ]);
        // }

        // return $items;
    }

    public function plan_pricings()
    {
        return $this->hasMany(PlanPricing::class);
    }

    public function files()
    {
        return $this->hasMany(WarrantyPlanFile::class);
    }

    public function filesByCondition($condition_id, $has_addon, $year)
    {
        $files = $this->files->where('vehicle_condition_id', $condition_id);

        if ($year) {
            $files = $files->where('year', $year);
        }

        if ($has_addon) {
            return  $files;
        } else {
            return  $files->where('remarks', '!=', 'addon');
        }
    }

    public function filesGrouped()
    {
        return $this->hasMany(WarrantyPlanFile::class)->groupBy('warranty_plan.vehicle_condition_id');
    }

    public function firstServices()
    {
        return $this->hasMany(WarrantyFirstService::class);
    }

    public function oilTypes()
    {
        return $this->belongsToMany(OilType::class, 'warranty_plan_oil_type', 'warranty_plan_id', 'oil_type_id');
    }

    public function claimLimits()
    {
        return $this->hasMany(WarrantyPlanClaimLimit::class);
    }

    public function getAvailableServiceTypesAttribute()
    {
        $first_services = $this->firstServices;

        $service_types = [];
        foreach ($first_services as $key => $first_service) {
            array_push($service_types, $first_service->serviceType);
        }

        return $service_types;
    }

    public function getAvailableOilTypesAttribute()
    {
        $oil_types = $this->oilTypes;

        // dd($oil_types);
        // $service_types = [];
        // foreach ($oil_types as $key => $oil_type) {
        //     // array_push($service_types, $first_service->serviceType);
        // }

        return $oil_types;
    }
}
