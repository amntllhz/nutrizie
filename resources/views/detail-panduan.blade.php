@extends('layout.layout')

@section('title', $panduan->judul)

@section('content')

    <body class="font-in">

        {{-- Breadcrumb Section --}}
        <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
            <div class="flex font-semibold text-prim">
                {{ Breadcrumbs::render('detailpanduan', $panduan) }}
            </div>
        </section>

        {{-- Main Content --}}
        <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24 grid grid-cols-3 gap-10 sm:grid-cols-1">

            {{-- Sisi Kiri: Detail Panduan Utama --}}
            <div class="col-span-2 flex flex-col space-y-6 mb-10 sm:px-2">

                {{-- Cover Panduan --}}
                <div class="flex justify-start gap-4">
                    <img class="object-contain max-h-[220px] w-auto rounded-xl sm:h-72"
                        src="{{ asset('storage/' . $panduan->cover) }}" alt="{{ $panduan->judul }}">

                    <div class="flex flex-col gap-2 p-2">
                        {{-- Tanggal Upload --}}
                        <div class="flex items-center gap-x-2">
                            <span class="text-prim text-[9px] py-1 px-3 bg-prim/10 rounded-md font-semibold">
                                {{ $panduan->created_at_human }}
                            </span>
                        </div>

                        {{-- Judul Panduan --}}
                        <h1 class="text-lg text-gray-900 font-bold tracking-tight sm:text-xl leading-tight">
                            {{ $panduan->judul }}
                        </h1>

                        {{-- Deskripsi Panduan --}}
                        @if ($panduan->deskripsi)
                            <div class="space-y-2">
                                <p class="text-gray-600 text-xs text-justify leading-relaxed line-clamp-5">
                                    {{ $panduan->deskripsi }}
                                </p>
                            </div>
                        @endif

                        {{-- Tombol Aksi --}}
                        <div class="flex justify-start gap-3 mt-2">
                            {{-- Tombol Buka PDF (Tab Baru) --}}
                            <a href="{{ asset('storage/' . $panduan->file_pdf) }}" target="_blank"
                                class="inline-flex items-center justify-center gap-x-2 px-3.5 py-2 text-xs font-semibold text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors sm:flex-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Lihat PDF
                            </a>

                            {{-- Tombol Unduh PDF Direct --}}
                            <a href="{{ asset('storage/' . $panduan->file_pdf) }}" download
                                class="inline-flex items-center justify-center gap-x-2 px-3.5 py-2 text-xs font-semibold text-white bg-prim rounded-lg hover:bg-prim/90 transition-colors sm:flex-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Unduh PDF
                            </a>
                        </div>
                    </div>
                </div>

                <hr class="border-gray-200">

                {{-- Metadata / Informasi Detail Buku Panduan --}}
                <div class="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">

                    <div class="flex justify-start items-center space-x-2 border-b border-gray-100 pb-3">
                        <svg class="size-4 text-prim" width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H10.5M13 11H8M11 15H8M16 7H8M19.25 17V15.25C19.25 14.2835 18.4665 13.5 17.5 13.5C16.5335 13.5 15.75 14.2835 15.75 15.25V17M15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.0399 21 17.7599 20.891 17.546C20.7951 17.3578 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H15.6C15.0399 17 14.7599 17 14.546 17.109C14.3578 17.2049 14.2049 17.3578 14.109 17.546C14 17.7599 14 18.0399 14 18.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h2 class="text-sm font-bold text-gray-900">Informasi Publikasi</h2>
                    </div>

                    <div class="grid grid-cols-2 gap-4 text-xs sm:grid-cols-1">
                        @if ($panduan->penerbit)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Penerbit</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->penerbit }}</span>
                            </div>
                        @endif

                        @if ($panduan->penanggung_jawab)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Penanggung Jawab</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->penanggung_jawab }}</span>
                            </div>
                        @endif

                        @if ($panduan->tajuk_pengarang)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Tajuk Pengarang</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->tajuk_pengarang }}</span>
                            </div>
                        @endif

                        @if ($panduan->tajuk_pengarah_tambahan)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Pengarah Tambahan</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->tajuk_pengarah_tambahan }}</span>
                            </div>
                        @endif

                        @if ($panduan->tempat_terbit || $panduan->tahun_terbit)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Tempat & Tahun Terbit</span>
                                <span class="font-semibold text-gray-800">
                                    {{ implode(', ', array_filter([$panduan->tempat_terbit, $panduan->tahun_terbit])) ?: '-' }}
                                </span>
                            </div>
                        @endif

                        @if ($panduan->halaman)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Jumlah Halaman</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->halaman }} Halaman</span>
                            </div>
                        @endif

                        @if ($panduan->bahasa)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Bahasa</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->bahasa }}</span>
                            </div>
                        @endif

                        @if ($panduan->isbn)
                            <div>
                                <span class="text-gray-400 block mb-0.5">ISBN</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->isbn }}</span>
                            </div>
                        @endif

                        @if ($panduan->edisi)
                            <div>
                                <span class="text-gray-400 block mb-0.5">Edisi</span>
                                <span class="font-semibold text-gray-800">{{ $panduan->edisi }}</span>
                            </div>
                        @endif
                    </div>
                </div>

            </div>

            {{-- Sisi Kanan: Panduan Terkait --}}
            <div class="col-span-1 flex flex-col space-y-6">
                <div class="border-b border-gray-200 pb-3">
                    <h2 class="text-lg font-bold text-gray-900">Panduan Lainnya</h2>
                </div>

                <div class="flex flex-col gap-y-4">
                    @forelse($panduanTerkait as $terkait)
                        <a href="{{ route('detailpanduan.show', $terkait->id) }}"
                            class="group flex gap-x-4 items-start p-2 rounded-xl hover:bg-white hover:ring-1 hover:ring-prim/20 hover:ring-inset transition-all duration-300">

                            <img class="w-16 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100 shadow-sm"
                                src="{{ asset('storage/' . $terkait->cover) }}" alt="{{ $terkait->judul }}">

                            <div class="flex flex-col gap-y-1">
                                <span class="text-[9px] text-prim font-semibold bg-prim/10 px-2 py-0.5 rounded w-fit">
                                    {{ $terkait->created_at_human }}
                                </span>
                                <h4
                                    class="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-prim transition-colors duration-200">
                                    {{ $terkait->judul }}
                                </h4>
                                @if ($terkait->penerbit)
                                    <p class="text-[10px] text-gray-400 line-clamp-1">{{ $terkait->penerbit }}</p>
                                @endif
                            </div>
                        </a>
                    @empty
                        <p class="text-xs text-gray-400 italic">Tidak ada panduan terkait lainnya.</p>
                    @endforelse
                </div>
            </div>

        </section>

        <x-footer></x-footer>

    </body>

@endsection
