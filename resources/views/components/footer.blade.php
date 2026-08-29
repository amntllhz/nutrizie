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
                    x-data="feedbackForm" x-on:submit.prevent="validateAndSubmit" novalidate>
                    @csrf

                    {{-- Email --}}
                    <div>
                        <input name="email" type="email" id="footer-email" @input="clearError('footer-email')"
                            class="bg-gray-50 border border-gray-300 text-gray-800 text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                            placeholder="example@gmail.com" autocomplete="off" />
                    </div>

                    {{-- Pesan --}}
                    <div class="relative">
                        <textarea id="footer-pesan" name="pesan" rows="3" maxlength="500" @input="clearError('footer-pesan')"
                            class="block w-full text-justify rounded-lg border border-gray-300 p-2.5 text-xs text-gray-800 placeholder:text-gray-300 placeholder:text-[11px] focus:ring focus:ring-inset focus:ring-prim"
                            placeholder="Tuliskan pesanmu disini" autocomplete="off"></textarea>
                        <div class="flex items-center justify-between mt-0.5">
                            <span id="footer-pesan-error-slot" class="text-red-400 font-medium pl-1 text-[10px]"></span>
                            <p class="text-[10px] text-white/50" id="footer-pesan-counter">0 / 500</p>
                        </div>
                    </div>

                    <button type="submit" :disabled="loading"
                        class="w-full flex gap-2 justify-center items-center text-white text-center cursor-pointer font-semibold bg-prim hover:bg-gratwo transition duration-300 ease-in-out px-6 py-2 text-sm rounded-lg disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prim">

                        <svg x-show="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" style="display: none;">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>

                        <span x-text="loading ? 'Mengirim...' : 'Kirim Pesan'"></span>

                        <svg x-show="!loading" class="h-4 w-4 text-white" width="100%" height="100%"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </form>
            </div>

        </div>

        <!-- sitemap1 -->

        <div class="flex flex-col gap-y-4 ml-10 sm:ml-0 mt-14 sm:mt-0">
            <h3 class="text-white font-bold text-sm">Informasi Publik</h3>
            <ul class="flex flex-col gap-y-1.5">
                <li>
                    <a href="{{ url('/artikel') }}"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Artikel
                    </a>
                </li>
                <li>
                    <a href="{{ url('/panduan') }}"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Buku Panduan
                    </a>
                </li>
                <li>
                    <a href="{{ url('/cekgizi') }}"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Cek Status Gizi
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
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
                    <a href="{{ url('/profil') }}"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Profil
                    </a>
                </li>
                <li>
                    <a href="{{ url('/visimisi') }}"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Visi & Misi
                    </a>
                </li>
                <li>
                    <a href="{{ url('/kontributor') }}"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Kontributor
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
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
                    <a href="../src/guide.html"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Panduan Pengguna
                    </a>
                </li>
                <li>
                    <a href="../src/report.html"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Lapor Kendala Layanan
                    </a>
                </li>
                <li>
                    <a href="../src/contributors.html"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Kontributor
                    </a>
                </li>
                <li>
                    <a href="{{ url('/auth/login') }}"
                        class="text-xs text-white/70 hover:text-white sm:text-sm transition-all duration-300">
                        Panel Admin
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

<!-- Modal toggle -->
@if (session('success'))
    <div id="default-modal" tabindex="-1" aria-hidden="true"
        class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
        <div class="relative p-7 w-full max-w-md max-h-full animate-fade-in-up">
            <!-- Modal content -->
            <div class="relative bg-white rounded-3xl shadow sm:max-w-sm ">

                <!-- Modal header -->
                <div class="flex items-center justify-end pt-4 pr-4 rounded-t ">
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-500 rounded-lg text-sm w-7 h-7 inline-flex justify-center items-center"
                        data-modal-hide="default-modal">
                        <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-4 space-y-4 flex flex-col items-center">
                    <div class="w-36 h-36 flex items-center justify-center">
                        <img src="{{ asset('img/succes-message.png') }}" alt="Success" width="144"
                            height="144" loading="eager" class="w-full h-full object-contain">
                    </div>

                    <div class="flex flex-col space-y-1 justify-center items-center">
                        <p class="text-sm font-semibold leading-relaxed text-black ">
                            {{ session('success') }}
                        </p>
                        <p class="text-xs text-gray-400 font-light">
                            Tunggu kabar selanjutnya dari kami!
                        </p>
                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-center items-center py-5 border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="default-modal" type="button"
                        class="text-white items-end w-24 bg-prim hover:bg-gratwo font-medium rounded-lg text-xs px-2.5 py-2 text-center cursor-pointer">Kembali</button>
                </div>
            </div>
        </div>
    </div>
@endif

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('feedbackForm', () => ({
            loading: false,

            init() {
                // Char counter for pesan
                const pesan = document.getElementById('footer-pesan');
                const counter = document.getElementById('footer-pesan-counter');
                if (pesan && counter) {
                    pesan.addEventListener('input', () => {
                        counter.textContent = pesan.value.length + ' / 500';
                    });
                }
            },

            clearError(fieldId) {
                const el = document.getElementById(fieldId);
                if (!el) return;
                el.classList.remove('ring-1', 'ring-red-400', 'border-red-400');
                // For pesan: clear the dedicated inline slot
                if (fieldId === 'footer-pesan') {
                    const slot = document.getElementById('footer-pesan-error-slot');
                    if (slot) slot.textContent = '';
                } else {
                    el.closest('div')?.querySelectorAll('.form-error-msg').forEach(m => m.remove());
                }
            },

            showError(el, message) {
                el.classList.add('ring-1', 'ring-red-400', 'border-red-400');
                // For pesan: inject into the inline slot next to the counter
                if (el.id === 'footer-pesan') {
                    const slot = document.getElementById('footer-pesan-error-slot');
                    if (slot) slot.textContent = message;
                } else {
                    const msg = document.createElement('p');
                    msg.className = 'text-red-400 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                    msg.textContent = message;
                    el.closest('div').appendChild(msg);
                }
            },

            validateAndSubmit(e) {
                this.loading = true;
                let valid = true;
                let firstError = null;

                // Clear previous errors
                document.querySelectorAll('.form-error-msg').forEach(m => m.remove());

                // === 1. Validate Email
                const emailEl = document.getElementById('footer-email');
                if (emailEl) {
                    const val = emailEl.value.trim();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!val) {
                        valid = false;
                        if (!firstError) firstError = emailEl;
                        this.showError(emailEl, 'Email wajib diisi');
                    } else if (!emailRegex.test(val)) {
                        valid = false;
                        if (!firstError) firstError = emailEl;
                        this.showError(emailEl, 'Format email tidak valid');
                    } else {
                        emailEl.classList.remove('ring-1', 'ring-red-400', 'border-red-400');
                    }
                }

                // === 2. Validate Pesan
                const pesanEl = document.getElementById('footer-pesan');
                if (pesanEl) {
                    const val = pesanEl.value.trim();
                    if (!val) {
                        valid = false;
                        if (!firstError) firstError = pesanEl;
                        this.showError(pesanEl, 'Pesan wajib diisi');
                    } else if (val.length > 500) {
                        valid = false;
                        if (!firstError) firstError = pesanEl;
                        this.showError(pesanEl, 'Pesan maksimal 500 karakter');
                    } else {
                        pesanEl.classList.remove('ring-1', 'ring-red-400', 'border-red-400');
                    }
                }

                // === 3. If invalid — cancel and scroll to first error
                if (!valid) {
                    this.loading = false;
                    if (firstError) {
                        firstError.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                    return;
                }

                // === 4. Submit if valid
                e.target.submit();
            }
        }));
    });
</script>
