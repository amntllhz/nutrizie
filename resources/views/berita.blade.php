<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - Berita</title>
    <link rel="icon" href="{{ asset('img/nutrizie-icon.svg') }}">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/navbar.js'])
</head>

<body class="font-in font-feature-settings-cv11">


    <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
        <div class="flex font-semibold text-prim">
            {{ Breadcrumbs::render('berita') }}
        </div>
    </section>

    <div class="max-w-6xl mx-auto px-10 py-4 w-full mb-2 sm:px-6 sm:mb-0">
        <form method="GET" action="{{ url('/berita') }}" class="flex items-center space-x-2">
            <select name="order" id="order"
                class="w-24 bg-gray-50 border flex items-center gap-2 border-gray-300 text-prim text-xs rounded-lg focus:ring-prim focus:border-prim p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onchange="this.form.submit()">
                <option class="text-sm sm:text-xs" value="desc" {{ request('order') === 'desc' ? 'selected' : '' }}>
                    Terbaru</option>
                <option class="text-sm sm:text-xs" value="asc" {{ request('order') === 'asc' ? 'selected' : '' }}>
                    Terlama</option>
            </select>
        </form>
    </div>

    <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24">
        <div class="grid grid-cols-3 gap-6 sm:grid-cols-1 sm:p-2">

            @foreach ($articles as $article)
                <a href="{{ url('/berita/' . $article->id) }}">
                    <div
                        class="w-full bg-white p-5 rounded-3xl space-y-4 ring-2 ring-inset ring-prim/20 hover:shadow-lg hover:ease-in-out hover:duration-300 hover:shadow-prim/20 sm:p-4">
                        @if ($article->gambar)
                            <img class="object-cover w-full h-32 rounded-xl"
                                src="{{ asset('storage/' . $article->gambar) }}" alt="">
                        @endif
                        <div class="space-y-2">
                            <div class="flex flex-row w-full justify-between items-center">
                                <p class="text-prim font-semibold text-xs py-1 px-3 bg-prim/10 rounded-md">Author</p>
                                <p class="text-gray-400 text-xs py-1.5 px-1">{{ $article->created_at_human }}</p>
                            </div>
                            <h1 class="text-xl text-prim font-bold line-clamp-2 sm:text-xl">{{ $article->judul }}</h1>
                            <p class="text-gray-500 text-xs font-medium text-justify line-clamp-3 sm:text-xs">
                                {{ $article->deskripsi }}</p>
                        </div>
                    </div>
                </a>
            @endforeach

        </div>
    </section>

    <x-footer></x-footer>

</body>

</html>
