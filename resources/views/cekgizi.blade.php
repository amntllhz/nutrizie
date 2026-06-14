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
                class="mt-10 grid grid-cols-6 gap-6 sm:grid-cols-1">
                @csrf
                <div class="col-span-3">
                    <label for="nama" class="block mb-2 text-sm font-medium text-gray-400">Nama</label>
                    <input name="nama" id="nama" type="text"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-400 placeholder:text-xs focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan nama" required autocomplete="off" />
                </div>
                <div class="col-span-3">
                    <label for="gender" class="block mb-2 text-sm font-medium text-gray-400">Jenis Kelamin</label>
                    <select id="gender" name="gender"
                        class="bg-gray-50 border border-gray-300 text-prim text-xs rounded-lg focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option class="text-xs" value="Laki-laki">Laki-laki</option>
                        <option class="text-xs" value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <div class="col-span-2 sm:col-span-3">
                    <label for="umur" class="block mb-2 text-sm font-medium text-gray-400">Umur ( Dalam bulan
                        )</label>
                    <input name="umur" id="umur" type="number" min="0" max="60"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-400 placeholder:text-xs focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan Umur" required autocomplete="off" inputmode="numeric" />
                </div>
                <div class="col-span-2 sm:col-span-3">
                    <label for="berat" class="block mb-2 text-sm font-medium text-gray-400">Berat Badan</label>
                    <input name="berat" id="berat" type="text" step="0.1" min="0"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-400 placeholder:text-xs focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan Berat Badan" required autocomplete="off" />
                </div>
                <div class="col-span-2 sm:col-span-3">
                    <label for="panjang" class="block mb-2 text-sm font-medium text-gray-400">Panjang Badan</label>
                    <input name="panjang" id="panjang" type="text" step="0.1" min="0"
                        class=" bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-400 placeholder:text-xs focus:ring-prim focus:border-prim block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-prim dark:focus:border-prim"
                        placeholder="Tuliskan Berat Badan" required autocomplete="off" />
                </div>

                <button type="submit"
                    class="col-span-2 w-fit flex gap-2 items-center rounded-lg bg-prim px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gratwo transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prim">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M2.4 0C1.76348 0 1.15303 0.252856 0.702944 0.702944C0.252856 1.15303 0 1.76348 0 2.4V13.6C0 14.2365 0.252856 14.847 0.702944 15.2971C1.15303 15.7471 1.76348 16 2.4 16H9.6V12C9.6 11.3635 9.85286 10.753 10.3029 10.3029C10.753 9.85286 11.3635 9.6 12 9.6H16V2.4C16 1.76348 15.7471 1.15303 15.2971 0.702944C14.847 0.252856 14.2365 0 13.6 0H2.4ZM12.2344 15.2968C11.9468 15.5844 11.5909 15.7941 11.2 15.9064V12C11.2 11.7878 11.2843 11.5843 11.4343 11.4343C11.5843 11.2843 11.7878 11.2 12 11.2H15.9064C15.7941 11.5909 15.5844 11.9468 15.2968 12.2344L12.2344 15.2968ZM4 3.2C3.78783 3.2 3.58434 3.28429 3.43431 3.43431C3.28429 3.58434 3.2 3.78783 3.2 4C3.2 4.21217 3.28429 4.41566 3.43431 4.56569C3.58434 4.71571 3.78783 4.8 4 4.8H12C12.2122 4.8 12.4157 4.71571 12.5657 4.56569C12.7157 4.41566 12.8 4.21217 12.8 4C12.8 3.78783 12.7157 3.58434 12.5657 3.43431C12.4157 3.28429 12.2122 3.2 12 3.2H4ZM4 6.4C3.78783 6.4 3.58434 6.48429 3.43431 6.63431C3.28429 6.78434 3.2 6.98783 3.2 7.2C3.2 7.41217 3.28429 7.61566 3.43431 7.76569C3.58434 7.91571 3.78783 8 4 8H12C12.2122 8 12.4157 7.91571 12.5657 7.76569C12.7157 7.61566 12.8 7.41217 12.8 7.2C12.8 6.98783 12.7157 6.78434 12.5657 6.63431C12.4157 6.48429 12.2122 6.4 12 6.4H4ZM4 9.6C3.78783 9.6 3.58434 9.68429 3.43431 9.83431C3.28429 9.98434 3.2 10.1878 3.2 10.4C3.2 10.6122 3.28429 10.8157 3.43431 10.9657C3.58434 11.1157 3.78783 11.2 4 11.2H7.2C7.41217 11.2 7.61566 11.1157 7.76569 10.9657C7.91571 10.8157 8 10.6122 8 10.4C8 10.1878 7.91571 9.98434 7.76569 9.83431C7.61566 9.68429 7.41217 9.6 7.2 9.6H4Z"
                            fill="white" />
                    </svg>
                    Cek Status Gizi
                </button>
            </form>
        </div>
    </section>

    <x-footer></x-footer>

</body>

</html>
