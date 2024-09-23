<?php

namespace App\Http\Middleware;

use App\Clara\Clara;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use App\Models\GeneralSetting;
use PSpell\Config;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    protected function createAcronym($string): ?string
    {
        $output = null;
        $token = strtok($string, ' ');
        while ($token !== false) {
            $output .= $token[0];
            $token = strtok(' ');
        }

        return $output;
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'country' => env('COUNTRY', 'id'),
            'auth' => [
                'user' => $request->user() ? [
                    'acronym' => $this->createAcronym($request->user()->name),
                    'id' => $request->user()->id,
                    'username' => $request->user()->username,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                ] : null,
            ],
            'permissions' => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
            'settings' => GeneralSetting::get()->keyBy('name'),
            'status' => Config('constant.status'),
            'timezone' => Config('app.timezone'),
            'flash' => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message'),
            ],
            'params' => $request->session()->get('params'),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(), ...[
                    'location' => $request->url(),
                    'query' => $request->query()
                ],
            ],

            'hasTermsAndPrivacyPolicyFeature' => Clara::hasTermsAndPrivacyPolicyFeature(),
        ]);
    }
}
