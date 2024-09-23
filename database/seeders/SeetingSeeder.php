<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('general_settings')->insert([
            [
                'description' => 'Policy Years',
                'name' => 'policy_years',
                'value' => '[{"label":"6 months","value":"0.5"},{"label":"1 Year","value":"1"},{"label":"2 Years","value":"2"},{"label":"3 Years","value":"3"},{"label":"4 Years","value":"4"},{"label":"5 Years","value":"5"},{"label":"6 Years","value":"6"},{"label":"7 Years","value":"7"},{"label":"8 Years","value":"8"},{"label":"9 Years","value":"9"},{"label":"10 Years","value":"10"}]'
            ],
        ]);
    }
}
