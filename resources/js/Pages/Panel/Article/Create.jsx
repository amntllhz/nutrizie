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
                                        className="w-full h-34 object-cover rounded-lg" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                                        <p className="text-white text-xs font-medium">Ganti gambar</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-gray-300">
                                    <svg className='w-8 h-8 mb-2' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 5L19 2M19 2L22 5M19 2V8M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
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