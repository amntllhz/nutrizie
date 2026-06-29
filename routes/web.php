<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CekGiziController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeedbackController;
use Illuminate\Support\Facades\Route;

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


Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});


Route::prefix('panel')->name('panel.')->middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
