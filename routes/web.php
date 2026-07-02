<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CekGiziController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\Panel\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Auth routes (Sprint 2 akan convert ke Inertia Page)
Route::get('/auth/login', [AuthController::class, 'showLoginForm'])
    ->name('auth.login')
    ->middleware('guest');

Route::post('/auth/login', [AuthController::class, 'login'])
    ->name('auth.login.post');

Route::post('/auth/logout', [AuthController::class, 'logout'])
    ->name('auth.logout')
    ->middleware('auth');

// Panel routes — protected, pakai panel-app.blade.php sebagai root view
Route::middleware(['auth'])
    ->prefix('panel')
    ->name('panel.')
    ->group(function () {

        // Override root view ke panel-app.blade.php untuk semua route di group ini
        Inertia::setRootView('panel-app');

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        // Sprint 3-5 akan tambah route di sini:
        // Route::resource('artikel', ArtikelController::class);
        // Route::resource('feedback', FeedbackController::class)->only(['index','show','destroy']);
    });
