<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequest extends Middleware
{

    /**
     * Root template dipakai Inertia untuk render halaman panel.
     * Halaman publik tetap pakai Blade biasa.
     */
    protected $rootView = 'panel-app';

    /**
     * Versi asset — Inertia pakai ini untuk force refresh saat deploy.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Data yang di-share ke SEMUA halaman Inertia (panel).
     * Bisa diakses via usePage().props di setiap komponen React.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // Flash messages (success, error, info)
            'flash' => [
                'success' => session('success'),
                'error'   => session('error'),
                'info'    => session('info'),
            ],

            // User yang sedang login (null kalau belum login)
            'auth' => [
                'user' => $request->user() ? [
                    'id'    => $request->user()->id,
                    'name'  => $request->user()->name,
                    'email' => $request->user()->email,
                ] : null,
            ],
        ]);
    }
}
