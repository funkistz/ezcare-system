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
        Schema::create('policy_payments', function (Blueprint $table) {
            $table->id();

            $table->unsignedBiginteger('policy_id')->unsigned();
            $table->string('type')->nullable();
            $table->decimal('amount', 10, 2);
            $table->decimal('balance', 10, 2);
            $table->string('remarks')->nullable();
            $table->timestamp('date');

            $table->foreign('policy_id')->references('id')
                ->on('policies');

            $table->unsignedBiginteger('created_by')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policy_payments');
    }
};
