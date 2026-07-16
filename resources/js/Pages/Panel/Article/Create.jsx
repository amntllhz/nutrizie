import { Head, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import PanelLayout from '@/Layout/PanelLayout';
import RichEditor from '@/Components/ui/RichEditor';
import { Button } from '@/components/ui/button';

export default function ArticleCreate() {
    const [form, setForm] = useState({ judul: '', deskripsi: '', konten: '', gambar: null });
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);
    const [processing, setProcessing] = useState(false);
    const fileRef = useRef(null);

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    }

    function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        setForm(prev => ({ ...prev, gambar: file }));
        setPreview(URL.createObjectURL(file));
        if (errors.gambar) setErrors(prev => ({ ...prev, gambar: null }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('judul', form.judul);
        data.append('deskripsi', form.deskripsi);
        data.append('konten', form.konten);
        if (form.gambar) data.append('gambar', form.gambar);

        setProcessing(true);

        router.post('/panel/artikel', data, {
            forceFormData: true,
            onError: (errs) => {
                setErrors(errs);
                setProcessing(false);
                toast.error('Gagal menyimpan', { description: 'Periksa kembali form.' });
            },
            onSuccess: () => {
                setProcessing(false);
                toast.success('Artikel berhasil dibuat', { description: 'Berhasil menambahkan artikel baru' });
            },
        });
    }

    return (
        <>
            <Head title="Buat Artikel" />
            <div className="mb-6">
                <h1 className="text-lg font-bold text-gray-900">Buat Artikel</h1>
                <p className="text-xs text-gray-500 mt-0.5">Tulis dan tambahkan artikel baru</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div className='grid grid-cols-2 gap-4 w-full'>

                    <div className='space-y-4 w-full'>
                        {/* Judul */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Judul</label>
                            <input type="text" value={form.judul}
                                onChange={e => handleChange('judul', e.target.value)}
                                placeholder="Judul artikel..."
                                className={`w-full px-3.5 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors placeholder:text-gray-300
                                ${errors.judul ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
                            {errors.judul && <p className="text-[11px] text-red-500 mt-1">{errors.judul}</p>}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Deskripsi Singkat</label>
                            <textarea value={form.deskripsi}
                                onChange={e => handleChange('deskripsi', e.target.value)}
                                rows={3} placeholder="Ringkasan singkat artikel..."
                                className={`w-full px-3.5 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors resize-none placeholder:text-gray-300
                                ${errors.deskripsi ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
                            {errors.deskripsi && <p className="text-[11px] text-red-500 mt-1">{errors.deskripsi}</p>}
                        </div>
                    </div>

                    {/* Gambar */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Gambar Utama</label>
                        <div
                            onClick={() => fileRef.current?.click()}
                            className={`relative border-[1.5px] border-dashed rounded-lg cursor-pointer transition-colors hover:border-prim
                                ${errors.gambar ? 'border-red-300' : 'border-gray-200'}`}
                        >
                            {preview ? (
                                <div className="relative">
                                    <img src={preview} alt="preview"
                                        className="w-full h-[134px] object-cover rounded-lg" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                                        <p className="text-white text-xs font-medium">Ganti gambar</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-[27px] text-gray-300">
                                    <svg className='w-10 h-10 mb-2 text-prim' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path fill="currentColor" d="M 20 6 L 12 6 L 10.59 4.59 C 10.21 4.21 9.7 4 9.17 4 L 4 4 C 2.9 4 2.01 4.9 2.01 6 L 2 18 C 2 19.1 2.9 20 4 20 L 20 20 C 21.1 20 22 19.1 22 18 L 22 8 C 22 6.9 21.1 6 20 6 Z" opacity=".3" class="duo-icons-secondary-layer" /><path fill="currentColor" d="M 13 13 L 13 16 C 13 16.55 12.55 17 12 17 C 11.45 17 11 16.55 11 16 L 11 13 L 9.21 13 C 8.760000000000002 13 8.540000000000001 12.46 8.860000000000001 12.15 L 11.66 9.36 C 11.86 9.16 12.17 9.17 12.370000000000001 9.36 L 15.16 12.149999999999999 C 15.46 12.459999999999999 15.24 12.999999999999998 14.8 12.999999999999998 L 13 12.999999999999998 L 13 13 Z" class="duo-icons-primary-layer" /></svg>
                                    <p className="text-[10px] text-gray-300">Klik untuk upload gambar</p>
                                    <p className="text-[10px] text-gray-300 mt-0.5">JPEG, JPG, PNG — maks 5MB</p>
                                </div>
                            )}
                        </div>
                        <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png"
                            onChange={handleFile} className="hidden" />
                        {errors.gambar && <p className="text-[11px] text-red-500 mt-1">{errors.gambar}</p>}
                    </div>
                </div>

                {/* Konten */}
                <div className=''>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Konten Artikel</label>
                    <div className='w-full overflow-hidden panel-editor border border-gray-200 rounded-lg'>
                        <RichEditor value={form.konten} placeholder="Tuliskan Artikel..." onChange={val => handleChange('konten', val)} />
                    </div>
                    {errors.konten && <p className="text-[11px] text-red-500 mt-1">{errors.konten}</p>}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button type="button" variant="outline"
                        onClick={() => router.visit('/panel/artikel')}
                        className="text-xs px-6 rounded-md cursor-pointer">
                        Batal
                    </Button>
                    <Button type="submit" disabled={processing}
                        className="text-xs px-6 rounded-md cursor-pointer bg-prim hover:bg-gratwo disabled:opacity-60">
                        {processing ? 'Menyimpan...' : 'Simpan Artikel'}
                    </Button>
                </div>
            </form>
        </>
    );
}

ArticleCreate.layout = (page) => <PanelLayout>{page}</PanelLayout>;