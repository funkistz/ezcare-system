<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'super-admin']);
        $role = Role::create(['name' => 'admin']);
        $role = Role::create(['name' => 'staff']);
        $role = Role::create(['name' => 'seller']);
        $role = Role::create(['name' => 'mo']);
        $role = Role::create(['name' => 'technical']);
        $role = Role::create(['name' => 'customer']);
    }
}
