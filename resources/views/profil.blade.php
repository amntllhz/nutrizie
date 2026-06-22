@extends('layout.layout')

@section('title', 'Profil')

@section('content')

    <body class="font-in">

        <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
            <div class="flex font-semibold text-prim">
                {{ Breadcrumbs::render('profil') }}
            </div>
        </section>

        <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24">
            <div class="flex flex-col w-full mb-10 sm:px-2">

                <div class="flex mx-auto mb-5">
                    <img class="h-8 sm:h-4" src="{{ asset('img/nutrizie-logo.svg') }}" alt="">
                </div>

                <div class="flex mx-auto items-center space-x-2.5 mb-8">
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

                <div class="space-y-3">
                    <p
                        class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                        <span class="font-bold text-prim">Nutrizie</span> adalah platform digital yang dirancang untuk
                        mendukung orang tua dan pengasuh dalam memastikan tumbuh kembang optimal balita melalui edukasi gizi
                        yang komprehensif. Kami hadir untuk memberikan informasi yang akurat, berbasis data ilmiah, dan
                        mudah diakses mengenai gizi anak, sehingga setiap keluarga dapat membuat keputusan terbaik untuk
                        kesehatan si kecil.
                    </p>
                    <p
                        class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                        Melalui Nutrizie, Anda dapat menemukan berbagai artikel edukasi yang disusun oleh tim ahli gizi dan
                        kesehatan mengenai kebutuhan <span class="font-bold text-prim">Nutrisi Balita</span>, <span
                            class="font-bold text-prim">Menu Sehat</span>, hingga <span
                            class="font-bold text-prim">Panduan</span> menghadapi masalah makan pada anak. Semua informasi
                        disajikan dengan bahasa yang sederhana namun tetap berbobot, sehingga dapat dengan mudah dipahami
                        oleh semua orang tua.
                    </p>
                    <p
                        class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                        Kami memahami bahwa <span class="font-bold text-prim">memantau gizi balita secara berkala</span>
                        adalah langkah penting dalam mendukung tumbuh kembangnya. Oleh karena itu, Nutrizie menyediakan
                        fitur <span class="font-bold text-prim">Cek Gizi Otomatis</span> yang memungkinkan Anda mengetahui
                        kondisi gizi si kecil secara akurat. Dengan memasukkan data seperti berat badan, panjang badan, dan
                        usia anak, sistem kami akan menganalisis status gizi berdasarkan standar antropometri yang diakui
                        secara internasional.
                    </p>
                    <p
                        class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                        Dengan semangat untuk mendukung generasi sehat Indonesia, Nutrizie terus berinovasi dalam
                        menghadirkan layanan yang relevan dan bermanfaat. Kami percaya bahwa investasi terbaik bagi masa
                        depan anak adalah melalui pemberian gizi yang optimal sejak dini. Mari bersama wujudkan anak-anak
                        Indonesia yang sehat, cerdas, dan berprestasi!
                    </p>
                </div>
            </div>
        </section>

        <x-footer></x-footer>

    </body>

@endsection
