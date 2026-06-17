<section id="tentang"
    class="max-w-full mt-10 mx-auto bg-gradient-to-t from-graone to-gratwo sm:w-full sm:p-4 sm:rounded-none sm:mb-0">
    <div class="max-w-6xl p-10 mx-auto py-10 grid grid-cols-5 gap-x-10 sm:max-w-sm sm:grid-cols-1 sm:gap-y-8 sm:p-2">

        <!-- company -->

        <div class=" flex flex-col col-span-2 gap-y-6 sm:col-span-1">
            <div class="flex">
                <img class="h-5 sm:h-4" src="{{ asset('img/nutrizie-logo-w.svg') }}" alt="">
            </div>

            <div
                class="flex flex-col ring-1 ring-inset ring-prim/20 bg-prim/40 w-fit rounded-2xl gap-x-4 p-6 gap-y-2 sm:p-6">
                <h3 class="text-sm text-white font-bold">Kritik & saran</h3>
                <p class="text-white/80 text-xs text-justify sm:font-light">Berikan pertanyaan, laporan, atau saran
                    untuk
                    mendukung pengembangan kualitas layanan kami</p>

                <form method="POST" action="{{ route('feedback.store') }}" class="flex flex-col gap-y-3 mt-2"
                    x-data="{ loading: false }" @submit="loading = true">
                    @csrf

                    <div>
                        <input name="email" type="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-400 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                            placeholder="example@gmail.com" required autocomplete="off" />
                    </div>

                    <div>
                        <textarea id="pesan" name="pesan" rows="3"
                            class="block w-full rounded-lg border-0 py-2.5 text-xs text-gratwo placeholder:text-gray-400 placeholder:text-[11px] focus:ring-2 focus:ring-inset focus:ring-prim"
                            placeholder="Tuliskan pesanmu disini" required autocomplete="off"></textarea>
                    </div>

                    <button type="submit" :disabled="loading"
                        class="w-fit flex gap-2 justify-center items-center text-white text-center cursor-pointer font-semibold bg-prim hover:bg-gratwo transition duration-300 ease-in-out px-6 py-2 text-sm rounded-lg inset-ring inset-ring-gratwo/20 outline -outline-offset-2 outline-gratwo/30 shadow-md shadow-gratwo/40 inset-shadow-[0_-3px_4px] inset-shadow-gratwo/80 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prim hover:ring-1 hover:ring-inset-1 hover:ring-white">

                        <svg x-show="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" style="display: none;">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>

                        <span x-text="loading ? 'Mengirim...' : 'Kirim'"></span>
                    </button>
                </form>
            </div>

        </div>

        <!-- sitemap1 -->

        <div class="flex flex-col gap-y-4 ml-10 sm:ml-0 mt-14 sm:mt-0">
            <h3 class="text-white font-bold text-sm">Informasi Publik</h3>
            <ul class="flex flex-col gap-y-1.5">
                <li>
                    <a href="#" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Berita
                    </a>
                </li>
                <li>
                    <a href="#" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Buku Panduan
                    </a>
                </li>
                <li>
                    <a href="#" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Cek Status Gizi
                    </a>
                </li>
                <li>
                    <a href="#" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Himbauan
                    </a>
                </li>
            </ul>
        </div>

        <!-- sitemap2 -->

        <div class="flex flex-col gap-y-4 ml-10 sm:ml-0 mt-14 sm:mt-0">
            <h3 class="text-white font-bold text-sm">Tentang</h3>
            <ul class="flex flex-col gap-y-2">
                <li>
                    <a href="{{ url('/profil') }}" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Profil
                    </a>
                </li>
                <li>
                    <a href="{{ url('/visimisi') }}" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Visi & Misi
                    </a>
                </li>
                <li>
                    <a href="{{ url('/kontributor') }}" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Kontributor
                    </a>
                </li>
                <li>
                    <a href="#" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Referensi
                    </a>
                </li>
            </ul>
        </div>

        <!-- sitemap3 -->

        <div class="flex flex-col gap-y-4 ml-10 sm:ml-0 mt-14 sm:mt-0">
            <h3 class="text-white font-bold text-sm">Bantuan</h3>
            <ul class="flex flex-col gap-y-2">
                <li>
                    <a href="../src/guide.html" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Panduan Pengguna
                    </a>
                </li>
                <li>
                    <a href="../src/report.html" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Lapor Kendala Layanan
                    </a>
                </li>
                <li>
                    <a href="../src/contributors.html" class="text-xs text-white/70 hover:text-white sm:text-sm">
                        Kontributor
                    </a>
                </li>
            </ul>
        </div>

    </div>
    <div class="mt-2 flex items-center justify-center gap-x-6 sm:mt-6">
        <h3 class="text-xs text-white/20 mb-4 sm:mb-2"><span>&#169</span> 2024 Nutrizie -
            All Right Reserved</h3>
    </div>
</section>
