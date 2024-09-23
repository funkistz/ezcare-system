<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MobileSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('general_settings')->insert([
            [
                'label' => 'Policy Content',
                'name' => 'm_policy_content',
                'value' => '',
            ],
            [
                'label' => 'Phone Numbers',
                'name' => 'm_phone_numbers',
                'value' => '',
            ],
            [
                'label' => 'Whatsapp Numbers',
                'name' => 'm_whatsapp_numbers',
                'value' => '',
            ],
            [
                'label' => 'Whatsapp Template',
                'name' => 'm_whatsapp_template',
                'value' => '',
            ],
            [
                'label' => 'About-us Link',
                'name' => 'm_about_us_link',
                'value' => '',
            ],
            [
                'label' => 'Contact-us Link',
                'name' => 'm_contact_us_link',
                'value' => '',
            ],
            [
                'label' => 'Facebook Link',
                'name' => 'm_facebook_link',
                'value' => '',
            ],
            [
                'label' => 'Tiktok Link',
                'name' => 'm_tiktok_link',
                'value' => '',
            ],
            [
                'label' => 'Youtube Link',
                'name' => 'm_youtube_link',
                'value' => '',
            ],
            [
                'label' => 'Website Link',
                'name' => 'm_website_link',
                'value' => '',
            ],
            [
                'label' => 'Instagram Lin',
                'name' => 'm_instagram_link',
                'value' => '',
            ],
        ]);
    }
}
