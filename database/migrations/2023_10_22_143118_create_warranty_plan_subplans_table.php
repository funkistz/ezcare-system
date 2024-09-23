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
        Schema::create('warranty_plan_subplans', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('warranty_plan_code', 50);
            $table->string('name');
            $table->string('description')->nullable();
            $table->boolean('is_active')->default(1);

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warranty_plan_programs');
    }
};
