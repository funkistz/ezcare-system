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
        Schema::create('policy_statuses', function (Blueprint $table) {
            $table->id();

            $table->unsignedBiginteger('policy_id')->unsigned();
            $table->string('status_code', 20);
            $table->string('remarks')->nullable();
            $table->unsignedBiginteger('created_by')->unsigned()->nullable();

            $table->foreign('policy_id')->references('id')
                ->on('policies')->onDelete('cascade');

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
