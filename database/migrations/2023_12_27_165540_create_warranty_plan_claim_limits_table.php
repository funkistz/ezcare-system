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
        Schema::create('warranty_plan_claim_limits', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('remarks')->nullable();
            $table->unsignedBigInteger('warranty_plan_id');
            $table->year('year');
            $table->decimal('amount_limit', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warranty_plan_claim_limits');
    }
};
