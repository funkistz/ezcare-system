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
        Schema::table('plan_pricings', function (Blueprint $table) {
            $table->after('warranty_plan_id', function ($table) {
                $table->string('power_type')->nullable();
                $table->float('min_power')->nullable();
                $table->float('max_power')->nullable();
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
