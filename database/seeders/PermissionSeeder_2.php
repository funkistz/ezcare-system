<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder_2 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'app_dashboard.sales', 'description' => 'app dashboard sales']);
        Permission::create(['name' => 'app_dashboard.admin_mo', 'description' => 'app dashboard admin MO']);
        Permission::create(['name' => 'app_dashboard.mo', 'description' => 'app dashboard MO']);
        Permission::create(['name' => 'app_dashboard.policy', 'description' => 'app dashboard policy']);
        Permission::create(['name' => 'app_dashboard.payment', 'description' => 'app dashboard payment']);
    }
}
