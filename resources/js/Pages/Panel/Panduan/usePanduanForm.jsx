import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';


const ALLOWED_IMG = ['image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_PDF = ['application/pdf'];
const MAX_IMG_BYTE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_BYTE = 50 * 1024 * 1024; // 50MB

export function usePanduanForm({ mode = 'create', panduanId = null, initialData = {} } = {}) {
    const [form, setForm] = useState({
        judul: initialData.judul || '',
        deskripsi: initialData.deskripsi || '',
        penerbit: initialData.penerbit || '',
        penanggung_jawab: initialData.penanggung_jawab || '',
        tajuk_pengarang: initialData.tajuk_pengarang || '',
        tajuk_pengarah_tambahan: initialData.tajuk_pengarah_tambahan || '',
        tahun_terbit: initialData.tahun_terbit || '',
        tempat_terbit: initialData.tempat_terbit || '',
        halaman: initialData.halaman || '',
        bahasa: initialData.bahasa || 'Indonesia',
        isbn: initialData.isbn || '',
        edisi: initialData.edisi || '',
        cover: null,
        file_pdf: null,
    });

    const [errors, setErrors] = useState({});
    const [coverPreview, setCoverPreview] = useState(initialData.cover_url || null);
    const [pdfName, setPdfName] = useState(initialData.file_pdf_url ? 'File PDF tersimpan' : null);
    const [processing, setProcessing] = useState(false);

    const coverRef = useRef(null);
    const pdfRef = useRef(null);

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    }

    function handleCover(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!ALLOWED_IMG.includes(file.type)) {
            setErrors(prev => ({ ...prev, cover: 'Format harus JPEG, JPG, atau PNG.' }));
            return;
        }
        if (file.size > MAX_IMG_BYTE) {
            setErrors(prev => ({ ...prev, cover: 'Ukuran maksimal 5MB.' }));
            return;
        }
        setForm(prev => ({ ...prev, cover: file }));
        setCoverPreview(URL.createObjectURL(file));
        setErrors(prev => ({ ...prev, cover: null }));
    }

    function handlePdf(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!ALLOWED_PDF.includes(file.type)) {
            setErrors(prev => ({ ...prev, file_pdf: 'File harus berformat PDF.' }));
            return;
        }
        if (file.size > MAX_PDF_BYTE) {
            setErrors(prev => ({ ...prev, file_pdf: 'Ukuran maksimal 50MB.' }));
            return;
        }
        setForm(prev => ({ ...prev, file_pdf: file }));
        setPdfName(file.name);
        setErrors(prev => ({ ...prev, file_pdf: null }));
    }

    function validate() {
        const errs = {};

        if (!form.judul.trim()) errs.judul = 'Judul wajib diisi';
        if (!form.deskripsi.trim()) errs.deskripsi = 'Deskripsi wajib di isi';
        if (!form.penerbit.trim()) errs.penerbit = 'Penerbit wajib di isi';
        if (!form.penanggung_jawab.trim()) errs.penanggung_jawab = 'Penanggung jawab wajib di isi';
        if (!form.tajuk_pengarang.trim()) errs.tajuk_pengarang = 'Tajuk pengarang wajib di isi';
        if (!form.tajuk_pengarah_tambahan.trim()) errs.tajuk_pengarah_tambahan = 'Tajuk pengarah tambahan wajib di isi';
        if (!form.tahun_terbit.trim()) errs.tahun_terbit = 'Tahun terbit wajib di isi';
        if (!form.tempat_terbit.trim()) errs.tempat_terbit = 'Tempat terbit wajib di isi';
        if (!form.halaman) errs.halaman = 'Halaman wajib di isi';
        if (!form.bahasa.trim()) errs.bahasa = 'Bahasa wajib di isi';
        if (!form.isbn.trim()) errs.isbn = 'ISBN wajib di isi';
        if (!form.edisi.trim()) errs.edisi = 'Edisi wajib di isi';

        // Cover wajib hanya saat create
        if (mode === 'create' && !form.cover) {
            errs.cover = 'Cover wajib diunggah';
        }

        // PDF wajib hanya saat create
        if (mode === 'create' && !form.file_pdf) {
            errs.file_pdf = 'File PDF wajib diunggah';
        }

        if (form.tahun_terbit) {
            const tahun = parseInt(form.tahun_terbit);
            if (tahun < 1900 || tahun > new Date().getFullYear()) {
                errs.tahun_terbit = 'Tahun terbit tidak valid';
            }
        }

        if (form.halaman && parseInt(form.halaman) < 1) {
            errs.halaman = 'Jumlah halaman tidak valid';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) {
            toast.error('Form tidak lengkap', { description: 'Periksa kembali isian.' });
            return;
        }

        const data = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (val !== null && val !== '') data.append(key, val);
        });

        const url = mode === 'create'
            ? '/panel/panduan'
            : `/panel/panduan/${panduanId}/update`;

        setProcessing(true);
        router.post(url, data, {
            forceFormData: true,
            onError: (errs) => {
                setErrors(errs);
                setProcessing(false);
                toast.error('Gagal menyimpan', { description: 'Periksa kembali form.' });
            },
            onSuccess: () => {
                setProcessing(false);
                toast.success(
                    mode === 'create' ? 'Panduan berhasil ditambahkan' : 'Panduan berhasil diperbarui',
                    { description: mode === 'create' ? 'Panduan baru telah disimpan.' : 'Perubahan telah disimpan.' }
                );
            },
        });
    }

    return {
        form,
        errors,
        coverPreview,
        pdfName,
        processing,
        coverRef,
        pdfRef,
        handleChange,
        handleCover,
        handlePdf,
        handleSubmit,
    };
}