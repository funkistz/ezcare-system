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
        Schema::create('coverages_policies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('policy_id')->nullable();
            $table->foreign('policy_id')
                ->references('id')
                ->on('policies')->onDelete('cascade');
            $table->unsignedBigInteger('coverage_id')->nullable();
            $table->foreign('coverage_id')
                ->references('id')
                ->on('coverages')->onDelete('cascade');
            $table->decimal('amount', 10, 2)->default(0);
            $table->timestamps();
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
