@forelse ($articles as $article)
    <a href="{{ url('/artikel/' . $article->id) }}" class="block group">
        <div
            class="w-full bg-white p-2 rounded-3xl space-y-3 ring-1 ring-inset ring-prim/20 hover:bg-prim/5 hover:ring-2 hover:ease-in-out hover:duration-300 sm:p-4">

            @if ($article->gambar)
                <div class="relative w-full h-40 rounded-2xl overflow-hidden transition-transform duration-300">
                    <img class="object-cover w-full h-full" src="{{ asset('storage/' . $article->gambar) }}"
                        alt="{{ $article->judul }}">

                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
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
                <h2
                    class="text-sm text-prim font-bold line-clamp-2 sm:text-lg group-hover:text-gratwo transition-colors duration-300">
                    {{ $article->judul }}
                </h2>

                <p class="text-[11px] text-gray-400 line-clamp-2 font-light leading-relaxed">
                    {{ Str::limit(strip_tags($article->konten), 100) }}
                </p>

                <div class="flex items-center text-[11px] text-prim font-semibold pt-1 group-hover:underline">
                    Baca selengkapnya
                    <svg class="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>

        </div>
    </a>
@empty
    <div class="col-span-4 flex flex-col items-center justify-center py-16 text-center sm:col-span-1">
        <div class='flex flex-col items-center justify-center py-2 space-y-2'>
            <div class="w-full flex items-center justify-center">
                <img src="{{ asset('img/no-artikel.svg') }}" alt="" class='w-28 h-28' />
            </div>
            <div class='flex flex-col space-y-0.5'>
                <div class="px-5 text-center font-semibold text-sm text-gray-800">Artikel tidak ditemukan</div>
                <p class='text-xs text-gray-400 text-center'>Coba kata kunci lain</p>
            </div>
        </div>
    </div>
    </div>
@endforelse
