<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClaimDeniedStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('general_settings')->insert([
            [
                // 'label' => 'Claim Denied Status',
                'name' => 'claim_denied_statuses',
                'value' => "[
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
                ]"
            ],
        ]);
    }
}
