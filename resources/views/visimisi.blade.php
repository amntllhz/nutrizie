@extends('layout.layout')

@section('title', 'Visi & Misi')

@section('content')

    <body class="font-in">

        <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
            <div class="flex font-semibold text-prim">
                {{ Breadcrumbs::render('visimisi') }}
            </div>
        </section>

        <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24">
            <div class="flex flex-col w-full mb-10 sm:px-2">
                <div class="flex mx-auto mb-6">
                    <img class="h-8 sm:h-4" src="{{ asset('img/nutrizie-logo.svg') }}" alt="">
                </div>

                <div class="flex mx-auto items-center space-x-2.5 mb-6">
                    <p
                        class="font-semibold text-xs py-1.5 px-3.5 text-prim bg-prim/5 rounded-lg ring ring-inset ring-prim/10">
                        Informasi Gizi</p>
                    <p
                        class="font-semibold text-xs py-1.5 px-3.5 text-prim bg-prim/5 rounded-lg ring ring-inset ring-prim/10">
                        Cek Status Gizi</p>
                    <p
                        class="font-semibold text-xs py-1.5 px-3.5 text-prim bg-prim/5 rounded-lg ring ring-inset ring-prim/10">
                        Panduan Gizi</p>
                </div>

                <div class="space-y-2 mb-6">
                    <h1 class="text-2xl text-prim font-bold sm:text-xl">Visi</h1>
                    <p class="text-gray-500 text-sm text-justify leading-relaxed">
                        Menjadi platform digital terdepan yang mendukung orang tua dan pengasuh dalam meningkatkan kualitas
                        hidup balita melalui edukasi gizi yang akurat, inovasi teknologi yang ramah pengguna, dan layanan
                        konsultasi berbasis data. Dengan berkomitmen pada pertumbuhan generasi yang sehat, cerdas, dan
                        berdaya saing, Nutrizie hadir sebagai mitra terpercaya dalam memberikan informasi, solusi, dan
                        panduan praktis untuk memastikan tumbuh kembang optimal anak-anak Indonesia.
                    </p>
                </div>

                <div class="space-y-2">
                    <h1 class="text-2xl text-prim font-bold sm:text-xl">Misi</h1>
                    <div class="pl-4">
                        <ol class="list-decimal list-outside space-y-1">
                            <li class="text-gray-500 text-sm text-justify leading-relaxed">Menyediakan Informasi Edukatif:
                                Memberikan akses mudah terhadap artikel dan panduan gizi balita yang akurat, terpercaya, dan
                                berbasis data ilmiah.</li>
                            <li class="text-gray-500 text-sm text-justify leading-relaxed">Meningkatkan Kesadaran Orang Tua:
                                Mengedukasi orang tua dan pengasuh tentang pentingnya gizi dalam tumbuh kembang anak melalui
                                konten yang relevan dan interaktif.</li>
                            <li class="text-gray-500 text-sm text-justify leading-relaxed">Mendukung Pemantauan Gizi Anak:
                                Mengembangkan fitur otomatis untuk mengevaluasi status gizi balita secara cepat, akurat, dan
                                sesuai standar internasional.</li>
                            <li class="text-gray-500 text-sm text-justify leading-relaxed">Memfasilitasi Akses Informasi
                                Praktis: Menyediakan buku panduan gizi balita online yang dapat diakses kapan saja untuk
                                membantu orang tua merencanakan pola makan sehat.</li>
                            <li class="text-gray-500 text-sm text-justify leading-relaxed">Berinovasi dalam Pelayanan:
                                Mengintegrasikan teknologi terkini untuk terus meningkatkan pengalaman pengguna dalam
                                mengakses layanan edukasi dan konsultasi gizi balita.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <x-footer></x-footer>

    </body>

@endsection
