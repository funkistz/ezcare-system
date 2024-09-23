<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use App\Http\Resources\ConfigResource;
use App\Models\MobileBanner;

class MobileBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = ConfigResource::collection(MobileBanner::where('is_active', 1)->orderBy('position', 'ASC')->paginate(1000));

        return inertia('MobileSettings/Banner/Index', [
            'banners' =>  $banners,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image_url' => 'required',
            'position' => 'required',
        ]);

        try {
            $banner = new MobileBanner();
            $banner->name = $request->name;
            $banner->link = $request->link;
            $banner->image_url = $request->image_url;
            $banner->is_active = $request->is_active;
            $banner->position = Banner::max('position') ? Banner::max('position') : 1;
            $banner->save();

            $banner->updatePosition($request->position);

            return back()->with([
                'type' => 'success',
                'message' => 'Mobile Banner has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'image_url' => 'required',
            'position' => 'required',
        ]);

        try {
            $banner = MobileBanner::find($id);
            $banner->name = $request->name;
            $banner->link = $request->link;
            $banner->image_url = $request->image_url;
            $banner->is_active = $request->is_active;
            // $banner->position = $request->position;
            $banner->save();

            $banner->updatePosition($request->position);

            return back()->with([
                'type' => 'success',
                'message' => 'Mobile Banner has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $banner = MobileBanner::find($id);
            $banner->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Mobile Banner has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function changePosition(Request $request, string $id)
    {
        try {
            $banner = MobileBanner::find($id);
            $banner->updatePosition($request->position);

            return back()->with([
                'type' => 'success',
                'message' => 'Mobile Banner has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function changeActive(Request $request, string $id)
    {
        try {
            $banner = MobileBanner::find($id);
            $banner->is_active = $request->is_active;
            $banner->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Mobile Banner has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}
