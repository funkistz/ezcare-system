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
            $table->decimal('price', 15, 2)->change();
            $table->decimal('addon_price', 15, 2)->change();
            $table->decimal('dealer_price', 15, 2)->change();
            $table->decimal('dealer_addon_price', 15, 2)->change();
        });

        Schema::table('plan_discounts', function (Blueprint $table) {
            $table->decimal('amount', 15, 2)->change();
        });

        Schema::table('policy_payments', function (Blueprint $table) {
            $table->decimal('amount', 15, 2)->change();
            $table->decimal('balance', 15, 2)->change();
        });

        Schema::table('policy_invoices', function (Blueprint $table) {
            $table->decimal('subtotal', 15, 2)->change();
            $table->decimal('discount', 15, 2)->change();
            $table->decimal('tax', 15, 2)->change();
            $table->decimal('total', 15, 2)->change();
        });

        Schema::table('invoice_items', function (Blueprint $table) {
            $table->decimal('rate', 15, 2)->change();
            $table->decimal('total', 15, 2)->change();
        });

        Schema::table('claim_items', function (Blueprint $table) {
            $table->decimal('price', 15, 2)->change();
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
