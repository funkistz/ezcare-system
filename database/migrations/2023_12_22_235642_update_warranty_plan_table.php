<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('warranty_plans', function (Blueprint $table) {
            $table->after('description', function ($table) {
                $table->integer('year_package')->nullable();
                $table->integer('first_service_mileage')->nullable();
                $table->integer('first_service_months')->nullable();
            });
        });

        Schema::table('warranty_plan_files', function (Blueprint $table) {
            $table->after('vehicle_condition_id', function ($table) {
                $table->year('year')->nullable();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
