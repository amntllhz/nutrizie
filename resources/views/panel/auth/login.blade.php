@extends('layout.layout')

@section('title', 'Login')

@section('content')

    <body class="font-in bg-gray-50 flex items-center justify-center min-h-screen">

        <div class="flex flex-col space-y-4 w-full max-w-sm p-8 bg-white rounded-2xl ring-1 ring-inset ring-prim/20">

            <img src="{{ asset('img/nutrizie-icon.svg') }}" alt="" class="w-12 mx-auto">

            <div class="flex flex-col space-y-1">
                <h1 class="text-lg text-center font-bold text-gray-800">Selamat Datang</h1>
                <p class="text-gray-400 text-xs text-center">Masukkan kredensial untuk masuk</p>
            </div>

            @if ($errors->has('login'))
                <x-toast type="danger" title="Gagal Login">
                    {{ $errors->first('login') }}
                </x-toast>
            @endif

            <form method="POST" action="{{ route('auth.login.post') }}" class="space-y-3" x-data="loginForm"
                x-on:submit.prevent="validateAndSubmit" novalidate>
                @csrf

                <div>
                    <label for="email" class="block mb-2 text-xs font-medium text-gray-400">Email</label>
                    <div class="relative flex items-center">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
                            <svg class="w-4 h-4" width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <input type="email" name="email" id="email" value="{{ old('email') }}"
                            class="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-lg transition-colors placeholder:text-xs placeholder-gray-300 focus:ring-prim focus:border-prim focus:outline-none"
                            placeholder="Ex. Nutrizie@gmail.com" autocomplete="off">
                    </div>
                </div>

                <div x-data="{ showPassword: false }">
                    <label for="password" class="block mb-1.5 text-xs font-medium text-gray-400">Kata Sandi</label>
                    <div class="relative flex items-center">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
                            <svg class="w-4 h-4" width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                        <input :type="showPassword ? 'text' : 'password'" name="password" id="password"
                            class="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-lg transition-colors placeholder:text-xs placeholder-gray-300 focus:ring-prim focus:border-prim focus:outline-none"
                            placeholder="Masukkan Password" autocomplete="off">

                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-300 hover:text-gray-400 focus:outline-none cursor-pointer">
                            <svg x-show="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor"
                                stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <svg x-show="showPassword" x-cloak class="w-4 h-4" fill="none" stroke="currentColor"
                                stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </button>
                    </div>
                </div>

                <button type="submit" :disabled="isLoading"
                    class="w-full py-2 mt-7 text-sm font-semibold text-white bg-prim rounded-lg hover:bg-gratwo transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed">

                    <svg x-show="isLoading" x-cloak class="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>

                    <span x-text="isLoading ? 'Memproses...' : 'Masuk'">Masuk</span>
                </button>

                <p class="text-center text-[11px] text-gray-400">
                    Anda bukan admin? <a href="{{ route('beranda') }}" class="text-prim hover:underline font-medium">
                        Beranda</a>
                </p>
            </form>
        </div>

    </body>

    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('loginForm', () => ({
                isLoading: false,

                validateAndSubmit(e) {
                    this.isLoading = true;
                    let valid = true;
                    let firstErrorElement = null;

                    document.querySelectorAll('.form-error-msg').forEach(el => el.remove());

                    // === 1. Validate Email
                    const emailInput = document.getElementById('email');
                    if (emailInput) {
                        const value = emailInput.value.trim();
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const wrapper = emailInput.closest('.relative');

                        if (!value) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = emailInput;
                            emailInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className = 'text-red-500 font-medium text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Email wajib diisi';
                            wrapper.parentElement.appendChild(msg);
                        } else if (!emailRegex.test(value)) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = emailInput;
                            emailInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className = 'text-red-500 font-medium text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Format email tidak valid';
                            wrapper.parentElement.appendChild(msg);
                        } else {
                            emailInput.classList.remove('ring-1', 'ring-red-400');
                        }
                    }

                    // === 2. Validate Password
                    const passwordInput = document.getElementById('password');
                    if (passwordInput) {
                        const value = passwordInput.value;
                        const wrapper = passwordInput.closest('.relative');

                        if (!value) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = passwordInput;
                            passwordInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className = 'text-red-500 font-medium text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Password wajib diisi';
                            wrapper.parentElement.appendChild(msg);
                        } else {
                            passwordInput.classList.remove('ring-1', 'ring-red-400');
                        }
                    }

                    // === 3. Jika tidak valid, batalkan submit
                    if (!valid) {
                        this.isLoading = false;
                        e.preventDefault();

                        if (firstErrorElement) {
                            firstErrorElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                            firstErrorElement.focus();
                        }
                        return;
                    }

                    // === 4. Submit form jika valid
                    e.target.submit();
                }
            }));
        });
    </script>

@endsection
