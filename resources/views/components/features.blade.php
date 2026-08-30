<section id="features" class="mt-10 p-10 sm:p-4">
    <div class="p-10 max-w-6xl mx-auto sm:w-full sm:p-2">

        <div
            class="relative overflow-hidden flex flex-row max-w-6xl p-8 ring-1 ring-prim/20 bg-gradient-to-tr from-gratwo to-prim ring-inset rounded-3xl items-center justify-between sm:flex-col sm:p-6 sm:space-y-4">
            <svg class="absolute z-0 opacity-30 w-full left-0 h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="a" width="25" height="25" patternUnits="userSpaceOnUse">
                        <rect width="100%" height="100%" fill="none" />
                        <path fill="none" stroke="#35C6A8" stroke-linecap="round" stroke-linejoin="round"
                            d="M5.75 10h13.5M12.5 3.25v13.5" />
                    </pattern>
                </defs>
                <rect width="800%" height="800%" fill="url(#a)" />
            </svg>
            <h1 class="text-2xl z-1 text-white font-bold w-1/3 sm:w-full sm:text-xl">Platform <span
                    class="text-acctwo">Informasi</span><br> Gizi Online</h1>
            <p
                class="w-2/3 text-white bg-white/10 backdrop-blur-sm py-4 px-5 rounded-xl text-xs text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                Nutrisi yang tepat adalah pondasi bagi perkembangan balita yang sehat.
                Platform ini hadir untuk menyediakan informasi tentang makanan bergizi,
                pola makan yang tepat sesuai usia, serta cara mengatasi tantangan yang
                sering dihadapi dalam memberi makan balita. <span class="font-bold text-acctwo">Cek status gizi</span>
                balita anda melalui fitur yang tersedia untuk memastikan mereka mendapatkan kebutuhan nutrisi yang
                optimal
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
            <a href="{{ url('/artikel') }}"
                class="w-full bg-white h-fit p-3 rounded-3xl ring-1 ring-inset ring-prim/20 space-y-2 hover:bg-prim/10 hover:-translate-y-2 transition-all duration-300">

                <div
                    class="relative rounded-xl ring-1 ring-prim/20 overflow-hidden h-38 flex bg-prim/10 justify-center items-start">
                    <img src={{ asset('img/berita.png') }} alt="" class="object-cover object-bottom">
                </div>

                <div class="flex justify-between items-center">

                    <h3 class="text-md ml-1.5 font-bold text-prim">Artikel Gizi</h3>

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
                        <svg class="ml-0.5" width="7" height="12" viewBox="0 0 7 12" fill="none"
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
