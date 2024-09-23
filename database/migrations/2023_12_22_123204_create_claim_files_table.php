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
        Schema::create('claim_files', function (Blueprint $table) {
            $table->id();
            $table->string('variant', 20)->nullable();
            $table->string('name');
            $table->string('remarks')->nullable();
            $table->unsignedBigInteger('claim_id');
            $table->unsignedBigInteger('file_id');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->string('type', 20);
            $table->string('mime', 30)->nullable();
            $table->string('url');
            $table->string('thumbnail_url')->nullable();

            $table->foreign('file_id')->references('id')->on('files')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claim_files');
    }
};
