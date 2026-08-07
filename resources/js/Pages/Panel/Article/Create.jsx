import { Head, router } from '@inertiajs/react';
import PanelLayout from '@/Layout/PanelLayout';
import RichEditor from '@/Components/ui/RichEditor';
import { Button } from '@/components/ui/button';
import { useArticleForm, DESKRIPSI_MIN, DESKRIPSI_MAX } from './useArticleForm';

function Field({ label, error, required, children }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            {children}
            {error && <p className="text-[9px] text-red-500 mt-1.5">{error}</p>}
        </div>
    );
}

function TextInput({ error, ...props }) {
    return (
        <input {...props}
            className={`w-full px-3.5 py-2 text-xs text-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors placeholder:text-gray-300
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
    );
}

export default function ArticleCreate() {
    const {
        form,
        errors,
        preview,
        processing,
        fileRef,
        handleChange,
        handleFile,
        handleSubmit,
    } = useArticleForm({ mode: 'create' });

    return (
        <>
            <Head title="Buat Artikel" />
            <div className="mb-8">
                <h1 className="text-lg font-bold text-gray-900">Buat Artikel</h1>
                <p className="text-xs text-gray-500 mt-0.5">Tulis dan tambahkan artikel baru</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                <div className='grid grid-cols-2 gap-4 w-full'>

                    <div className='space-y-4 w-full'>
                        {/* Judul */}
                        <div>
                            <Field label="Judul" required error={errors.judul}>
                                <TextInput value={form.judul} onChange={e => handleChange('judul', e.target.value)}
                                    placeholder="Judul buku panduan..." error={errors.judul}>
                                </TextInput>
                            </Field>
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <Field label="Deskripsi" required>
                                <div className="relative">
                                    <textarea
                                        value={form.deskripsi}
                                        onChange={e => handleChange('deskripsi', e.target.value.slice(0, DESKRIPSI_MAX))}
                                        maxLength={DESKRIPSI_MAX}
                                        rows={3}
                                        placeholder="Deskripsi Artikel..."
                                        className={`w-full px-3.5 h-31 py-2 text-xs text-gray-600 border text-justify rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors resize-none placeholder:text-gray-300 ${errors.deskripsi ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                    />
                                    <div className="flex items-center justify-between mt-0.5 px-0.5">
                                        <div className="text-[10px]">
                                            {errors.deskripsi ? (
                                                <span className="text-[9px] text-red-500 mt-1">{errors.deskripsi}</span>
                                            ) : (form.deskripsi?.length ?? 0) > 0 && (form.deskripsi?.length ?? 0) < DESKRIPSI_MIN ? (
                                                <span className="text-[9px] text-amber-500">Minimal {DESKRIPSI_MIN} karakter</span>
                                            ) : null}
                                        </div>

                                        <span
                                            className={`text-[10px] tabular-nums transition-colors ${(form.deskripsi?.length ?? 0) >= DESKRIPSI_MAX
                                                ? 'text-red-500 font-semibold'
                                                : (form.deskripsi?.length ?? 0) < DESKRIPSI_MIN && (form.deskripsi?.length ?? 0) > 0
                                                    ? 'text-amber-500'
                                                    : 'text-gray-400'
                                                }`}
                                        >
                                            {form.deskripsi?.length ?? 0}/{DESKRIPSI_MAX}
                                        </span>
                                    </div>
                                </div>
                            </Field>
                        </div>
                    </div>

                    {/* Gambar */}
                    <div>
                        <Field label="Gambar" required error={errors.gambar}>
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
                                    <div className="flex flex-col items-center justify-center h-48 text-gray-300">
                                        <svg className='w-10 h-10 mb-2 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,40H80a8,8,0,0,0-8,8V176a8,8,0,0,0,8,8H96.69l77.65-77.66a8,8,0,0,1,11.32,0L216,136.69V48A8,8,0,0,0,208,40Zm-88,64a16,16,0,1,1,16-16A16,16,0,0,1,120,104Z" opacity="0.2"></path><path d="M208,32H80A16,16,0,0,0,64,48V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V192h16a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,48H208v69.38l-16.7-16.7a16,16,0,0,0-22.62,0L93.37,176H80Zm96,160H48V80H64v96a16,16,0,0,0,16,16h96Zm32-32H116l64-64,28,28v36Zm-88-64A24,24,0,1,0,96,88,24,24,0,0,0,120,112Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,120,80Z"></path></svg>
                                        <p className="text-xs text-gray-800 font-semibold">Klik untuk upload gambar</p>
                                        <p className="text-[10px] text-gray-300 mt-0.5">JPEG, JPG, PNG — maks 5MB</p>
                                    </div>
                                )}
                            </div>
                            <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png"
                                onChange={handleFile} className="hidden" />
                        </Field>
                    </div>
                </div>

                {/* Konten */}
                <div>
                    <Field label="Konten Artikel" required error={errors.konten}>
                        <div className='w-full overflow-hidden panel-editor border border-gray-200 rounded-lg'>
                            <RichEditor value={form.konten} placeholder="Tuliskan Artikel..." onChange={val => handleChange('konten', val)} />
                        </div>
                    </Field>
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
            </form >
        </>
    );
}

ArticleCreate.layout = (page) => <PanelLayout>{page}</PanelLayout>;