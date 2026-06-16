<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - Beranda</title>
    <link rel="icon" href="{{ asset('img/nutrizie-icon.svg') }}">

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
                        <img src="{{ asset('img/succes-message.png') }}" alt="" class="w-38">

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
                            class="text-white items-end w-24 bg-prim hover:bg-gratwo font-medium rounded-lg text-xs px-2.5 py-1.5 text-center">Beranda</button>
                    </div>
                </div>
            </div>
        </div>
    @endif



</body>

</html>
