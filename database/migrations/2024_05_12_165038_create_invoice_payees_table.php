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
        Schema::create('invoice_payees', function (Blueprint $table) {
            $table->id();

            $table->unsignedBiginteger('policy_id')->unsigned();
            $table->unsignedBiginteger('invoice_id')->unsigned();
            $table->morphs('userable');

            $table->decimal('total_amount', 15, 2)->default(0);
            $table->decimal('total_paid', 15, 2)->default(0);
            $table->decimal('total_unpaid', 15, 2)->default(0);
            $table->string('status_code')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_payees');
    }
};
