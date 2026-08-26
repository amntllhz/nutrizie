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

export default function ArticleEdit({ article }) {
    const {
        form,
        errors,
        preview,
        processing,
        fileRef,
        handleChange,
        handleFile,
        handleSubmit,
        previewName,
        previewSize,
        getPreviewHeight
    } = useArticleForm({
        mode: 'edit',
        articleId: article.id,
        initialData: article
    });

    return (
        <>
            <Head title="Perbarui Artikel" />
            <div className="">
                <div className="mb-8">
                    <h1 className="text-lg font-bold text-gray-900">Perbarui Artikel</h1>
                    <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">{article.judul}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className='grid grid-cols-2 gap-4 w-full'>

                        <div className='space-y-4 w-full'>
                            {/* Judul */}
                            <div>
                                <Field label="Judul" required error={errors.judul}>
                                    <TextInput value={form.judul}
                                        onChange={e => handleChange('judul', e.target.value)}
                                        placeholder="Judul artikel..."
                                        error={errors.judul} />
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
                                <div className={`relative border-[1.5px] border-dashed rounded-lg overflow-hidden transition-colors
            ${errors.gambar ? 'border-red-300' : preview ? 'border-prim/30' : 'border-gray-200'}`}>

                                    {preview ? (
                                        <div>
                                            {/* Gambar preview */}
                                            <div className="relative">
                                                <img src={preview} alt="preview"
                                                    className={`w-full ${getPreviewHeight()} object-cover rounded-lg`} />
                                                {/* Container Elemen Info */}
                                                <div className="absolute bottom-0 inset-x-0 flex items-end justify-between p-3">

                                                    {/* Shadow Gradient */}
                                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-prim/80 via-prim/40 to-transparent rounded-b-lg pointer-events-none" />

                                                    {/* Elemen Info */}
                                                    <div className="relative z-10 min-w-0">
                                                        <p className="text-white text-[10px] font-medium truncate">{previewName}</p>
                                                        <p className="text-white/70 text-[9px]">{previewSize}</p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => fileRef.current?.click()}
                                                        className="relative flex z-10 shrink-0 ml-2 text-[10px] gap-x-1 px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded-sm backdrop-blur-sm transition-colors cursor-pointer justify-center items-center"
                                                    >
                                                        <svg className='size-3' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2"></path><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM48,163.31l88-88L180.69,120l-88,88H48Zm144-54.62L147.32,64l24-24L216,84.69Z"></path></svg>
                                                        Ubah Gambar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div onClick={() => fileRef.current?.click()}
                                            className={`flex flex-col items-center justify-center ${errors.gambar ? 'h-53' : 'h-48'} text-gray-300 cursor-pointer hover:bg-gray-50 transition-colors`}>
                                            <svg className='w-10 h-10 mb-2 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                                                <path d="M208,40H80a8,8,0,0,0-8,8V176a8,8,0,0,0,8,8H96.69l77.65-77.66a8,8,0,0,1,11.32,0L216,136.69V48A8,8,0,0,0,208,40Zm-88,64a16,16,0,1,1,16-16A16,16,0,0,1,120,104Z" opacity="0.2" />
                                                <path d="M208,32H80A16,16,0,0,0,64,48V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V192h16a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,48H208v69.38l-16.7-16.7a16,16,0,0,0-22.62,0L93.37,176H80Zm96,160H48V80H64v96a16,16,0,0,0,16,16h96Zm32-32H116l64-64,28,28v36Zm-88-64A24,24,0,1,0,96,88,24,24,0,0,0,120,112Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,120,80Z" />
                                            </svg>
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
                    <div className=''>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Konten Artikel</label>
                        <div className='w-full overflow-hidden panel-editor border border-gray-200 rounded-lg'>
                            <RichEditor value={form.konten} onChange={val => handleChange('konten', val)} />
                        </div>
                        {errors.konten && <p className="text-[9px] text-red-500 mt-1">{errors.konten}</p>}
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
                </form >
            </div >
        </>
    );
}

ArticleEdit.layout = (page) => <PanelLayout>{page}</PanelLayout>;