<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - Hasil Gizi</title>
    <link rel="icon" href="{{ asset('img/nutrizie-icon.svg') }}">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/navbar.js'])
</head>

<body class="font-in font-feature-settings-cv11">

    <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
        <div class="flex font-semibold text-prim">
            {{ Breadcrumbs::render('hasilgizi') }}
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-6 mb-24">
        <div class="flex flex-col gap-y-6 w-full mb-10">

            {{-- Header halaman + logo --}}
            <div class="flex flex-col items-start gap-y-1">
                <h1 class="text-prim font-bold text-xl sm:text-xl">Hasil Cek Status Gizi</h1>
                <p class="text-gray-400 text-sm">
                    Tanggal Cek: {{ $tanggalCek->translatedFormat('d F Y') }} &nbsp;-&nbsp; Waktu:
                    {{ $tanggalCek->translatedFormat('H:i') }} WIB
                </p>
            </div>

            {{-- Card 1: Data Diri Balita --}}
            <div class="rounded-2xl ring-1 ring-inset ring-prim/20 overflow-hidden">
                <div class="bg-prim/10 px-5 py-3 border-b border-prim/10">
                    <p class="text-prim font-semibold text-sm">Data Diri Balita</p>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-1 divide-y divide-prim/10">
                    <div class="grid grid-cols-2 divide-x divide-prim/10 col-span-2 sm:col-span-1">
                        <div class="flex items-start gap-x-1.5 p-4">
                            {{-- IKON: user-01 --}}
                            <svg class="w-3 h-3 text-prim mt-0.5 flex-shrink-0" width="100%" height="100%"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.00002 21.8174C4.6026 22 5.41649 22 6.8 22H17.2C18.5835 22 19.3974 22 20 21.8174M4.00002 21.8174C3.87082 21.7783 3.75133 21.7308 3.63803 21.673C3.07354 21.3854 2.6146 20.9265 2.32698 20.362C2 19.7202 2 18.8802 2 17.2V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H17.2C18.8802 2 19.7202 2 20.362 2.32698C20.9265 2.6146 21.3854 3.07354 21.673 3.63803C22 4.27976 22 5.11984 22 6.8V17.2C22 18.8802 22 19.7202 21.673 20.362C21.3854 20.9265 20.9265 21.3854 20.362 21.673C20.2487 21.7308 20.1292 21.7783 20 21.8174M4.00002 21.8174C4.00035 21.0081 4.00521 20.5799 4.07686 20.2196C4.39249 18.6329 5.63288 17.3925 7.21964 17.0769C7.60603 17 8.07069 17 9 17H15C15.9293 17 16.394 17 16.7804 17.0769C18.3671 17.3925 19.6075 18.6329 19.9231 20.2196C19.9948 20.5799 19.9996 21.0081 20 21.8174M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-gray-500 text-xs">Nama</p>
                                <p class="text-gray-800 font-semibold text-sm">{{ $nama }}</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-x-1.5 p-4">
                            {{-- IKON: jenis kelamin --}}
                            <svg class="w-3 h-3 text-prim mt-0.5 flex-shrink-0" width="100%" height="100%"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 15.8369C19.4559 16.5683 20.7041 17.742 21.6152 19.2096C21.7956 19.5003 21.8858 19.6456 21.917 19.8468C21.9804 20.2558 21.7008 20.7585 21.3199 20.9204C21.1325 21 20.9216 21 20.5 21M16 11.5322C17.4817 10.7959 18.5 9.26686 18.5 7.5C18.5 5.73314 17.4817 4.20411 16 3.46776M14 7.5C14 9.98528 11.9852 12 9.49996 12C7.01468 12 4.99996 9.98528 4.99996 7.5C4.99996 5.01472 7.01468 3 9.49996 3C11.9852 3 14 5.01472 14 7.5ZM2.55919 18.9383C4.1535 16.5446 6.66933 15 9.49996 15C12.3306 15 14.8464 16.5446 16.4407 18.9383C16.79 19.4628 16.9646 19.725 16.9445 20.0599C16.9289 20.3207 16.7579 20.64 16.5495 20.7976C16.2819 21 15.9138 21 15.1776 21H3.82232C3.08613 21 2.71804 21 2.4504 20.7976C2.24201 20.64 2.07105 20.3207 2.05539 20.0599C2.03529 19.725 2.20992 19.4628 2.55919 18.9383Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-gray-500 text-xs">Jenis Kelamin</p>
                                <p class="text-gray-800 font-semibold text-sm">{{ $gender }}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="grid grid-cols-4 sm:grid-cols-2 divide-x divide-gray-100 sm:divide-x-0 col-span-2 sm:col-span-1 border-t border-gray-100">
                        <div class="flex items-start gap-x-1.5 p-4 sm:border-b sm:border-r sm:border-gray-100">
                            {{-- IKON: calendar/clock --}}
                            <svg class="w-3 h-3 text-prim mt-0.5 flex-shrink-0" width="100%" height="100%"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7ZM12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7ZM12 7L12 22M2 14H22M2 10.2L2 18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22L18.8 22C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V10.2C22 9.0799 22 8.51984 21.782 8.09202C21.5903 7.7157 21.2843 7.40974 20.908 7.21799C20.4802 7 19.9201 7 18.8 7L5.2 7C4.0799 7 3.51984 7 3.09202 7.21799C2.7157 7.40973 2.40973 7.71569 2.21799 8.09202C2 8.51984 2 9.07989 2 10.2Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-gray-500 text-xs">Usia</p>
                                <p class="text-gray-800 font-semibold text-sm">{{ $umur }} Bulan</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-x-1.5 p-4 sm:border-b sm:border-gray-100">
                            {{-- IKON: scale/gauge --}}
                            <svg class="h-3 w-3 text-prim mt-0.5 flex-shrink-0" width="100%" height="100%"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.50047 13H8.50047M15.5005 13H21.5005M12.0005 7V21M12.0005 7C13.3812 7 14.5005 5.88071 14.5005 4.5M12.0005 7C10.6198 7 9.50047 5.88071 9.50047 4.5M4.00047 21L20.0005 21M4.00047 4.50001L9.50047 4.5M9.50047 4.5C9.50047 3.11929 10.6198 2 12.0005 2C13.3812 2 14.5005 3.11929 14.5005 4.5M14.5005 4.5L20.0005 4.5M8.88091 14.3364C8.48022 15.8706 7.11858 17 5.50047 17C3.88237 17 2.52073 15.8706 2.12004 14.3364C2.0873 14.211 2.07093 14.1483 2.06935 13.8979C2.06838 13.7443 2.12544 13.3904 2.17459 13.2449C2.25478 13.0076 2.34158 12.8737 2.51519 12.6059L5.50047 8L8.48576 12.6059C8.65937 12.8737 8.74617 13.0076 8.82636 13.2449C8.87551 13.3904 8.93257 13.7443 8.9316 13.8979C8.93002 14.1483 8.91365 14.211 8.88091 14.3364ZM21.8809 14.3364C21.4802 15.8706 20.1186 17 18.5005 17C16.8824 17 15.5207 15.8706 15.12 14.3364C15.0873 14.211 15.0709 14.1483 15.0693 13.8979C15.0684 13.7443 15.1254 13.3904 15.1746 13.2449C15.2548 13.0076 15.3416 12.8737 15.5152 12.6059L18.5005 8L21.4858 12.6059C21.6594 12.8737 21.7462 13.0076 21.8264 13.2449C21.8755 13.3904 21.9326 13.7443 21.9316 13.8979C21.93 14.1483 21.9137 14.211 21.8809 14.3364Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-gray-500 text-xs">Berat Badan</p>
                                <p class="text-gray-800 font-semibold text-sm">{{ $berat }} kg</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-x-1.5 p-4 sm:border-r sm:border-gray-100">
                            {{-- IKON: ruler/expand --}}
                            <svg class="h-3 w-3 text-prim mt-0.5 flex-shrink-0" width="100%" height="100%"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.5 5.49989L16 6.99989M11.5 8.49989L13 9.99989M8.49996 11.4999L9.99996 12.9999M5.49996 14.4999L6.99996 15.9999M2.56561 17.5656L6.43424 21.4342C6.63225 21.6322 6.73125 21.7313 6.84542 21.7683C6.94584 21.801 7.05401 21.801 7.15443 21.7683C7.2686 21.7313 7.3676 21.6322 7.56561 21.4342L21.4342 7.56561C21.6322 7.3676 21.7313 7.2686 21.7683 7.15443C21.801 7.05401 21.801 6.94584 21.7683 6.84542C21.7313 6.73125 21.6322 6.63225 21.4342 6.43424L17.5656 2.56561C17.3676 2.3676 17.2686 2.2686 17.1544 2.2315C17.054 2.19887 16.9458 2.19887 16.8454 2.2315C16.7313 2.2686 16.6322 2.3676 16.4342 2.56561L2.56561 16.4342C2.3676 16.6322 2.2686 16.7313 2.2315 16.8454C2.19887 16.9458 2.19887 17.054 2.2315 17.1544C2.2686 17.2686 2.3676 17.3676 2.56561 17.5656Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-gray-500 text-xs">Panjang/Tinggi Badan</p>
                                <p class="text-gray-800 font-semibold text-sm">{{ $panjang }} cm</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-x-1.5 p-4">
                            {{-- IKON: settings/align --}}
                            <svg class="h-3 w-3 text-prim mt-0.5 flex-shrink-0" width="100%" height="100%"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 21V14M5 10V3M12 21V12M12 8V3M19 21V16M19 12V3M2 14H8M9 8H15M16 16H22"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-gray-500 text-xs">Metode Ukur</p>
                                <p class="text-gray-800 font-semibold text-sm">
                                    {{ $metodeUkur === 'PB' ? 'Terlentang (PB)' : 'Berdiri (TB)' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Card 2: Hasil Pemeriksaan --}}
            <div class="rounded-2xl ring-1 ring-inset ring-prim/20 overflow-hidden">
                <div class="bg-prim/10 px-5 py-3 border-b border-prim/10">
                    <p class="text-prim font-semibold text-sm">Hasil Pemeriksaan</p>
                </div>

                <div class="p-5 flex flex-col space-y-5">

                    {{-- Tabel --}}
                    <table class="w-full table-fixed border-collapse text-sm text-gray-500 sm:overflow-x-auto">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-200 text-gray-700 p-2 text-xs text-center">Metode
                                    Perhitungan
                                </th>
                                <th class="border border-gray-200 text-gray-700 p-2 text-xs text-center">Z-Score</th>
                                <th class="border border-gray-200 text-gray-700 p-2 text-xs text-center">Status Gizi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border border-gray-200 p-2 text-xs text-justify">Metode BB/U adalah metode
                                    untuk
                                    menilai
                                    status gizi anak berdasarkan berat badan relatif terhadap umurnya</td>
                                <td class="border border-gray-200 p-2 text-xs text-center">
                                    {{ number_format($zscoreBbu, 2) }}
                                </td>
                                <td class="border border-gray-200 p-2 text-xs text-center">{{ $statusBbu }}</td>
                            </tr>
                            <tr>
                                <td class="border border-gray-200 p-2 text-xs text-justify">Metode PB/U adalah metode
                                    untuk
                                    menilai
                                    status gizi anak berdasarkan Panjang/Tinggi badan relatif terhadap umurnya</td>
                                <td class="border border-gray-200 p-2 text-xs text-center">
                                    {{ number_format($zscorePbu, 2) }}
                                </td>
                                <td class="border border-gray-200 p-2 text-xs text-center">{{ $statusPbu }}</td>
                            </tr>
                        </tbody>
                    </table>

                    {{-- catatan --}}
                    <div class="mt-4 flex space-x-2 bg-prim/5 rounded-xl p-4 ring ring-prim/10 ring-inset">
                        <div class="flex items-start">
                            <svg class="w-3.5 h-3.5 text-prim" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>
                        </div>

                        <div class="flex flex-col space-y-2">
                            <p class="text-gray-700 font-semibold text-xs">Catatan & Rekomendasi</p>
                            <p class="text-gray-500 text-xs text-justify">{{ $catatan }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Tombol Kembali -->
        <div class="mt-6">
            <a href="{{ url('/cekgizi') }}"
                class="w-fit rounded-lg bg-prim px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gratwo transition-all duration-300  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prim">
                Kembali
            </a>
        </div>
    </section>

    <x-footer></x-footer>

</body>

</html>
