<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder8 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create permissions
        Permission::create(['name' => 'inspection.delete']);
        Permission::create(['name' => 'inspection.edit']);
        Permission::create(['name' => 'noninspection.delete']);
        Permission::create(['name' => 'noninspection.edit']);
        Permission::create(['name' => 'scheduleinspection.delete']);
        Permission::create(['name' => 'scheduleinspection.edit']);
    }
}
