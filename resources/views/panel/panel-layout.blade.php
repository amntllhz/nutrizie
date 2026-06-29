@extends('layout.layout')

@section('title', 'Panel | Nutrizie')

@section('content')

    <body class="font-in">

        @if (session('toast'))
            @php $toast = session('toast'); @endphp
            <x-toast type="{{ $toast['type'] }}" title="{{ $toast['title'] ?? null }}">
                {{ $toast['message'] }}
            </x-toast>
        @endif

        @yield('panel-content')

    </body>

@endsection
