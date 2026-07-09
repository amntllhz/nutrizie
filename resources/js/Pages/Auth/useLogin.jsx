import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export function useLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [clientErrors, setClientErrors] = useState({ email: '', password: '' });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { data, setData, post, processing, errors: backendErrors, clearErrors } = useForm({
        email: '',
        password: '',
    });

    function validate() {
        const errs = { email: '', password: '' };
        let isValid = true;
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.email.trim()) {
            errs.email = 'Email wajib diisi';
            isValid = false;
        } else if (!emailRx.test(data.email.trim())) {
            errs.email = 'Format email tidak valid';
            isValid = false;
        }

        if (!data.password) {
            errs.password = 'Password wajib diisi';
            isValid = false;
        }

        setClientErrors(errs);

        if (!isValid) {
            if (errs.email) emailRef.current?.focus();
            else if (errs.password) passwordRef.current?.focus();
        }

        return isValid;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        clearErrors();
        post('/auth/login', {
            onError: () => {
                // Trigger langsung dari Inertia response — tidak bergantung flash/useEffect
                toast.error('Login Gagal', {
                    description: 'Email atau password yang Anda masukkan salah',
                });
                setData('password', '');
                passwordRef.current?.focus();
            },
            onSuccess: () => {
                toast.success('Login Berhasil', {
                    description: 'Selamat datang kembali, Nutrimin!',
                });
            },
        });
    }

    function clearClientError(field) {
        setClientErrors(prev => ({ ...prev, [field]: '' }));
    }

    const emailError = clientErrors.email || backendErrors.email;
    const passwordError = clientErrors.password || backendErrors.password;

    return {
        data,
        setData,
        processing,
        showPassword,
        setShowPassword,
        emailRef,
        passwordRef,
        emailError,
        passwordError,
        backendErrors,
        handleSubmit,
        clearClientError,
    };
}