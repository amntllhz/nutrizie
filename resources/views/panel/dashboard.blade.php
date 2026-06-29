@extends('panel.panel-layout')

@section('title', 'Dashboard')

@section('panel-content')

    <div class="font-in p-10">
        <h1 class="text-xl font-bold text-gray-800">Selamat datang, {{ auth()->user()->name }}!</h1>
        <form method="POST" action="{{ route('auth.logout') }}" class="mt-4">
            @csrf
            <button type="submit" class="text-sm text-red-500 underline">Logout</button>
        </form>
    </div>

@endsection
