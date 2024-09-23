<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('general_settings')->insert([
            [
                'label' => 'IC Label',
                'name' => 'ic_label',
                'value' => 'KTP',
            ],
            [
                'label' => 'Grant Label',
                'name' => 'grant_label',
                'value' => 'STNK',
            ],
        ]);
    }
}
