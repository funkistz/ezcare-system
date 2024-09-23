<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Banner;
use App\Http\Resources\ConfigResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use App\Models\Vacancy;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $country = env('COUNTRY', 'id');
        $banners = ConfigResource::collection(Banner::where('is_active', 1)->orderBy('position', 'ASC')->paginate(1000));

        if ($country == 'id') {
            return Inertia::render('Home');
        } else {
            return Inertia::render('MY/Home', [
                'banners' => $banners
            ]);
        }
    }

    public function contactUs(Request $request)
    {
        $country = env('COUNTRY', 'id');

        if ($country == 'id') {
            return Inertia::render('Blog/ContactUs');
        } else {
            return Inertia::render('Blog/ContactUsMy');
        }
    }

    public function aboutUs(Request $request)
    {
        $country = env('COUNTRY', 'id');

        if ($country == 'id') {
            return Inertia::render('Blog/AboutUs');
        } else {
            return Inertia::render('Blog/AboutUsMy');
        }
    }

    public function ourProduct(Request $request)
    {
        $country = env('COUNTRY', 'id');

        if ($country == 'id') {
            return Inertia::render('Blog/OurProducts');
        } else {
            return Inertia::render('Blog/OurProductsMy');
        }
    }

    public function ecwMobileServices(Request $request)
    {
        return Inertia::render('Blog/EcwMobileServices');
    }

    public function groupOfCompanies(Request $request)
    {
        return Inertia::render('Blog/GroupOfCompanies');
    }

    public function setLanguage(Request $request)
    {
        // dd($request->toArray());
        if (!empty($request->locale)) {
            App::setLocale($request->locale);
            Session::put('locale', $request->locale);

            echo App::currentLocale();
        }
    }

    public function media(Request $request)
    {
        $country = env('COUNTRY', 'id');

        if ($country == 'id') {
            return Inertia::render('Blog/Media');
        } else {
            return Inertia::render('Blog/MediaMy');
        }
    }

    public function career(Request $request)
    {

        $careers = ConfigResource::collection(Vacancy::where('is_active', 1)->orderBy('position', 'ASC')->get());

        return Inertia::render('Blog/Career', [
            'careers' => $careers
        ]);
    }

    public function privacy(Request $request)
    {

        return Inertia::render('Blog/Privacy');
    }
}
