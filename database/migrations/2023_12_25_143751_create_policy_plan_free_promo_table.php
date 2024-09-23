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
        Schema::create('policies_free_promos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('policy_id')->nullable();
            $table->foreign('policy_id')
                ->references('id')
                ->on('policies')->onDelete('cascade');
            $table->unsignedBigInteger('free_promo_id')->nullable();
            $table->foreign('free_promo_id')
                ->references('id')
                ->on('free_promos')->onDelete('cascade');
            $table->decimal('amount', 15, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policies_free_promos');
    }
};
