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
        Schema::create('warranty_plan_booklets', function (Blueprint $table) {
            $table->id();

            $table->string('file_url');

            $table->unsignedBigInteger('vehicle_condition_id')->nullable();
            $table->foreign('vehicle_condition_id')
                ->references('id')
                ->on('vehicle_conditions');

            $table->unsignedBigInteger('warranty_plan_id')->nullable();
            $table->foreign('warranty_plan_id')
                ->references('id')
                ->on('warranty_plans');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warranty_plan_booklets');
    }
};
