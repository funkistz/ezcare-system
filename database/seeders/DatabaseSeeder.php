<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //         \App\Models\User::factory(10)->create();

        // echo Hash::make('123456');

        DB::table('users')->insert([
            'name' => 'Syimir idris',
            'email' => 'funkistzgm@gmail.com',
            'password' => Hash::make('123456'),
        ]);

        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'ezcarewarranty.api@gmail.com',
            'password' => Hash::make('ezcarewarranty'),
        ]);
    }
}
