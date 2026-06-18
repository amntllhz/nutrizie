<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - Cek Gizi</title>
    <link rel="icon" href="{{ asset('img/nutrizie-icon.svg') }}">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/navbar.js', 'resources/js/formval.js'])
</head>

<body class="font-in font-feature-settings-cv11">

    <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
        <div class="flex font-semibold text-prim">
            {{ Breadcrumbs::render('cekgizi') }}
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-6 mb-20">
        <div class="flex flex-col w-full">
            <div class="space-y-4">
                <h1 class="text-3xl text-prim font-bold sm:text-xl">Cek Gizi Balita</h1>
                <p class="text-gray-500 text-sm text-justify">Platform ini hadir untuk menyediakan informasi tentang
                    makanan bergizi,
                    pola makan yang tepat sesuai usia, serta cara mengatasi tantangan yang
                    sering dihadapi dalam memberi makan balita. <span class="font-bold text-prim">Cek status gizi</span>
                    balita Anda
                    secara langsung untuk memastikan mereka mendapatkan kebutuhan
                    nutrisi yang optimal
                </p>
            </div>
            <form method="POST" action="{{ route('cekgizi.hitung') }}"
                class="mt-10 grid grid-cols-6 gap-6 sm:grid-cols-1" x-data="{ loading: false }" @submit="loading = true">
                @csrf
                <div class="col-span-3">
                    <label for="nama" class="block mb-2 text-xs font-medium text-gray-400">Nama</label>
                    <input name="nama" id="nama" type="text"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan nama" required autocomplete="off" />
                </div>
                <div class="col-span-3">
                    <label for="gender" class="block mb-2 text-xs font-medium text-gray-400">Jenis Kelamin</label>
                    <select id="gender" name="gender"
                        class="bg-gray-50 border border-gray-300 text-prim text-xs rounded-lg focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option class="text-xs" value="Laki-laki">Laki-laki</option>
                        <option class="text-xs" value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <div class="col-span-2 sm:col-span-3">
                    <label for="umur" class="block mb-2 text-xs font-medium text-gray-400">Umur ( Dalam bulan
                        )</label>
                    <input name="umur" id="umur" type="number" min="0" max="60"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan Umur" required autocomplete="off" inputmode="numeric" />
                </div>
                <div class="col-span-2 sm:col-span-3">
                    <label for="berat" class="block mb-2 text-xs font-medium text-gray-400">Berat Badan (Kg)</label>
                    <input name="berat" id="berat" type="text" step="0.1" min="0"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan Berat Badan" required autocomplete="off" />
                </div>
                <div class="col-span-2 sm:col-span-3">
                    <label for="panjang" class="block mb-2 text-xs font-medium text-gray-400">Panjang Badan
                        (Cm)</label>
                    <input name="panjang" id="panjang" type="text" step="0.1" min="0"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan Berat Badan" required autocomplete="off" />
                </div>

                <button type="submit" :disabled="loading"
                    class="col-span-2 w-fit flex gap-x-1.5 justify-center items-center text-white text-center cursor-pointer font-semibold bg-prim hover:bg-gratwo transition duration-300 ease-in-out px-6 py-2 text-sm rounded-lg inset-ring inset-ring-gratwo/50 outline -outline-offset-2 outline-gratwo/40 shadow-md shadow-gratwo/30 inset-shadow-[0_-3px_4px] inset-shadow-gratwo/50 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prim">

                    {{-- <svg x-show="!loading" class="h-4 w-4 text-white" width="100%" height="100%" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.5 11.5H14.5L13 14.5L11 8.5L9.5 11.5H8.5M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.75009 14.4724 8.97129 18.311 10.948 20.0749C11.3114 20.3991 11.4931 20.5613 11.7058 20.6251C11.8905 20.6805 12.0958 20.6805 12.2805 20.6251C12.4932 20.5613 12.6749 20.3991 13.0383 20.0749C15.015 18.311 19.2362 14.4724 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> --}}

                    <svg x-show="!loading" class="h-4 w-4 text-white" width="100%" height="100%" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M12.5 11H8M9 15H8M16 7H8M16.9973 14.8306C16.1975 13.9216 14.8639 13.6771 13.8619 14.5094C12.8599 15.3418 12.7188 16.7335 13.5057 17.7179C14.2926 18.7024 16.9973 21 16.9973 21C16.9973 21 19.7019 18.7024 20.4888 17.7179C21.2757 16.7335 21.1519 15.3331 20.1326 14.5094C19.1134 13.6858 17.797 13.9216 16.9973 14.8306Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <svg x-show="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" style="display: none;">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>

                    <span x-text="loading ? 'Menghitung...' : 'Cek Status Gizi'"></span>
                </button>
            </form>
        </div>
    </section>

    <x-footer></x-footer>

</body>

</html>
