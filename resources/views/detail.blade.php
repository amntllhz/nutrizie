<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - Detail</title>
    <link rel="icon" href="{{ asset('img/nutrizie-icon.svg') }}">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/navbar.js'])
</head>

<body class="font-in font-feature-settings-cv11">

    <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
        <div class="flex font-semibold text-prim">
            {{ Breadcrumbs::render('detailberita', $article) }}
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24">
        <div class="flex flex-col w-full space-y-4 mb-10 sm:px-2">
            <img class="object-cover w-full h-96 rounded-xl sm:rounded-lg sm:h-64"
                src="{{ asset('storage/' . $article->gambar) }}" alt="">
            <h3 class="text-prim font-semibold text-xs py-1 px-3 bg-prim/10 rounded-md w-fit">
                {{ $article->created_at_human }}</h3>
            <h1 class="text-3xl text-prim font-bold sm:text-xl">{{ $article->judul }}</h1>
            <p class="text-gray-500 text-sm text-justify">{{ $article->deskripsi }}</p>
            <p class="text-gray-500 text-sm text-justify">{{ $article->konten }}</p>
        </div>
    </section>

    <x-footer></x-footer>

</body>

</html>
