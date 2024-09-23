<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClaimStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'claim_id',
        'status_code',
        'reason_code',
        'remarks',
        'created_by'
    ];

    protected $appends = ['created_by_name', 'reason'];

    public function getCreatedByNameAttribute()
    {
        if ($this->user) {
            return $this->user->name;
        } else {
            return '';
        }
    }

    public function getReasonAttribute()
    {
        $claim_denied_statuses = [
            [
                'label' => 'Lack of Servicing',
                'value' => '1',
            ],
            [
                'label' => 'No Supporting Documents',
                'value' => '2',
            ],
            [
                'label' => 'Items No Covered',
                'value' => '3',
            ],
            [
                'label' => 'Cooling Off Period',
                'value' => '4',
            ],
            [
                'label' => 'No Quotation From Workshop',
                'value' => '5',
            ],
            [
                'label' => 'Repair Without Permission',
                'value' => '6',
            ],
            [
                'label' => 'Fraudulent Claim',
                'value' => '7',
            ],
            [
                'label' => 'Claim Denial And Policy Continue',
                'value' => '8',
            ],
            [
                'label' => 'Mileage Overlimit',
                'value' => '9',
            ],
            [
                'label' => 'Claim Overlimit',
                'value' => '10',
            ]
        ];

        $reason_key = array_search('1', array_column($claim_denied_statuses, 'value'));

        if ($reason_key != false) {
            return $claim_denied_statuses[$reason_key]['label'];
        } else {
            return '';
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
