<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GeneralSetting;

class MobileSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mobile_settings = GeneralSetting::get()->keyBy('name');

        $currency_symbols = [
            [
                'label' => 'RM',
                'value' => 'rm',
            ],
            [
                'label' => 'Rp',
                'value' => 'rp',
            ],
        ];
        $phone_country_codes = [
            [
                'label' => '60',
                'value' => '60',
            ],
            [
                'label' => '62',
                'value' => '62',
            ],
        ];

        return inertia('MobileSettings/General/Index', [
            'mobile_settings' =>  $mobile_settings,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        isset($attr['m_policy_content']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_policy_content'],
            ['value' => $attr['m_policy_content']]
        );
        isset($attr['m_phone_numbers']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_phone_numbers'],
            ['value' => $attr['m_phone_numbers']]
        );
        isset($attr['m_whatsapp_numbers']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_whatsapp_numbers'],
            ['value' => $attr['m_whatsapp_numbers']]
        );
        isset($attr['m_whatsapp_template']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_whatsapp_template'],
            ['value' => $attr['m_whatsapp_template']]
        );
        isset($attr['m_about_us_link']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_about_us_link'],
            ['value' => $attr['m_about_us_link']]
        );
        isset($attr['m_contact_us_link']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_contact_us_link'],
            ['value' => $attr['m_contact_us_link']]
        );
        isset($attr['m_facebook_link']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_facebook_link'],
            ['value' => $attr['m_facebook_link']]
        );
        isset($attr['m_tiktok_link']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_tiktok_link'],
            ['value' => $attr['m_tiktok_link']]
        );
        isset($attr['m_youtube_link']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_youtube_link'],
            ['value' => $attr['m_youtube_link']]
        );
        isset($attr['m_website_link']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_website_link'],
            ['value' => $attr['m_website_link']]
        );
        isset($attr['m_instagram_link']) && GeneralSetting::updateOrCreate(
            ['name' => 'm_instagram_link'],
            ['value' => $attr['m_instagram_link']]
        );

        return back()->with([
            'type' => 'success',
            'message' => 'Mobile setting been updated',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
