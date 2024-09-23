<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'setting.view']);
        Permission::create(['name' => 'setting.edit']);
        Permission::create(['name' => 'setting.delete']);
        Permission::create(['name' => 'policy.view']);
        Permission::create(['name' => 'policy.add']);
        Permission::create(['name' => 'policy.edit']);
        Permission::create(['name' => 'policy.delete']);
        Permission::create(['name' => 'staff.view']);
        Permission::create(['name' => 'staff.add']);
        Permission::create(['name' => 'staff.edit']);
        Permission::create(['name' => 'staff.delete']);
        Permission::create(['name' => 'customer.view']);
        Permission::create(['name' => 'customer.add']);
        Permission::create(['name' => 'customer.edit']);
        Permission::create(['name' => 'customer.delete']);
    }
}
