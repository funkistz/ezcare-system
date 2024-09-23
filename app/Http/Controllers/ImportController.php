<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Dealer;
use Illuminate\Http\Request;

class ImportController extends Controller
{

    public function dealer(Request $request)
    {
        $file = $request->file('file');
        $fileContents = file($file->getPathname());

        foreach ($fileContents as $key => $line) {
            $data = str_getcsv($line);

            if ($key > 0) {

                $dealer = Dealer::create([
                    'code' => $data[2],
                    'name' => $data[3],
                    'description' => ($data[4] == 'NULL') ? null : $data[4],
                    'phone_no' => ($data[11] == 'NULL') ? null : $data[11],
                    'phone_no2' => ($data[12] == 'NULL') ? null : $data[12],
                ]);

                $address = Address::create([
                    'addressable_id' => $dealer->id,
                    'addressable_type' => Dealer::class,
                    'line1' => $data[5],
                    'line2' => $data[6],
                    'line3' => $data[7],
                    'postcode' => $data[8],
                    'city' => strtolower($data[9]),
                    'state' => strtolower($data[10]),
                    'country' => 'MY',
                    'is_primary' => 1
                ]);
            }
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
