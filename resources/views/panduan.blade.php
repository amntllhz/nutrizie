@extends('layout.layout')

@section('title', 'Panduan Gizi')

@section('content')

    <body class="font-in">

        <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
            <div class="flex font-semibold text-prim">
                {{ Breadcrumbs::render('panduan') }}
            </div>
        </section>

        {{-- Search + Sort wrapper dengan Alpine.js --}}
        <div class="max-w-6xl mx-auto px-10 py-4 w-full mb-6 sm:px-6 sm:mb-0" x-data="{
            search: '{{ request('search') }}',
            order: '{{ request('order', 'desc') }}',
            loading: false,
            debounceTimer: null,
        
            fetchArticles() {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.loading = true;
                    const params = new URLSearchParams({ search: this.search, order: this.order });
                    fetch(`/panduan?${params}`, {
                            headers: { 'X-Requested-With': 'XMLHttpRequest' }
                        })
                        .then(r => r.text())
                        .then(html => {
                            document.getElementById('panduan-results').innerHTML = html;
                            this.loading = false;
                        })
                        .catch(() => { this.loading = false; });
                }, 350);
            },
        
            setOrder(val) {
                this.order = val;
                this.fetchArticles();
            }
        }">
            {{-- Search input --}}
            <div class="relative mb-4">
                <span class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                </span>
                <input id="artikel-search" type="text" x-model="search" @input="fetchArticles()"
                    placeholder="Tuliskan judul buku panduan..." autocomplete="off"
                    class="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring focus:ring-prim focus:ring-inset-1 transition-all duration-300" />

                {{-- Loading spinner --}}
                <span x-show="loading" x-transition class="absolute inset-y-0 right-3.5 flex items-center">
                    <svg class="w-4 h-4 text-prim animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        {{-- Ring Latar Belakang --}}
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4">
                        </circle>

                        {{-- Busur Bergerak (Loading Arc) --}}
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </span>

                {{-- Clear button --}}
                <button x-show="search.length > 0" x-transition @click="search = ''; fetchArticles()"
                    class="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    :class="loading ? 'hidden' : ''" type="button" aria-label="Hapus pencarian">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {{-- Sort tags --}}
            <div class="flex items-center space-x-2">
                <button type="button" id="sort-terbaru" @click="setOrder('desc')"
                    :class="order === 'desc'
                        ?
                        'bg-prim/10 text-prim border-prim/50' :
                        'bg-gray-50 text-gray-400 border-gray-300 hover:bg-gray-100'"
                    class="px-3 py-1 cursor-pointer text-[10px] rounded-full border transition-all duration-300">
                    Terbaru
                </button>

                <button type="button" id="sort-terlama" @click="setOrder('asc')"
                    :class="order === 'asc'
                        ?
                        'bg-prim/10 text-prim border-prim/50' :
                        'bg-gray-50 text-gray-400 border-gray-300 hover:bg-gray-100'"
                    class="px-3 py-1 cursor-pointer text-[10px] rounded-full border transition-all duration-300">
                    Terlama
                </button>
            </div>
        </div>

        {{-- Panduan grid --}}
        <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24">
            <div id="panduan-results" class="grid grid-cols-4 gap-4 sm:grid-cols-1 sm:p-2">
                @include('partials.panduan-cards')
            </div>
        </section>

        <x-footer></x-footer>

    </body>

@endsection
