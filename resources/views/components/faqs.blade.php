<section class="max-w-6xl mx-auto px-10 py-0 sm:w-full sm:p-4 mt-0 sm:mt-4">
    <div class="p-10 sm:p-2">

        <div class="space-y-2">
            <h1 class="text-3xl font-bold text-center text-prim sm:text-xl">Frequently <span class="text-acc">Asked</span>
                Questions</h1>
            <p class="text-gray-500 text-[13px] text-center sm:text-xs">Beberapa pertanyaan yang sering diajukan oleh
                pengguna mengenai platform Nutrizie</p>
        </div>

        <!-- Set active: 1 jika ingin item pertama terbuka saat pertama dimuat, atau set active: null jika ingin semua tertutup di awal -->
        <div x-data="{ active: 1 }" class="mt-6">
            <div id="accordion-flush">

                <!-- ITEM 1 -->
                <h2>
                    <button type="button" @click="active = (active === 1 ? null : 1)"
                        class="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3">
                        <span class="text-[13px] sm:text-xs text-left"
                            :class="{ 'text-[#35C6A8] dark:text-white': active === 1 }">Apa itu Nutrizie ?</span>
                        <div class="relative w-[14px] h-[14px] shrink-0 flex items-center justify-center">

                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-[14px] h-[14px] absolute transition-all duration-300 transform text-gray-500 dark:text-gray-400"
                                :class="active === 1 ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-[14px] h-[14px] absolute transition-all duration-300 transform text-prim"
                                :class="active === 1 ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'">
                                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                        </div>
                    </button>
                </h2>
                <!-- Transisi Smooth Height menggunakan x-collapse -->
                <div x-show="active === 1" x-collapse>
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-justify text-gray-500 text-[13px] sm:text-xs dark:text-gray-400">
                            Nutrizie merupakan platform yang menyediakan informasi gizi balita, pola makan sehat, serta
                            cara mengatasi tantangan asupan untuk balita. Platform ini juga dilengkapi sistem Cek status
                            gizi yang dapat memberikan gambaran awal mengenai status balita menggunakan metode BB/U dan
                            PB atau TB/U.
                        </p>
                    </div>
                </div>

                <!-- ITEM 2 -->
                <h2>
                    <button type="button" @click="active = (active === 2 ? null : 2)"
                        class="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3">
                        <span class="text-[13px] sm:text-xs text-left"
                            :class="{ 'text-[#35C6A8] dark:text-white': active === 2 }">Apa tujuan utama dari website
                            Nutrizie ?</span>
                        <div class="relative w-[14px] h-[14px] shrink-0 flex items-center justify-center">

                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-[14px] h-[14px] absolute transition-all duration-300 transform text-gray-500 dark:text-gray-400"
                                :class="active === 2 ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-[14px] h-[14px] absolute transition-all duration-300 transform text-prim"
                                :class="active === 2 ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'">
                                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                        </div>
                    </button>
                </h2>
                <div x-show="active === 2" x-collapse>
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-justify text-gray-500 text-[13px] sm:text-xs dark:text-gray-400">
                            Tujuan utama Nutrizie ialah untuk menyediakan informasi akurat dan terpercaya seputar gizi
                            balita, serta memberikan edukasi mengenai makanan yang sehat dan seimbang untuk anak-anak di
                            usia dini. Kami juga berfokus memberikan kemudahan akses bagi masyarakat untuk melakukan
                            pengecekan awal terhadap status gizi balita.
                        </p>
                    </div>
                </div>

                <!-- ITEM 3 -->
                <h2>
                    <button type="button" @click="active = (active === 3 ? null : 3)"
                        class="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3">
                        <span class="text-[13px] sm:text-xs text-left"
                            :class="{ 'text-[#35C6A8] dark:text-white': active === 3 }">Bagaimana cara mendapatkan
                            informasi gizi yang
                            tepat untuk balita di Nutrizie ?</span>
                        <div class="relative w-[14px] h-[14px] shrink-0 flex items-center justify-center">

                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-[14px] h-[14px] absolute transition-all duration-300 transform text-gray-500 dark:text-gray-400"
                                :class="active === 3 ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-[14px] h-[14px] absolute transition-all duration-300 transform text-prim"
                                :class="active === 3 ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'">
                                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                        </div>
                    </button>
                </h2>
                <div x-show="active === 3" x-collapse>
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-justify text-gray-500 text-[13px] sm:text-xs dark:text-gray-400">
                            Anda dapat mengakses berbagai artikel, panduan, dan tips terkait gizi balita berdasarkan
                            usia dan kebutuhan spesifik. Nutrizie menyediakan informasi yang mudah dipahami mengenai
                            jenis makanan yang tepat, jadwal makan yang ideal, serta tanda-tanda apabila anak mengalami
                            kekurangan gizi. Anda juga dapat mencari informasi berdasarkan kategori tertentu, seperti
                            gizi seimbang, menu makan sehat, atau cara meningkatkan nafsu makan balita.
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </div>
</section>
