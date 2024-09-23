<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class warranty_plan_item_children_seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('warranty_plan_item_children')->insert([
            'code' => 'towing',
            'name' => 'Towing',
        ]);
    }
}
