<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CekGiziController;
use App\Http\Controllers\FeedbackController;

Route::get('/', function () {
    return view('home');
})->name('beranda');

Route::get('/hasilgizi', function () {
    return view('hasilgizi');
});

Route::get('/profil', function () {
    return view('profil');
})->name('profil');

Route::get('/visimisi', function () {
    return view('visimisi');
})->name('visimisi');

Route::get('/kontributor', function () {
    return view('kontributor');
})->name('kontributor');

Route::get('/berita', [ArticleController::class, 'index'])->name('berita');
Route::get('/berita/{id}', [ArticleController::class, 'show'])->name('detailberita.show');
Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

Route::get('/cekgizi', [CekGiziController::class, 'index'])->name('cekgizi');
Route::post('/cekgizi', [CekGiziController::class, 'hitung'])->name('cekgizi.hitung')->middleware('throttle:10,1');
