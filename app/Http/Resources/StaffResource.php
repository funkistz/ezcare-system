<?php

namespace App\Http\Resources;

use App\Models\GeneralSetting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $mo_exclude = GeneralSetting::where('name', 'report_mo_exclude_user_ids')->first();
        $mo_exclude_ids = json_decode($mo_exclude->value);

        $newArray = parent::toArray($request);
        $newArray['is_exclude_report'] =  $this->IsExcludeReport($mo_exclude_ids);

        return $newArray;
    }
}
