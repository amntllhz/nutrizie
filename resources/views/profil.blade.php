<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - Profil</title>
    <link rel="icon" href="{{ asset('img/nutrizie-icon.svg') }}">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/navbar.js', 'resources/js/success.js'])
</head>

<body class="font-in font-feature-settings-cv11">

    <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
        <div class="flex font-semibold text-prim">
            {{ Breadcrumbs::render('profil') }}
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-4 mb-24">
        <div class="flex flex-col w-full mb-10 sm:px-2">
            <div
                class="flex mx-auto mb-4 w-fit px-10 py-4 bg-prim bg-opacity-10 rounded-2xl sm:px-8 sm:py-4 sm:rounded-xl">
                <svg width="171" height="33" viewBox="0 0 171 33" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.7764 0.888233L0.880633 12.781C0.841858 12.8199 0.791408 12.8449 0.737016 12.8524C0.682624 12.8598 0.627293 12.8492 0.57951 12.8222C0.531727 12.7951 0.494129 12.7532 0.47248 12.7028C0.450831 12.6523 0.446327 12.5962 0.459659 12.5429C1.06097 10.0977 2.21672 7.82351 3.83756 5.89616C4.14656 5.52914 4.47381 5.17239 4.81931 4.82592C5.08295 4.56305 5.35297 4.31046 5.62937 4.06814C7.61033 2.33097 9.98038 1.09593 12.5393 0.467364C12.5925 0.454385 12.6484 0.459143 12.6987 0.480915C12.7489 0.502687 12.7906 0.540277 12.8174 0.587954C12.8443 0.635632 12.8548 0.690781 12.8474 0.744994C12.84 0.799207 12.8151 0.849509 12.7764 0.888233Z"
                        fill="#92E48B" />
                    <path
                        d="M6.13167 29.1088C5.52404 28.6914 4.94481 28.2341 4.3978 27.7399C4.34217 27.6889 4.28901 27.6357 4.23834 27.5805C1.69288 24.7689 0.196625 21.1648 0.00253907 17.3776C-0.0123291 17.0666 0.0382249 16.7561 0.150933 16.4659C0.263642 16.1757 0.435997 15.9124 0.656858 15.693L5.56346 10.7877C5.7715 10.5797 6.01849 10.4147 6.29031 10.3021C6.56214 10.1895 6.85348 10.1316 7.1477 10.1316C7.44192 10.1316 7.73326 10.1895 8.00508 10.3021C8.27691 10.4147 8.5239 10.5797 8.73194 10.7877L12.8093 14.8672C13.1826 15.2394 13.4124 15.7313 13.4582 16.2563C13.504 16.7814 13.3629 17.3057 13.0597 17.7368C11.0536 20.5871 9.86527 23.9315 9.62332 27.4083C9.5016 29.1295 7.55831 30.0898 6.13167 29.1088Z"
                        fill="#63D69B" />
                    <path
                        d="M14.5787 13.0153L10.539 8.97666C10.331 8.76872 10.1659 8.52184 10.0533 8.25013C9.94076 7.97841 9.88281 7.68719 9.88281 7.39308C9.88281 7.09898 9.94076 6.80776 10.0533 6.53604C10.1659 6.26433 10.331 6.01745 10.539 5.80951L15.6949 0.654913C15.9353 0.4142 16.2275 0.231608 16.5493 0.121088C16.8711 0.0105685 17.2139 -0.0249555 17.5515 0.0172308L17.6047 0.0236074C21.6821 0.544401 25.4702 2.40685 28.372 5.31743C28.5453 5.49067 28.7143 5.66639 28.8791 5.84458C28.947 5.91822 29.0097 5.99653 29.0667 6.07893L29.0917 6.11453C30.0798 7.54613 29.1448 9.507 27.4088 9.62869C23.8235 9.8767 20.3808 11.1306 17.4761 13.2465C17.0447 13.5591 16.5158 13.7076 15.9847 13.6652C15.4536 13.6228 14.955 13.3924 14.5787 13.0153Z"
                        fill="#35C6A8" />
                    <path
                        d="M27.1583 27.159C26.8128 27.5048 26.456 27.8319 26.0878 28.1405C22.821 30.882 18.619 32.2516 14.3637 31.9618C13.8205 31.9259 13.3089 31.694 12.9239 31.3091C12.539 30.9243 12.307 30.4127 12.2711 29.8697C11.9812 25.6155 13.3512 21.4145 16.0933 18.1486C16.4016 17.7812 16.7289 17.4244 17.0751 17.0783C17.3387 16.8147 17.6087 16.5622 17.8851 16.3205C19.5176 14.8913 21.4163 13.7982 23.4722 13.1041C25.5281 12.4099 27.7009 12.1284 29.8659 12.2755C30.4103 12.311 30.9231 12.5432 31.3088 12.9288C31.6946 13.3144 31.9268 13.8272 31.9623 14.3714C32.1094 16.5358 31.8277 18.708 31.1334 20.7634C30.4391 22.8188 29.3458 24.717 27.9163 26.3492C27.6749 26.6255 27.4223 26.8954 27.1583 27.159Z"
                        fill="#00B4AF" />
                    <path
                        d="M48.616 17.84C48.616 13.968 51.014 11.548 54.028 11.548C55.854 11.548 57.152 12.384 57.812 13.462V11.724H61.574V24H57.812V22.262C57.13 23.34 55.832 24.176 54.006 24.176C51.014 24.176 48.616 21.712 48.616 17.84ZM57.812 17.862C57.812 15.904 56.558 14.826 55.128 14.826C53.72 14.826 52.444 15.882 52.444 17.84C52.444 19.798 53.72 20.898 55.128 20.898C56.558 20.898 57.812 19.82 57.812 17.862ZM72.7656 24V17.334C72.7656 15.662 71.8416 14.738 70.4116 14.738C68.9816 14.738 68.0576 15.662 68.0576 17.334V24H64.2956V11.724H68.0576V13.352C68.8056 12.318 70.1256 11.592 71.7756 11.592C74.6136 11.592 76.5056 13.528 76.5056 16.828V24H72.7656ZM78.3719 17.84C78.3719 13.968 80.7699 11.548 83.7839 11.548C85.6099 11.548 86.9079 12.384 87.5679 13.462V11.724H91.3299V24H87.5679V22.262C86.8859 23.34 85.5879 24.176 83.7619 24.176C80.7699 24.176 78.3719 21.712 78.3719 17.84ZM87.5679 17.862C87.5679 15.904 86.3139 14.826 84.8839 14.826C83.4759 14.826 82.1999 15.882 82.1999 17.84C82.1999 19.798 83.4759 20.898 84.8839 20.898C86.3139 20.898 87.5679 19.82 87.5679 17.862ZM94.0515 24V7.72H97.8135V16.718L101.532 11.724H106.174L101.07 17.884L106.218 24H101.554L97.8135 18.852V24H94.0515ZM117.617 20.436C117.617 22.57 115.725 24.176 112.645 24.176C109.367 24.176 107.167 22.35 106.991 19.974H110.709C110.797 20.832 111.567 21.404 112.601 21.404C113.569 21.404 114.075 20.964 114.075 20.414C114.075 18.434 107.387 19.864 107.387 15.354C107.387 13.264 109.169 11.548 112.381 11.548C115.549 11.548 117.309 13.308 117.551 15.728H114.075C113.965 14.892 113.327 14.342 112.271 14.342C111.391 14.342 110.907 14.694 110.907 15.288C110.907 17.246 117.551 15.86 117.617 20.436ZM125.331 14.562C124.099 14.562 123.153 15.31 122.933 16.674H127.641C127.641 15.332 126.585 14.562 125.331 14.562ZM131.205 19.93C130.611 22.328 128.433 24.176 125.375 24.176C121.767 24.176 119.171 21.756 119.171 17.862C119.171 13.968 121.723 11.548 125.375 11.548C128.961 11.548 131.491 13.924 131.491 17.664C131.491 18.016 131.469 18.39 131.425 18.764H122.911C123.043 20.37 124.033 21.118 125.243 21.118C126.299 21.118 126.893 20.59 127.201 19.93H131.205ZM133.475 24V7.72H137.237V13.374C137.985 12.318 139.327 11.592 141.021 11.592C143.815 11.592 145.685 13.528 145.685 16.828V24H141.945V17.334C141.945 15.662 141.021 14.738 139.591 14.738C138.161 14.738 137.237 15.662 137.237 17.334V24H133.475ZM147.552 17.84C147.552 13.968 149.95 11.548 152.964 11.548C154.79 11.548 156.088 12.384 156.748 13.462V11.724H160.51V24H156.748V22.262C156.066 23.34 154.768 24.176 152.942 24.176C149.95 24.176 147.552 21.712 147.552 17.84ZM156.748 17.862C156.748 15.904 155.494 14.826 154.064 14.826C152.656 14.826 151.38 15.882 151.38 17.84C151.38 19.798 152.656 20.898 154.064 20.898C155.494 20.898 156.748 19.82 156.748 17.862ZM163.825 19.732V14.848H162.329V11.724H163.825V8.732H167.587V11.724H170.051V14.848H167.587V19.776C167.587 20.502 167.895 20.81 168.731 20.81H170.073V24H168.159C165.607 24 163.825 22.922 163.825 19.732Z"
                        fill="#35C6A8" />
                </svg>
            </div>

            <div class="flex mx-auto items-center space-x-2 mb-4">
                <p class="font-semibold text-xs py-2 px-4 text-prim bg-prim bg-opacity-10 rounded-md">Artikel Gizi</p>
                <p class="font-semibold text-xs py-2 px-4 text-prim bg-prim bg-opacity-10 rounded-md">Cek Status Gizi
                </p>
                <p class="font-semibold text-xs py-2 px-4 text-prim bg-prim bg-opacity-10 rounded-md">Panduan Gizi</p>
            </div>

            <div class="space-y-3">
                <p
                    class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                    <span class="font-bold text-prim">Anaksehat</span> adalah platform digital yang dirancang untuk
                    mendukung orang tua dan pengasuh dalam memastikan tumbuh kembang optimal balita melalui edukasi gizi
                    yang komprehensif. Kami hadir untuk memberikan informasi yang akurat, berbasis data ilmiah, dan
                    mudah diakses mengenai gizi anak, sehingga setiap keluarga dapat membuat keputusan terbaik untuk
                    kesehatan si kecil.
                </p>
                <p
                    class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                    Melalui Anaksehat, Anda dapat menemukan berbagai artikel edukasi yang disusun oleh tim ahli gizi dan
                    kesehatan mengenai kebutuhan <span class="font-bold text-prim">Nutrisi Balita</span>, <span
                        class="font-bold text-prim">Menu Sehat</span>, hingga <span
                        class="font-bold text-prim">Panduan</span> menghadapi masalah makan pada anak. Semua informasi
                    disajikan dengan bahasa yang sederhana namun tetap berbobot, sehingga dapat dengan mudah dipahami
                    oleh semua orang tua.
                </p>
                <p
                    class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                    Kami memahami bahwa <span class="font-bold text-prim">memantau gizi balita secara berkala</span>
                    adalah langkah penting dalam mendukung tumbuh kembangnya. Oleh karena itu, Anaksehat menyediakan
                    fitur <span class="font-bold text-prim">Cek Gizi Otomatis</span> yang memungkinkan Anda mengetahui
                    kondisi gizi si kecil secara akurat. Dengan memasukkan data seperti berat badan, panjang badan, dan
                    usia anak, sistem kami akan menganalisis status gizi berdasarkan standar antropometri yang diakui
                    secara internasional.
                </p>
                <p
                    class="w-full text-gray-500 text-sm text-justify leading-relaxed sm:w-full sm:text-xs sm:leading-relaxed">
                    Dengan semangat untuk mendukung generasi sehat Indonesia, AnakSehat terus berinovasi dalam
                    menghadirkan layanan yang relevan dan bermanfaat. Kami percaya bahwa investasi terbaik bagi masa
                    depan anak adalah melalui pemberian gizi yang optimal sejak dini. Mari bersama wujudkan anak-anak
                    Indonesia yang sehat, cerdas, dan berprestasi!
                </p>
            </div>
        </div>
    </section>

    <x-footer></x-footer>

</body>

</html>
