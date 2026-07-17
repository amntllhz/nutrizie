import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTE = MAX_SIZE_MB * 1024 * 1024;

// Tiptap output "<p></p>" atau "<p> </p>" = konten kosong
function isEmptyHtml(html) {
    if (!html) return true;
    const stripped = html.replace(/<[^>]*>/g, '').trim();
    return stripped.length === 0;
}

export function useArticleForm({ mode = 'create', articleId = null, initialData = {} } = {}) {
    const [form, setForm] = useState({
        judul: initialData.judul || '',
        deskripsi: initialData.deskripsi || '',
        konten: initialData.konten || '',
        gambar: null,
    });
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(initialData.gambar || null);
    const [processing, setProcessing] = useState(false);
    const fileRef = useRef(null);

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    }

    function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validasi langsung saat pilih file
        if (!ALLOWED_TYPES.includes(file.type)) {
            setErrors(prev => ({ ...prev, gambar: 'Format file harus JPEG, JPG, atau PNG' }));
            return;
        }
        if (file.size > MAX_SIZE_BYTE) {
            setErrors(prev => ({ ...prev, gambar: `Ukuran file maksimal ${MAX_SIZE_MB}MB` }));
            return;
        }

        setForm(prev => ({ ...prev, gambar: file }));
        setPreview(URL.createObjectURL(file));
        setErrors(prev => ({ ...prev, gambar: null }));
    }

    function validate() {
        const errs = {};

        if (!form.judul.trim()) {
            errs.judul = 'Judul wajib diisi';
        } else if (form.judul.trim().length > 255) {
            errs.judul = 'Judul maksimal 255 karakter';
        }

        if (!form.deskripsi.trim()) {
            errs.deskripsi = 'Deskripsi singkat wajib diisi';
        }

        if (isEmptyHtml(form.konten)) {
            errs.konten = 'Konten artikel wajib diisi';
        }

        if (mode === 'create' && !form.gambar) {
            errs.gambar = 'Gambar utama wajib diunggah';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) {
            toast.error('Form tidak lengkap', {
                description: 'Lengkapi semua isian di atas',
                icon: <svg className='size-4 text-red-500' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2"></path><path d="M53.92,34.62A8,8,0,1,0,42.08,45.38l48.2,53L36.68,152A15.89,15.89,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l50.4-50.39,47.69,52.46a8,8,0,1,0,11.84-10.76ZM92.69,208H48V163.31l53.06-53,42.56,46.81ZM227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L118.33,70.36a8,8,0,0,0,11.32,11.31L136,75.31,180.69,120l-9,9A8,8,0,0,0,183,140.34L227.32,96A16,16,0,0,0,227.32,73.37ZM192,108.69,147.32,64l24-24L216,84.69Z"></path></svg>
            });
            return;
        }

        const data = new FormData();
        data.append('judul', form.judul.trim());
        data.append('deskripsi', form.deskripsi.trim());
        data.append('konten', form.konten);
        if (form.gambar) data.append('gambar', form.gambar);

        const url = mode === 'create'
            ? '/panel/artikel'
            : `/panel/artikel/${articleId}/update`;

        setProcessing(true);

        router.post(url, data, {
            forceFormData: true,
            onError: (errs) => {
                setErrors(errs);
                setProcessing(false);
                toast.error('Gagal menyimpan', {
                    description: 'Periksa kembali form',
                    icon: <svg className='size-4 text-red-500' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2"></path><path d="M53.92,34.62A8,8,0,1,0,42.08,45.38l48.2,53L36.68,152A15.89,15.89,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l50.4-50.39,47.69,52.46a8,8,0,1,0,11.84-10.76ZM92.69,208H48V163.31l53.06-53,42.56,46.81ZM227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L118.33,70.36a8,8,0,0,0,11.32,11.31L136,75.31,180.69,120l-9,9A8,8,0,0,0,183,140.34L227.32,96A16,16,0,0,0,227.32,73.37ZM192,108.69,147.32,64l24-24L216,84.69Z"></path></svg>
                });
            },
            onSuccess: () => {
                setProcessing(false);
                toast.success(
                    mode === 'create' ? 'Artikel berhasil dibuat' : 'Artikel berhasil diperbarui',
                    {
                        description: mode === 'create' ? 'Artikel baru telah ditambahkan' : 'Perubahan telah disimpan',
                        icon: <svg className='size-4 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48V208a8,8,0,0,1-8,8H64L40,192V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"></path><path d="M224,48V208a16,16,0,0,1-16,16H136a8,8,0,0,1,0-16h72V48H48v96a8,8,0,0,1-16,0V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM125.66,154.34a8,8,0,0,0-11.32,0L64,204.69,45.66,186.34a8,8,0,0,0-11.32,11.32l24,24a8,8,0,0,0,11.32,0l56-56A8,8,0,0,0,125.66,154.34Z"></path></svg>
                    }
                );
            },
        });
    }

    return {
        form,
        errors,
        preview,
        processing,
        fileRef,
        handleChange,
        handleFile,
        handleSubmit,
    };
}