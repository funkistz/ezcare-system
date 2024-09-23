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
        Schema::create('policies_plan_discounts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('policy_id')->nullable();
            $table->foreign('policy_id')
                ->references('id')
                ->on('policies')->onDelete('cascade');
            $table->unsignedBigInteger('plan_discount_id')->nullable();
            $table->foreign('plan_discount_id')
                ->references('id')
                ->on('plan_discounts')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policy_plan_discount');
    }
};
