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
        <div class="flex items-center space-x-2">
            <form method="GET" action="{{ url('/berita') }}">
                @if (request('search'))
                    <input type="hidden" name="search" value="{{ request('search') }}">
                @endif

                <input type="hidden" name="order" value="desc">
                <button type="submit"
                    class="px-3.5 py-1 cursor-pointer text-[11px] rounded-full border transition-all duration-300 {{ request('order', 'desc') === 'desc' ? 'bg-prim/10 text-prim border-prim' : 'bg-gray-50 text-gray-500 border-gray-300 hover:bg-gray-100' }}">
                    Terbaru
                </button>
            </form>

            <form method="GET" action="{{ url('/berita') }}">
                @if (request('search'))
                    <input type="hidden" name="search" value="{{ request('search') }}">
                @endif

                <input type="hidden" name="order" value="asc">
                <button type="submit"
                    class="px-3.5 py-1 cursor-pointer text-[11px] rounded-full border transition-all duration-300 {{ request('order') === 'asc' ? 'bg-prim/10 text-prim border-prim' : 'bg-gray-50 text-gray-500 border-gray-300 hover:bg-gray-100' }}">
                    Terlama
                </button>
            </form>
        </div>
    </div>

    <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24">
        <div class="grid grid-cols-4 gap-4 sm:grid-cols-1 sm:p-2">

            @foreach ($articles as $article)
                <a href="{{ url('/berita/' . $article->id) }}" class="block group">
                    <div
                        class="w-full bg-white p-2 rounded-3xl space-y-3 ring-1 ring-inset ring-prim/20 hover:bg-prim/5 hover:ring-2 hover:ease-in-out hover:duration-300 sm:p-4">

                        @if ($article->gambar)
                            <div
                                class="relative w-full h-40 rounded-2xl overflow-hidden transition-transform duration-300">
                                <img class="object-cover w-full h-full"
                                    src="{{ asset('storage/' . $article->gambar) }}" alt="{{ $article->judul }}">

                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
                                </div>

                                <div
                                    class="absolute bottom-0 inset-x-0 p-3 flex flex-row w-full justify-between items-center sm:p-4">
                                    <p
                                        class="text-white bg-white/20 backdrop-blur-sm font-semibold text-[9px] py-1 px-2.5 rounded-full border border-white/10">
                                        Author
                                    </p>
                                    <p class="text-white text-[9px] py-1.5 px-1 font-medium drop-shadow-md">
                                        {{ $article->created_at_human }}
                                    </p>
                                </div>
                            </div>
                        @endif

                        <div class="px-2 pb-1 space-y-1.5">
                            <h1
                                class="text-sm text-prim font-bold line-clamp-2 sm:text-lg group-hover:text-gratwo transition-colors duration-300">
                                {{ $article->judul }}
                            </h1>

                            <p class="text-[11px] text-gray-400 line-clamp-2 font-light leading-relaxed">
                                {{ Str::limit(strip_tags($article->konten), 100) }}
                            </p>

                            <div
                                class="flex items-center text-[11px] text-prim font-semibold pt-1 group-hover:underline">
                                Baca selengkapnya
                                <svg class="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </div>

                    </div>
                </a>
            @endforeach

        </div>
    </section>

    <x-footer></x-footer>

</body>

</html>
