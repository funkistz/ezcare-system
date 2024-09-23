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
        Schema::create('coverages_file', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('coverage_id')->nullable();
            $table->unsignedBigInteger('file_id');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->string('type', 20);
            $table->string('mime', 30)->nullable();
            $table->string('url');
            $table->string('thumbnail_url')->nullable();

            $table->timestamp('activate_date')->nullable();
            $table->foreign('file_id')->references('id')->on('files')->cascadeOnDelete();
            $table->foreign('coverage_id')->references('id')->on('coverages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coverages_file');
    }
};
