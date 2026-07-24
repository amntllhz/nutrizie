import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// ── Input helper ───────────────────────────────────────────
function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">{label}</label>
            {children}
            {error && <p className="text-[8px] text-red-500 mt-1">{error}</p>}
        </div>
    );
}

function Input({ error, ...props }) {
    return (
        <input
            {...props}
            className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors placeholder:text-gray-300
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
        />
    );
}

// ── Edit Profil Dialog ─────────────────────────────────────
function EditProfileDialog({ open, onClose }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    }

    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Nama wajib diisi.';
        if (!form.email.trim()) errs.email = 'Email wajib diisi.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Format email tidak valid.';
        if (!form.password) errs.password = 'Konfirmasi dengan password saat ini.';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        setProcessing(true);
        router.patch('/panel/profile/update', form, {
            onError: (errs) => { setErrors(errs); setProcessing(false); },
            onSuccess: () => {
                setProcessing(false);
                setForm(prev => ({ ...prev, password: '' }));
                toast.success('Profil diperbarui', {
                    description: 'Nama dan email berhasil diubah.',
                    icon: <svg className='size-4 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,1,1,224,128Z" opacity="0.2"></path><path d="M221.35,104.11a8,8,0,0,0-6.57,9.21A88.85,88.85,0,0,1,216,128a87.62,87.62,0,0,1-22.24,58.41,79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75A88,88,0,0,1,128,40a88.76,88.76,0,0,1,14.68,1.22,8,8,0,0,0,2.64-15.78,103.92,103.92,0,1,0,85.24,85.24A8,8,0,0,0,221.35,104.11ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM237.66,45.66l-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L200,60.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                });
                onClose();
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="!w-80 !max-w-80">
                <DialogHeader>
                    <DialogTitle className="text-sm">Edit Profil</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-3 pt-1" noValidate>
                    <Field label="Nama" error={errors.name}>
                        <Input
                            type="text"
                            value={form.name}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="Nama lengkap"
                            error={errors.name}
                            autoComplete="off"
                        />
                    </Field>
                    <Field label="Email" error={errors.email}>
                        <Input
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            placeholder="Email"
                            error={errors.email}
                            autoComplete="off"
                        />
                    </Field>
                    <Field label="Konfirmasi Password" error={errors.password}>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={e => handleChange('password', e.target.value)}
                                placeholder="Password saat ini"
                                error={errors.password}
                                autoComplete="current-password"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-gray-400 cursor-pointer">
                                {showPassword ? (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </Field>
                    <div className="flex gap-2 justify-end pt-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="text-xs px-4 cursor-pointer">Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}
                            className="text-xs px-6 cursor-pointer bg-prim hover:bg-gratwo disabled:opacity-60">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// ── Ganti Password Dialog ──────────────────────────────────
function ChangePasswordDialog({ open, onClose }) {
    const [form, setForm] = useState({ current_password: '', password: '', password_confirmation: '' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [show, setShow] = useState({ current: false, new: false, confirm: false });

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    }

    function validate() {
        const errs = {};
        if (!form.current_password) errs.current_password = 'Password saat ini wajib diisi.';
        if (!form.password) errs.password = 'Password baru wajib diisi.';
        else if (form.password.length < 8) errs.password = 'Password minimal 8 karakter.';
        if (form.password !== form.password_confirmation) errs.password_confirmation = 'Konfirmasi password tidak cocok.';
        if (form.password === form.current_password) {
            errs.password = 'Password baru tidak boleh sama dengan password saat ini.';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        setProcessing(true);
        router.patch('/panel/profile/update-password', form, {
            onError: (errs) => { setErrors(errs); setProcessing(false); },
            onSuccess: () => {
                setProcessing(false);
                setForm({ current_password: '', password: '', password_confirmation: '' });
                toast.success('Password diperbarui', {
                    description: 'Password berhasil diganti.',
                    icon: <svg className='size-4 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,88H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V96A8,8,0,0,0,208,88Zm-80,72a20,20,0,1,1,20-20A20,20,0,0,1,128,160Z" opacity="0.2"></path><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-96a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Z"></path></svg>
                });
                onClose();
            },
        });
    }

    function ToggleBtn({ field }) {
        return (
            <button type="button" onClick={() => setShow(prev => ({ ...prev, [field]: !prev[field] }))}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-gray-400 cursor-pointer">
                {show[field] ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                )}
            </button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="!w-80 !max-w-80">
                <DialogHeader>
                    <DialogTitle className="text-sm">Ganti Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-3 pt-1" noValidate>
                    <Field label="Password Saat Ini" error={errors.current_password}>
                        <div className="relative">
                            <Input type={show.current ? 'text' : 'password'}
                                value={form.current_password}
                                onChange={e => handleChange('current_password', e.target.value)}
                                placeholder="Password saat ini" error={errors.current_password} />
                            <ToggleBtn field="current" />
                        </div>
                    </Field>
                    <Field label="Password Baru" error={errors.password}>
                        <div className="relative">
                            <Input type={show.new ? 'text' : 'password'}
                                value={form.password}
                                onChange={e => handleChange('password', e.target.value)}
                                placeholder="Min. 8 karakter" error={errors.password} />
                            <ToggleBtn field="new" />
                        </div>
                    </Field>
                    <Field label="Konfirmasi Password Baru" error={errors.password_confirmation}>
                        <div className="relative">
                            <Input type={show.confirm ? 'text' : 'password'}
                                value={form.password_confirmation}
                                onChange={e => handleChange('password_confirmation', e.target.value)}
                                placeholder="Ulangi password baru" error={errors.password_confirmation} />
                            <ToggleBtn field="confirm" />
                        </div>
                    </Field>
                    <div className="flex gap-2 justify-end pt-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="text-xs px-4 cursor-pointer">Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}
                            className="text-xs px-6 cursor-pointer bg-prim hover:bg-gratwo disabled:opacity-60">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// ── Export hooks untuk dipakai di PanelLayout ──────────────
export { EditProfileDialog, ChangePasswordDialog };