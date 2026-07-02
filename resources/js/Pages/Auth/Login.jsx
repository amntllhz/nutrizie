import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Login() {
    const { flash = {} } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);

    // State khusus untuk menampung error dari sisi Frontend (Client-side)
    const [clientErrors, setClientErrors] = useState({ email: '', password: '' });

    // Ref untuk handle fokus otomatis ke input pertama yang error
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { data, setData, post, processing, errors: backendErrors, clearErrors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();

        // Reset status error frontend setiap kali form disubmit ulang
        let localErrors = { email: '', password: '' };
        let isValid = true;

        // === 1. Validasi Sisi Frontend (Client-side) ===

        // Validasi Email
        const emailValue = data.email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValue) {
            localErrors.email = 'Email wajib diisi';
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            localErrors.email = 'Format email tidak valid';
            isValid = false;
        }

        // Validasi Password
        if (!data.password) {
            localErrors.password = 'Password wajib diisi';
            isValid = false;
        }

        // Simpan hasil pengecekan ke state
        setClientErrors(localErrors);

        // Jika validasi frontend gagal, hentikan proses dan arahkan fokus
        if (!isValid) {
            if (localErrors.email) {
                emailRef.current?.focus();
            } else if (localErrors.password) {
                passwordRef.current?.focus();
            }
            return; // Gagalkan submit (Mencegah request ke backend)
        }

        // === 2. Kirim ke Backend jika validasi frontend lolos ===
        clearErrors(); // Bersihkan error backend sebelumnya
        post('/auth/login', {
            onFinish: () => setData('password', ''),
        });
    }

    // Gabungkan error dari frontend dan backend untuk kemudahan rendering visual
    const emailError = clientErrors.email || backendErrors.email;
    const passwordError = clientErrors.password || backendErrors.password;

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="flex flex-col space-y-4 w-full max-w-sm p-8 bg-white rounded-2xl ring-1 ring-inset ring-prim/20">

                    <img src="/img/nutrizie-icon.svg" alt="Logo" className="w-12 mx-auto" />

                    <div className="flex flex-col space-y-1">
                        <h1 className="text-lg text-center font-bold text-gray-800">Selamat Datang</h1>
                        <p className="text-gray-400 text-xs text-center">Masukkan kredensial untuk mengakses panel</p>
                    </div>

                    {flash.success && (
                        <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 text-center">
                            {flash.success}
                        </div>
                    )}

                    {/* Menampilkan error kecocokan akun dari backend */}
                    {backendErrors.login && (
                        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-center font-medium">
                            {backendErrors.login}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3" noValidate>

                        {/* Input Email */}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-400">Email</label>
                            <div className="relative flex items-center">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={e => {
                                        setData('email', e.target.value);
                                        if (clientErrors.email) setClientErrors(prev => ({ ...prev, email: '' }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-2.5 text-xs border rounded-lg transition-colors placeholder:text-xs placeholder-gray-300 focus:outline-none ${emailError
                                        ? 'border-red-400 ring-1 ring-red-400'
                                        : 'border-gray-200 focus:ring-prim focus:border-prim'
                                        }`}
                                    placeholder="Ex. Nutrizie@gmail.com"
                                    autoComplete="off"
                                />
                            </div>
                            {emailError && <p className="text-red-500 font-medium text-[9px] mt-1">{emailError}</p>}
                        </div>

                        {/* Input Password */}
                        <div>
                            <label htmlFor="password" className="block mb-1.5 text-xs font-medium text-gray-400">Kata Sandi</label>
                            <div className="relative flex items-center">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <input
                                    ref={passwordRef}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    value={data.password}
                                    onChange={e => {
                                        setData('password', e.target.value);
                                        if (clientErrors.password) setClientErrors(prev => ({ ...prev, password: '' }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-2.5 text-xs border rounded-lg transition-colors placeholder:text-xs placeholder-gray-300 focus:outline-none ${passwordError
                                        ? 'border-red-400 ring-1 ring-red-400'
                                        : 'border-gray-200 focus:ring-prim focus:border-prim'
                                        }`}
                                    placeholder="Masukkan Password"
                                    autoComplete="off"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-300 hover:text-gray-400 focus:outline-none cursor-pointer"
                                >
                                    {!showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {passwordError && <p className="text-red-500 font-medium text-[9px] mt-1">{passwordError}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 mt-7 text-sm font-semibold text-white bg-prim rounded-lg hover:bg-gratwo transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            {processing && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            <span>{processing ? 'Memproses...' : 'Masuk'}</span>
                        </button>

                        <p className="text-center text-[11px] text-gray-400 pt-1">
                            Anda bukan admin?{' '}
                            <a href="/" className="text-prim hover:underline font-medium">
                                Beranda
                            </a>
                        </p>

                    </form>
                </div>
            </div>
        </>
    );
}

Login.layout = null;