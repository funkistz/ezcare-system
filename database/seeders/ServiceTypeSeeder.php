<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('service_types')->insert([
            [
                'code' => 'engine',
                'name' => 'Engine Oil',
            ],
            [
                'code' => 'transmission',
                'name' => 'Transmission Oil',
            ],
            [
                'code' => 'ev',
                'name' => 'Electric Vehicle',
            ],
        ]);
    }
}
