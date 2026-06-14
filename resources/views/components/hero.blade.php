<section id="hero"
    class="h-screen bg-linear-to-b/hsl from-graone from-20% to-gratwo items-center flex flex-col justify-center pt-0 sm:pt-24 relative overflow-hidden">

    <img id="circle-fx" class="w-2/3 absolute -left-96 z-0" src="{{ asset('img/circle-fx.png') }}" alt="">

    <div class="flex flex-row max-w-5xl justify-between w-full mx-auto items-center sm:flex-col sm:p-8 sm:gap-y-8">

        <div class="flex flex-col gap-y-4 w-1/2 z-20 sm:w-full">

            <div
                class="small-badge w-fit gap-x-1.5 flex flex-row ring-2 ring-inset ring-prim/10 bg-prim/10 rounded-full py-1.5 px-4 sm:py-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-3.5 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>

                <p class="text-xs font-medium text-white sm:text-xs">Halo Keluarga Sehat</p>
            </div>

            <div class="flex flex-col gap-y-3 sm:text-center">
                <h1 class="font-in text-4xl font-bold text-white leading-10 sm:text-left sm:text-[26px] md:text-3xl">
                    Bersama Ibu Pintar <br>Cegah Stunting Sejak Dini</h1>
                <p
                    class="max-w-md text-sm leading-5 text-gray-300 sm:text-left sm:text-xs sm:max-w-xs sm:leading-5 md:leading-5 md:text-xs">
                    Pantau tumbuh kembang Si Kecil secara akurat dengan standar gizi terpercaya. Akses panduan nutrisi
                    harian dan konsultasi langsung dengan AI Assisten </p>
            </div>

            <a href="#features"
                class="flex items-center gap-x-1 w-fit text-sm bg-prim text-white py-2 rounded-lg font-semibold px-6 hover:bg-gratwo transition-all ease-in-out duration-300 hover:ring-1 hover:ring-inset-1 hover:ring-white">
                Lihat Fitur
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" width="1em" height="1em"
                    viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m19 12l-6-6m6 6l-6 6m6-6H5" />
                </svg>

            </a>

            <div class="flex gap-x-4 items-center mt-2 border-t border-white/10 pt-4 divide-x divide-white/10">
                <div class="flex-1 space-y-1.5">
                    <p class="text-[11px] text-gray-300">Standar Rujukan</p>
                    <p class="text-sm font-semibold text-white">Kemenkes RI</p>
                </div>
                <div class="flex-1 space-y-1.5 pl-4">
                    <p class="text-[11px] text-gray-300">Akses Layanan</p>
                    <p class="text-sm font-semibold text-white">100% Gratis</p>
                </div>
                <div class="flex-1 space-y-1.5 pl-4">
                    <p class="text-[11px] text-gray-300">Keamanan Data</p>
                    <p class="text-sm font-semibold text-white">Sekali Pakai</p>
                </div>
            </div>

        </div>

        {{-- gambar --}}
        <div class="flex flex-col w-1/2 z-10 sm:w-full">
            <img class="w-80 mx-auto pointer-events-none" src="{{ asset('img/hero-img.png') }}" alt="">
        </div>

    </div>

</section>
