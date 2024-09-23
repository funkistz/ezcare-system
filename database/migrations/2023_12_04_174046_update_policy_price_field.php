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
            $table->decimal('warranty_plan_price', 15, 2)->change();
            $table->decimal('subtotal_with_tax', 15, 2)->change();
            $table->decimal('subtotal_without_tax', 15, 2)->change();
            $table->decimal('total_discount', 15, 2)->change();
            $table->decimal('total_tax', 15, 2)->change();
            $table->decimal('total_price', 15, 2)->change();
            $table->decimal('dealer_warranty_plan_price', 15, 2)->change();
            $table->decimal('dealer_subtotal_with_tax', 15, 2)->change();
            $table->decimal('dealer_subtotal_without_tax', 15, 2)->change();
            $table->decimal('dealer_total_discount', 15, 2)->change();
            $table->decimal('dealer_total_tax', 15, 2)->change();
            $table->decimal('dealer_total_price', 15, 2)->change();
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
