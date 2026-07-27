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
        Schema::create('panduans', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->string('penerbit')->nullable();
            $table->string('penanggung_jawab')->nullable();
            $table->string('tajuk_pengarang')->nullable();
            $table->string('tajuk_pengarah_tambahan')->nullable();
            $table->year('tahun_terbit')->nullable();
            $table->string('tempat_terbit')->nullable();
            $table->unsignedSmallInteger('halaman')->nullable();
            $table->string('bahasa')->default('Indonesia');
            $table->string('isbn')->nullable();
            $table->string('edisi')->nullable();
            $table->string('cover');           // path cover image
            $table->string('file_pdf');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('panduans');
    }
};
