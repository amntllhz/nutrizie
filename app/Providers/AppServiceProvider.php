<?php

namespace App\Providers;

use Carbon\Carbon;
use Filament\Support\Facades\FilamentView;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // set locale indonesia
        Carbon::setLocale('id');

        //
        FilamentView::registerRenderHook(
            // Ini menempatkan tautan tepat setelah formulir dan tombol Sign In
            'panels::auth.login.form.after',
            fn(): View => view('filament.custom-login-link'),
        );
    }
}
