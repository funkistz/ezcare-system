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
            $table->date('activated_at')->change();
            $table->date('expired_at')->change();
        });

        Schema::table('vehicles', function (Blueprint $table) {
            $table->date('registration_date')->nullable()->change();
        });

        Schema::table('policy_invoices', function (Blueprint $table) {
            $table->date('date')->change();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->date('invoice_date')->change();
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
