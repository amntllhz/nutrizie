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
                toast.success('Artikel berhasil dibuat', {
                    description: 'Berhasil menambahkan artikel baru',
                    icon: <svg className='size-4 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48V208a8,8,0,0,1-8,8H64L40,192V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"></path><path d="M224,48V208a16,16,0,0,1-16,16H136a8,8,0,0,1,0-16h72V48H48v96a8,8,0,0,1-16,0V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM125.66,154.34a8,8,0,0,0-11.32,0L64,204.69,45.66,186.34a8,8,0,0,0-11.32,11.32l24,24a8,8,0,0,0,11.32,0l56-56A8,8,0,0,0,125.66,154.34Z"></path></svg>
                });
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
                                    <svg className='w-10 h-10 mb-2 text-prim/80' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"></path><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path></svg>
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