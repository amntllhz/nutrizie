<?php

namespace App\Helpers;

use Illuminate\Http\RedirectResponse;

class ToastHelper
{
    public static function flash(RedirectResponse $response, string $type, string $message, ?string $title = null): RedirectResponse
    {
        return $response->with('toast', [
            'type' => $type,
            'title' => $title,
            'message' => $message,
        ]);
    }
}
