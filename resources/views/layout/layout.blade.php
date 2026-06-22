<!DOCTYPE html>
<html class="scroll-smooth" lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Nutrizie - @yield('title')</title>
    <link rel="icon" href={{ asset('img/nutrizie-icon.svg') }}>

    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/success.js'])
    @stack('vite_script')
</head>

<body>
    @yield('content')
</body>

</html>
