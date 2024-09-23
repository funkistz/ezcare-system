<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Workshop;
use Illuminate\Support\Facades\DB;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $workshops = new Workshop();
        DB::connection()->enableQueryLog();

        if ($request->lng && $request->lat) {
            $position = [
                'lat' => $request->lat,
                'lng' => $request->lng,
            ];
            $workshops = $workshops->select(
                DB::raw("workshops.*, ( 3959 * acos( cos( radians('" . $position['lat'] . "') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('" . $position['lng'] . "') ) + sin( radians('" . $position['lat'] . "') ) * sin( radians( lat ) ) ) ) AS distance")
            )
                // ->havingRaw('distance < 50')
                ->orderBy('distance');
        }
        if (!empty($request->search)) {
            $search = '%' . strtolower($request->search) . '%';
            $workshops->where('name', 'LIKE', $search);
        }
        if ($request->isEv == 'true') {
            $workshops->where('is_ev', true);
        }
        if ($request->isHybrid == 'true') {
            $workshops->where('is_hybrid', true);
        }

        $workshops = $workshops->with(['mainAddress'])->get();

        $queries = DB::getQueryLog();

        return response()->json([
            "status" => "success",
            "data" => $workshops,
            "queries" => $queries,
            "search" => $request->search,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
