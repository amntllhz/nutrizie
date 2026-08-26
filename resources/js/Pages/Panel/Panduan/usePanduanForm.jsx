import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';


const ALLOWED_IMG = ['image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_PDF = ['application/pdf'];
const MAX_IMG_BYTE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_BYTE = 50 * 1024 * 1024; // 50MB

export const DESKRIPSI_MIN = 300;
export const DESKRIPSI_MAX = 500;

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
    const [previewName, setPreviewName] = useState(null);
    const [previewSize, setPreviewSize] = useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);
    const [pdfSize, setPdfSize] = useState(null);
    const [isRenderingPdf, setIsRenderingPdf] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(false);

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

        // Pemotongan nama file jika melebihi 30 karakter tanpa merusak ekstensi
        const fullFileName = file.name;
        const lastDotIndex = fullFileName.lastIndexOf('.');

        if (lastDotIndex !== -1) {
            const baseName = fullFileName.slice(0, lastDotIndex);
            const extension = fullFileName.slice(lastDotIndex);

            const formattedName = baseName.length > 30
                ? `${baseName.slice(0, 30)}...${extension}`
                : fullFileName;

            setPreviewName(formattedName);
        } else {
            const formattedName = fullFileName.length > 30
                ? `${fullFileName.slice(0, 30)}...`
                : fullFileName;

            setPreviewName(formattedName);
        }

        setIsImgLoading(true);

        setCoverPreview(URL.createObjectURL(file));
        setPreviewSize((file.size / 1024 / 1024).toFixed(2) + ' MB');
        setErrors(prev => ({ ...prev, cover: null }));
    }

    async function handlePdf(e) {
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

        // Pemotongan nama file tanpa menghilangkan ekstensi .pdf
        const fullFileName = file.name;
        const lastDotIndex = fullFileName.lastIndexOf('.');

        if (lastDotIndex !== -1) {
            const baseName = fullFileName.slice(0, lastDotIndex);
            const extension = fullFileName.slice(lastDotIndex);

            const formattedName = baseName.length > 30
                ? `${baseName.slice(0, 30)}...${extension}`
                : fullFileName;

            setPdfName(formattedName);
        } else {
            const formattedName = fullFileName.length > 30
                ? `${fullFileName.slice(0, 30)}...`
                : fullFileName;

            setPdfName(formattedName);
        }

        setPdfSize((file.size / 1024 / 1024).toFixed(2) + ' MB');
        setErrors(prev => ({ ...prev, file_pdf: null }));

        setIsRenderingPdf(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.5 });

            const targetW = viewport.width;
            const targetH = Math.round(viewport.width * (158 / 470))

            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;
            await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
            setPdfPreview(canvas.toDataURL('image/png'));
        } catch {
            setPdfPreview(null);
        } finally {
            setIsRenderingPdf(false);
        }
    }

    function validate() {
        const errs = {};

        if (!form.judul.trim()) errs.judul = 'Judul wajib diisi';
        const deskripsiLen = form.deskripsi.trim().length;
        if (deskripsiLen === 0) errs.deskripsi = 'Deskripsi wajib diisi';
        else if (deskripsiLen < DESKRIPSI_MIN) errs.deskripsi = `Deskripsi minimal ${DESKRIPSI_MIN} karakter`;
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
        previewName,
        previewSize,
        pdfPreview,
        pdfSize,
        isRenderingPdf,
        isImgLoading,
        setIsImgLoading,
        handleChange,
        handleCover,
        handlePdf,
        handleSubmit,
    };
}