<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class RequestPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'endorsement.view_all', 'description' => 'view all endorsement']);
        Permission::create(['name' => 'endorsement.view_mine', 'description' => 'view his/her endorsement only']);
        Permission::create(['name' => 'endorsement.approval', 'description' => 'approval or reject endorsement']);
        Permission::create(['name' => 'endorsement.admin', 'description' => 'edit/delete all endorsement']);

        Permission::create(['name' => 'exgratia.view_all', 'description' => 'view all ex gratia']);
        Permission::create(['name' => 'exgratia.view_mine', 'description' => 'view his/her ex gratia only']);
        Permission::create(['name' => 'exgratia.approval', 'description' => 'approval or reject ex gratia']);
        Permission::create(['name' => 'exgratia.admin', 'description' => 'edit/delete all ex gratia']);

        Permission::create(['name' => 'sponsorship.view_all', 'description' => 'view all sponsorship']);
        Permission::create(['name' => 'sponsorship.view_mine', 'description' => 'view his/her sponsorship only']);
        Permission::create(['name' => 'sponsorship.approval', 'description' => 'approval or reject sponsorship']);
        Permission::create(['name' => 'sponsorship.admin', 'description' => 'edit/delete all sponsorship']);
    }
}
