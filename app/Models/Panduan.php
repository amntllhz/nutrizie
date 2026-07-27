<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Panduan extends Model
{
    //
    protected $fillable = [
        'judul',
        'deskripsi',
        'penerbit',
        'penanggung_jawab',
        'tajuk_pengarang',
        'tajuk_pengarah_tambahan',
        'tahun_terbit',
        'tempat_terbit',
        'halaman',
        'bahasa',
        'isbn',
        'edisi',
        'cover',
        'file_pdf',
    ];
}
