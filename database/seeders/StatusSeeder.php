<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('statuses')->insert([
            'code' => 'draft',
            'name' => 'draft',
        ]);
        DB::table('statuses')->insert([
            'code' => 'activated',
            'name' => 'activated',
        ]);
        DB::table('statuses')->insert([
            'code' => 'deactivated',
            'name' => 'deactivated',
        ]);
        DB::table('statuses')->insert([
            'code' => 'void',
            'name' => 'void',
        ]);

        DB::table('statuses')->insert([
            'code' => 'unpaid',
            'name' => 'unpaid',
        ]);
        DB::table('statuses')->insert([
            'code' => 'paid',
            'name' => 'paid',
        ]);
        DB::table('statuses')->insert([
            'code' => 'partial',
            'name' => 'partial',
        ]);
        DB::table('statuses')->insert([
            'code' => 'foc',
            'name' => 'FOC',
        ]);
    }
}
