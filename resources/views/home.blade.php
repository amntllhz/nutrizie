<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>anaksehat - Beranda</title>
    <link rel="icon" href="{{ asset('img/iconanaksehat.svg') }}">

    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/success.js'])
</head>

<body class="font-in font-feature-settings-cv11">

    <x-navbar></x-navbar>

    <x-hero></x-hero>

    <x-features></x-features>

    <x-faqs></x-faqs>

    <x-footer></x-footer>

    <!-- Modal toggle -->
    @if (session('success'))
        <div id="default-modal" tabindex="-1" aria-hidden="true"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="relative p-7 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-xl shadow sm:max-w-sm dark:bg-gray-700">

                    <!-- Modal header -->
                    <div class="flex items-center justify-end p-4 border-b rounded-t dark:border-gray-600">
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="default-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    <!-- Modal body -->
                    <div class="p-4 space-y-4 flex flex-col items-center">
                        <svg width="185" height="124" viewBox="0 0 185 124" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M44.75 27C47.6375 27 50 24.57 50 21.6C50 18.63 47.6375 16.2 44.75 16.2H44.4875C44.4875 15.39 44.75 14.58 44.75 13.5C44.75 7.56 40.025 2.7 34.25 2.7C32.15 2.7 30.3125 3.24 28.475 4.32C27.6875 1.89 25.325 0 22.4375 0C18.7625 0 15.875 2.97 15.875 6.75C15.875 8.37 16.4 9.72 17.45 11.07C16.925 10.8 16.4 10.8 15.875 10.8C11.4125 10.8 8 14.31 8 18.9C8 23.49 11.4125 27 15.875 27H44.75Z"
                                fill="#CCF1E9" />
                            <path
                                d="M27.125 97C29.2563 97 31 95.2 31 93C31 90.8 29.2563 89 27.125 89H26.9312C26.9312 88.4 27.125 87.8 27.125 87C27.125 82.6 23.6375 79 19.375 79C17.825 79 16.4688 79.4 15.1125 80.2C14.5312 78.4 12.7875 77 10.6562 77C7.94375 77 5.8125 79.2 5.8125 82C5.8125 83.2 6.2 84.2 6.975 85.2C6.5875 85 6.2 85 5.8125 85C2.51875 85 0 87.6 0 91C0 94.4 2.51875 97 5.8125 97H27.125Z"
                                fill="#CCF1E9" />
                            <path
                                d="M177.75 37C180.638 37 183 34.57 183 31.6C183 28.63 180.638 26.2 177.75 26.2H177.487C177.487 25.39 177.75 24.58 177.75 23.5C177.75 17.56 173.025 12.7 167.25 12.7C165.15 12.7 163.312 13.24 161.475 14.32C160.688 11.89 158.325 10 155.438 10C151.762 10 148.875 12.97 148.875 16.75C148.875 18.37 149.4 19.72 150.45 21.07C149.925 20.8 149.4 20.8 148.875 20.8C144.412 20.8 141 24.31 141 28.9C141 33.49 144.412 37 148.875 37H177.75Z"
                                fill="#CCF1E9" />
                            <path
                                d="M78.2783 81.6754L57.0342 60.4263L64.1139 53.3466L78.2783 67.506L106.597 39.1821L113.682 46.2668L78.2783 81.6754Z"
                                fill="#00B4AF" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M32 60.0756C32 29.6588 56.6588 5 87.0756 5C117.492 5 142.151 29.6588 142.151 60.0756C142.151 90.4923 117.492 115.151 87.0756 115.151C56.6588 115.151 32 90.4923 32 60.0756ZM87.0756 105.137C81.158 105.137 75.2983 103.972 69.8311 101.707C64.364 99.4427 59.3964 96.1234 55.212 91.9391C51.0277 87.7547 47.7084 82.7871 45.4439 77.32C43.1793 71.8528 42.0137 65.9932 42.0137 60.0756C42.0137 54.158 43.1793 48.2983 45.4439 42.8311C47.7084 37.364 51.0277 32.3964 55.212 28.212C59.3964 24.0277 64.364 20.7084 69.8311 18.4439C75.2983 16.1793 81.158 15.0137 87.0756 15.0137C99.0267 15.0137 110.488 19.7613 118.939 28.212C127.39 36.6628 132.137 48.1244 132.137 60.0756C132.137 72.0267 127.39 83.4883 118.939 91.9391C110.488 100.39 99.0267 105.137 87.0756 105.137Z"
                                fill="#00B4AF" />
                            <path
                                d="M172.375 124C179.319 124 185 118.24 185 111.2C185 104.16 179.319 98.4 172.375 98.4H171.744C171.744 96.48 172.375 94.56 172.375 92C172.375 77.92 161.012 66.4 147.125 66.4C142.075 66.4 137.656 67.68 133.238 70.24C131.344 64.48 125.662 60 118.719 60C109.881 60 102.938 67.04 102.938 76C102.938 79.84 104.2 83.04 106.725 86.24C105.462 85.6 104.2 85.6 102.938 85.6C92.2062 85.6 84 93.92 84 104.8C84 115.68 92.2062 124 102.938 124H172.375Z"
                                fill="#CCF1E9" />
                        </svg>

                        <p class="text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                            {{ session('success') }}
                        </p>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="default-modal" type="button"
                            class="text-white w-full bg-prim hover:bg-gratwo font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Beranda</button>
                    </div>
                </div>
            </div>
        </div>
    @endif



</body>

</html>
