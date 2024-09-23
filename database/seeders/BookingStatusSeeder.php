<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('booking_statuses')->insert([
            [
                'code' => 'pending',
                'name' => 'Pending',
                'is_active' => 1,
            ],
            [
                'code' => 'approved',
                'name' => 'Approved',
                'is_active' => 1,
            ],
            [
                'code' => 'rejected',
                'name' => 'Rejected',
                'is_active' => 1,
            ]
        ]);
    }
}
