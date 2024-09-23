<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class PermissionSeeder2 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'workshop.view']);
        Permission::create(['name' => 'workshop.add']);
        Permission::create(['name' => 'workshop.edit']);
        Permission::create(['name' => 'workshop.delete']);

        Permission::create(['name' => 'mobile-setting.view']);
        Permission::create(['name' => 'mobile-setting.add']);
        Permission::create(['name' => 'mobile-setting.edit']);
        Permission::create(['name' => 'mobile-setting.delete']);
    }
}
