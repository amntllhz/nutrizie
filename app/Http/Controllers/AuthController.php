<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //

    public function ShowLoginForm()
    {
        return view('panel.auth.login');
    }

    public function Login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended(route('panel.dashboard'));
        }

        return back()->withErrors([
            'login' => 'Email atau password yang Anda masukkan salah',
        ])->onlyInput('email');
    }

    public function Logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.login');
    }
}
