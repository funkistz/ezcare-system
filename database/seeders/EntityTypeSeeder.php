<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('entity_types')->insert([
            [
                'code' => 'dealer',
                'name' => 'Dealer',
                'is_active' => 1,
            ],
            [
                'code' => 'ownership',
                'name' => 'Ownership',
                'is_active' => 1,
            ],
            [
                'code' => 'other',
                'name' => 'Other',
                'is_active' => 1,
            ]
        ]);
    }
}
