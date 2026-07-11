<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CekGiziController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\Panel\DashboardPanelController;
use App\Http\Controllers\Panel\FeedbackPanelController;
use App\Http\Controllers\Panel\ArticlePanelController;
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

        Route::get('/dashboard', [DashboardPanelController::class, 'index'])
            ->name('dashboard');

        Route::get('/feedback', [FeedbackPanelController::class, 'index'])->name('feedback.index');
        Route::post('/feedback/bulk-mark-read', [FeedbackPanelController::class, 'bulkMarkRead'])->name('feedback.bulkMarkRead');
        Route::patch('/feedback/{feedback}/mark-read', [FeedbackPanelController::class, 'markRead'])->name('feedback.markRead');
        Route::delete('/feedback/bulk-destroy', [FeedbackPanelController::class, 'bulkDestroy'])->name('feedback.bulkDestroy');
        Route::delete('/feedback/{feedback}', [FeedbackPanelController::class, 'destroy'])->name('feedback.destroy');

        Route::get('/artikel',                      [ArticlePanelController::class, 'index'])->name('artikel.index');
        Route::get('/artikel/create',               [ArticlePanelController::class, 'create'])->name('artikel.create');
        Route::post('/artikel',                     [ArticlePanelController::class, 'store'])->name('artikel.store');
        Route::delete('/artikel/bulk-destroy',      [ArticlePanelController::class, 'bulkDestroy'])->name('artikel.bulkDestroy');
        Route::get('/artikel/{artikel}/edit',       [ArticlePanelController::class, 'edit'])->name('artikel.edit');
        Route::post('/artikel/{artikel}/update',           [ArticlePanelController::class, 'update'])->name('artikel.update');
        Route::delete('/artikel/{artikel}',         [ArticlePanelController::class, 'destroy'])->name('artikel.destroy');
    });
