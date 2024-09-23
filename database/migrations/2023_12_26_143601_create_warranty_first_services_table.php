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
        Schema::create('warranty_first_services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('warranty_plan_id')->unsigned();
            $table->unsignedBiginteger('service_type_id')->unsigned();

            $table->integer('first_service_mileage')->nullable();
            $table->integer('first_service_months')->nullable();

            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warranty_first_services');
    }
};
