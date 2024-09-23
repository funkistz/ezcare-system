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
        Schema::create('sponsorships', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('marketing_officer_id')->nullable();
            $table->unsignedBigInteger('dealer_id')->nullable();
            $table->text('reasons')->nullable();
            $table->decimal('amount', 15, 2)->default(0);

            $table->unsignedBiginteger('created_by')->unsigned()->nullable();
            $table->string('status_code', 20);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sponsorships');
    }
};
