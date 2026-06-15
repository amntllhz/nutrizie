<section id="features" class="mt-10 p-10 sm:p-4">
    <div class="p-10 max-w-6xl mx-auto sm:w-full sm:p-2">

        <div
            class="flex flex-row max-w-6xl p-10 ring-1 ring-prim/20 ring-inset rounded-3xl items-center justify-between sm:flex-col sm:p-6 sm:space-y-4">
            <h1 class="text-3xl text-prim font-bold w-1/3 sm:w-full sm:text-xl">Platform <span
                    class="text-acc">Informasi</span><br> Gizi Online</h1>
            <p class="w-2/3 text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                Nutrisi yang tepat adalah pondasi bagi perkembangan balita yang sehat.
                Platform ini hadir untuk menyediakan informasi tentang makanan bergizi,
                pola makan yang tepat sesuai usia, serta cara mengatasi tantangan yang
                sering dihadapi dalam memberi makan balita. <span class="font-bold text-prim">Cek status gizi</span>
                balita Anda
                secara langsung untuk memastikan mereka mendapatkan kebutuhan
                nutrisi yang optimal
            </p>
        </div>

        <div class="grid grid-cols-3 gap-8 mt-10 sm:grid-cols-1">

            {{-- card1 --}}
            <a href="{{ url('/cekgizi') }}"
                class="w-full bg-white h-fit p-3 rounded-3xl ring-1 ring-inset ring-prim/20 space-y-2 hover:bg-prim/10 hover:-translate-y-2 transition-all duration-300">

                <div
                    class="relative rounded-xl ring-1 ring-prim/20 overflow-hidden h-38 flex bg-prim/10 justify-center items-start">
                    <img src={{ asset('img/cek-status-gizi.png') }} alt="" class="object-cover object-bottom">
                </div>

                <div class="flex justify-between items-center">

                    <h3 class="text-md ml-1.5 font-bold text-prim">Cek Status Gizi</h3>

                    <div
                        class="w-8 h-8 text-sm bg-prim/10 rounded-full font-semibold text-prim flex items-center justify-center">
                        <svg class="ml-0.5" width="7" height="12" viewBox="0 0 7 12" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11L6 6L1 1" stroke="#35C6A8" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </a>

            {{-- card2 --}}
            <a href="{{ url('/berita') }}"
                class="w-full bg-white h-fit p-3 rounded-3xl ring-1 ring-inset ring-prim/20 space-y-2 hover:bg-prim/10 hover:-translate-y-2 transition-all duration-300">

                <div
                    class="relative rounded-xl ring-1 ring-prim/20 overflow-hidden h-38 flex bg-prim/10 justify-center items-start">
                    <img src={{ asset('img/berita.png') }} alt="" class="object-cover object-bottom">
                </div>

                <div class="flex justify-between items-center">

                    <h3 class="text-md ml-1.5 font-bold text-prim">Berita Gizi</h3>

                    <div
                        class="w-8 h-8 text-sm bg-prim/10 rounded-full font-semibold text-prim flex items-center justify-center">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11L6 6L1 1" stroke="#35C6A8" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </a>

            {{-- card3 --}}
            <a href="{{ url('/panduan') }}"
                class="w-full bg-white h-fit p-3 rounded-3xl ring-1 ring-inset ring-prim/20 space-y-2 hover:bg-prim/10 hover:-translate-y-2 transition-all duration-300">

                <div
                    class="relative rounded-xl ring-1 ring-prim/20 overflow-hidden h-38 flex bg-prim/10 justify-center items-start">
                    <img src={{ asset('img/panduan.png') }} alt="" class="object-cover object-bottom">
                </div>

                <div class="flex justify-between items-center">

                    <h3 class="text-md ml-1.5 font-bold text-prim">Panduan Gizi</h3>

                    <div
                        class="w-8 h-8 text-sm bg-prim/10 rounded-full font-semibold text-prim flex items-center justify-center">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11L6 6L1 1" stroke="#35C6A8" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </a>

        </div>

    </div>
</section>
