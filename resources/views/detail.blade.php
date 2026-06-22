@extends('layout.layout')

@section('title', 'Detail Berita')

@section('content')

    <body class="font-in">

        <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
            <div class="flex font-semibold text-prim">
                {{ Breadcrumbs::render('detailberita', $article) }}
            </div>
        </section>

        {{-- Main Content --}}
        <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24 grid grid-cols-3 gap-10 sm:grid-cols-1">

            {{-- Sisi Kiri: Detail Artikel Utama --}}
            <div class="col-span-2 flex flex-col w-full space-y-5 mb-10 sm:px-2">
                <img class="object-cover w-full h-[420px] rounded-2xl shadow-sm sm:h-64"
                    src="{{ asset('storage/' . $article->gambar) }}" alt="{{ $article->judul }}">

                <div class="flex items-center gap-x-2">
                    <span class="text-prim text-[10px] py-1 px-3 bg-prim/10 rounded-md">
                        {{ $article->created_at_human }}
                    </span>
                </div>

                <h1 class="text-2xl text-gray-900 font-bold tracking-tight sm:text-xl leading-tight">
                    {{ $article->judul }}
                </h1>

                {{-- Deskripsi singkat sebagai lead paragraph --}}
                <p class="text-gray-500 text-sm text-justify font-medium italic border-l-4 border-prim/40 pl-4 py-1">
                    {{ $article->deskripsi }}
                </p>

                <hr class="border-gray-100">

                {{-- Isi Konten Utama dengan Format Rich Text Editor --}}
                <div class="konten-artikel">
                    {!! $article->konten !!}
                </div>
            </div>

            {{-- Sisi Kanan: Rekomendasi Berita Terkait --}}
            <div class="col-span-1 flex flex-col space-y-6">
                <div class="border-b border-gray-200 pb-3">
                    <h2 class="text-lg font-bold text-gray-900">Berita Terkait</h2>
                </div>

                <div class="flex flex-col gap-y-5">
                    @forelse($beritaTerkait as $terkait)
                        <a href="{{ route('berita.show', $terkait->id) }}"
                            class="group flex gap-x-4 items-start p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300">
                            <img class="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                                src="{{ asset('storage/' . $terkait->gambar) }}" alt="">
                            <div class="flex flex-col gap-y-1">
                                <span class="text-[10px] text-prim font-semibold bg-prim/10 px-2 py-0.5 rounded w-fit">
                                    {{ $terkait->created_at_human }}
                                </span>
                                <h4
                                    class="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-prim transition-colors duration-200">
                                    {{ $terkait->judul }}
                                </h4>
                            </div>
                        </a>
                    @empty
                        <p class="text-xs text-gray-400 italic">Tidak ada berita terkait lainnya.</p>
                    @endforelse
                </div>
            </div>

        </section>

        <x-footer></x-footer>

    </body>

@endsection
