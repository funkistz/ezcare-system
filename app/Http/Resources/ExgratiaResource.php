<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ExgratiaResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->dealer->name,
            'status_code' => strtoupper($this->status_code),
            'status_color' => $this->status_color,
            'status_color' => $this->status_color,
            'created_at' => Carbon::parse($this->created_at)->format('d/m/Y'),
            'details' => [
                // 'xxx'
            ],
        ];
    }
}
