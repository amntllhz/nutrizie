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
        <div class="flex flex-col p-10 w-full mb-10 sm:px-4 bg-white rounded-3xl ring-1 ring-inset ring-prim/20">
            <div class="space-y-2">
                <h1 class="text-xl text-prim font-bold bg-prim/10 rounded-md text-center py-2 px-4">Hasil Cek Gizi
                    Balita</h1>
                <div class="flex justify-start mt-6 mb-2 w-1/2 sm:w-full">
                    <div class="flex-1 flex-col space-y-1 text-left w-full ">
                        <p class="text-gray-700 font-semibold text-xs">Nama</p>
                        <p class="text-gray-700 font-semibold text-xs">Jenis Kelamin</p>
                        <p class="text-gray-700 font-semibold text-xs">Berat Badan</p>
                        <p class="text-gray-700 font-semibold text-xs">Panjang Badan</p>
                    </div>
                    <div class="flex-2 flex-col space-y-1 text-left w-full ">
                        <p class="text-gray-500 text-xs">{{ $nama }}</p>
                        <p class="text-gray-500 text-xs">{{ $gender }}</p>
                        <p class="text-gray-500 text-xs">{{ $berat }} kg</p>
                        <p class="text-gray-500 text-xs">{{ $panjang }} cm</p>
                    </div>
                </div>
            </div>

            <!-- Tabel Hasil BB/U -->

            <table class="w-full table-fixed mt-4 border-collapse text-sm text-gray-500 sm:overflow-x-auto">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-200 text-gray-700 p-2 text-xs text-left">Metode Perhitungan</th>
                        <th class="border border-gray-200 text-gray-700 p-2 text-xs text-center">Z-Score</th>
                        <th class="border border-gray-200 text-gray-700 p-2 text-xs text-center">Status Gizi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-gray-200 p-2 text-xs text-justify">Metode BB/U adalah metode untuk
                            menilai
                            status gizi anak berdasarkan berat badan relatif terhadap umurnya</td>
                        <td class="border border-gray-200 p-2 text-xs text-center">{{ number_format($zscoreBbu, 2) }}
                        </td>
                        <td class="border border-gray-200 p-2 text-xs text-center">{{ $statusBbu }}</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-200 p-2 text-xs text-justify">Metode PB/U adalah metode untuk
                            menilai
                            status gizi anak berdasarkan Panjang/Tinggi badan relatif terhadap umurnya</td>
                        <td class="border border-gray-200 p-2 text-xs text-center">{{ number_format($zscorePbu, 2) }}
                        </td>
                        <td class="border border-gray-200 p-2 text-xs text-center">{{ $statusPbu }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="mt-4 space-y-2 p-2">
                <p class="text-gray-700 font-semibold text-xs">Catatan :</p>
                <div class="flex flex-col space-y-1">
                    <p class="text-gray-500 text-xs"><span class="text-prim text-xs font-bold">BB/U</span>
                        {{ $catatan['bb'] }}
                    </p>
                    <p class="text-gray-500 text-xs"><span class="text-prim text-xs font-bold">PB/U</span>
                        {{ $catatan['pb'] }}
                    </p>
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
