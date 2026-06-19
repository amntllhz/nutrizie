<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PbuLakilaki extends Model
{
    //
    protected $table = 'pbutbulakilaki'; // Nama tabel di database
    public $timestamps = false; // Tabel tidak memiliki kolom timestamps

    protected $primaryKey = 'id_umur';
    public $incrementing = false;

    // Kolom yang dapat diakses
    protected $fillable = [
        'id_umur',
        'metode_ukur',
        'sdmin3',
        'sdmin2',
        'sdmin1',
        'median',
        'sd1',
        'sd2',
        'sd3'
    ];
}
