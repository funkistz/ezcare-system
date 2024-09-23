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
        Schema::table('policies', function (Blueprint $table) {

            $table->after('total_price', function ($table) {
                $table->decimal('dealer_warranty_plan_price', 10, 2)->nullable();
                $table->decimal('dealer_subtotal_with_tax', 10, 2)->nullable();
                $table->decimal('dealer_subtotal_without_tax', 10, 2)->nullable();
                $table->decimal('dealer_total_discount', 10, 2)->nullable();
                $table->decimal('dealer_total_tax', 10, 2)->nullable();
                $table->decimal('dealer_total_price', 10, 2)->nullable();
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
