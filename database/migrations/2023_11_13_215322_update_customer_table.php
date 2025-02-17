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
        Schema::table('customers', function (Blueprint $table) {

            $table->after('full_name', function ($table) {
                $table->string('first_name');
                $table->string('last_name')->nullable();
            });
            $table->dropColumn('full_name');
            $table->after('nationality', function ($table) {
                $table->string('phone_no')->nullable();
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
