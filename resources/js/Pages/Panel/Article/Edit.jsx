import { Head, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import PanelLayout from '@/Layout/PanelLayout';
import RichEditor from '@/Components/ui/RichEditor';
import { Button } from '@/components/ui/button';

export default function ArticleEdit({ article }) {
    const [form, setForm] = useState({
        judul: article.judul || '',
        deskripsi: article.deskripsi || '',
        konten: article.konten || '',
        gambar: null,
    });
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(article.gambar || null);
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

        router.post(`/panel/artikel/${article.id}/update`, data, {
            forceFormData: true,
            onError: (errs) => {
                setErrors(errs);
                setProcessing(false);
                toast.error('Gagal menyimpan', { description: 'Periksa kembali form.' });
            },
            onSuccess: () => {
                setProcessing(false);
                toast.success('Artikel berhasil diperbarui', { description: 'Perubahan berhasil disimpan' });
            },
        });
    }

    return (
        <>
            <Head title="Edit Artikel" />
            <div className="">
                <div className="mb-6">
                    <h1 className="text-lg font-bold text-gray-900">Edit Artikel</h1>
                    <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">{article.judul}</p>
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
                                    className={`w-full px-3.5 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors
                                ${errors.judul ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
                                {errors.judul && <p className="text-[11px] text-red-500 mt-1">{errors.judul}</p>}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">Deskripsi Singkat</label>
                                <textarea value={form.deskripsi}
                                    onChange={e => handleChange('deskripsi', e.target.value)}
                                    rows={3} placeholder="Ringkasan singkat artikel..."
                                    className={`w-full px-3.5 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors resize-none
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
                                            className="w-full h-34 object-cover rounded-lg" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs font-medium">Ganti gambar</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[10px]">Klik untuk upload gambar</p>
                                        <p className="text-[10px] mt-0.5">JPEG, JPG, PNG — maks 5MB</p>
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
                            <RichEditor value={form.konten} onChange={val => handleChange('konten', val)} />
                        </div>
                        {errors.konten && <p className="text-[11px] text-red-500 mt-1">{errors.konten}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end items-center gap-3 pt-2">
                        <Button type="button" variant="outline"
                            onClick={() => router.visit('/panel/artikel')}
                            className="text-xs px-6 rounded-md cursor-pointer">
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}
                            className="text-xs px-6 rounded-md cursor-pointer bg-prim hover:bg-gratwo disabled:opacity-60">
                            {processing ? 'Menyimpan...' : 'Perbarui Artikel'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

ArticleEdit.layout = (page) => <PanelLayout>{page}</PanelLayout>;