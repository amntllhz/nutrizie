import { Head, router } from '@inertiajs/react';
import PanelLayout from '@/Layout/PanelLayout';
import { Button } from '@/components/ui/button';
import { usePanduanForm, DESKRIPSI_MIN, DESKRIPSI_MAX } from './usePanduanForm';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

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

export default function PanduanCreate() {
    const {
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
    } = usePanduanForm();

    return (
        <>
            <Head title="Tambah Panduan" />
            <div className="mb-6">
                <h1 className="text-lg font-bold text-gray-900">Tambah Panduan Gizi</h1>
                <p className="text-xs text-gray-500 mt-0.5">Lengkapi informasi di bawah ini untuk menambahkan panduan gizi baru</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* Judul & Deskripsi */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <div className='flex items-center gap-2 border-b border-gray-100 pb-2.5'>
                        <svg className='size-5 text-gray-400' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.6,159.41,213.67,192,184,174.54,154.33,192l8.07-32.59L136,137.61l34.65-2.67L184,104l13.35,30.94L232,137.61Z" opacity="0.2"></path><path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,72H96a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm72,48H40a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm125.09-40.22-22.52,18.59,6.86,27.71a8,8,0,0,1-11.82,8.81L184,183.82l-25.61,15.07a8,8,0,0,1-11.82-8.81l6.85-27.71-22.51-18.59a8,8,0,0,1,4.47-14.14l29.84-2.31,11.43-26.5a8,8,0,0,1,14.7,0l11.43,26.5,29.84,2.31a8,8,0,0,1,4.47,14.14Zm-25.47.28-14.89-1.15a8,8,0,0,1-6.73-4.8l-6-13.92-6,13.92a8,8,0,0,1-6.73,4.8l-14.89,1.15,11.11,9.18a8,8,0,0,1,2.68,8.09l-3.5,14.12,13.27-7.81a8,8,0,0,1,8.12,0l13.27,7.81-3.5-14.12a8,8,0,0,1,2.68-8.09Z"></path></svg>
                        <p className="text-xs font-semibold text-gray-700">Informasi Utama</p>
                    </div>
                    <Field label="Judul" required error={errors.judul}>
                        <TextInput value={form.judul} onChange={e => handleChange('judul', e.target.value)}
                            placeholder="Judul buku panduan..." error={errors.judul} />
                    </Field>
                    <Field label="Deskripsi Singkat" required>
                        <div className="relative">
                            <textarea
                                value={form.deskripsi}
                                onChange={e => handleChange('deskripsi', e.target.value.slice(0, DESKRIPSI_MAX))}
                                maxLength={DESKRIPSI_MAX}
                                rows={3}
                                placeholder="Deskripsi singkat buku..."
                                className={`w-full px-3.5 h-32 py-2 text-xs text-gray-600 border text-justify rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors resize-none placeholder:text-gray-300 ${errors.deskripsi ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
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

                {/* Detail bibliografi */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <div className='flex items-center gap-2 border-b border-gray-100 pb-2.5'>
                        <svg className='size-5 text-gray-400' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.6,159.41,213.67,192,184,174.54,154.33,192l8.07-32.59L136,137.61l34.65-2.67L184,104l13.35,30.94L232,137.61Z" opacity="0.2"></path><path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,72H96a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm72,48H40a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm125.09-40.22-22.52,18.59,6.86,27.71a8,8,0,0,1-11.82,8.81L184,183.82l-25.61,15.07a8,8,0,0,1-11.82-8.81l6.85-27.71-22.51-18.59a8,8,0,0,1,4.47-14.14l29.84-2.31,11.43-26.5a8,8,0,0,1,14.7,0l11.43,26.5,29.84,2.31a8,8,0,0,1,4.47,14.14Zm-25.47.28-14.89-1.15a8,8,0,0,1-6.73-4.8l-6-13.92-6,13.92a8,8,0,0,1-6.73,4.8l-14.89,1.15,11.11,9.18a8,8,0,0,1,2.68,8.09l-3.5,14.12,13.27-7.81a8,8,0,0,1,8.12,0l13.27,7.81-3.5-14.12a8,8,0,0,1,2.68-8.09Z"></path></svg>
                        <p className="text-xs font-semibold text-gray-700">Detail Bibliografi</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Field required label="Penerbit" error={errors.penerbit}>
                            <TextInput value={form.penerbit} onChange={e => handleChange('penerbit', e.target.value)} placeholder="Nama penerbit..." error={errors.penerbit} />
                        </Field>
                        <Field required label="Penanggung Jawab" error={errors.penanggung_jawab}>
                            <TextInput value={form.penanggung_jawab} onChange={e => handleChange('penanggung_jawab', e.target.value)} placeholder="Nama penanggung jawab..." error={errors.penanggung_jawab} />
                        </Field>
                        <Field required label="Tajuk Pengarang" error={errors.tajuk_pengarang}>
                            <TextInput value={form.tajuk_pengarang} onChange={e => handleChange('tajuk_pengarang', e.target.value)} placeholder="Tajuk pengarang..." error={errors.tajuk_pengarang} />
                        </Field>
                        <Field required label="Tajuk Pengarah Tambahan" error={errors.tajuk_pengarah_tambahan}>
                            <TextInput value={form.tajuk_pengarah_tambahan} onChange={e => handleChange('tajuk_pengarah_tambahan', e.target.value)} placeholder="Tajuk pengarah..." error={errors.tajuk_pengarah_tambahan} />
                        </Field>
                        <Field required label="Tahun Terbit" error={errors.tahun_terbit}>
                            <TextInput type="number" value={form.tahun_terbit} onChange={e => handleChange('tahun_terbit', e.target.value)} placeholder="2024" error={errors.tahun_terbit} />
                        </Field>
                        <Field required label="Tempat Terbit" error={errors.tempat_terbit}>
                            <TextInput value={form.tempat_terbit} onChange={e => handleChange('tempat_terbit', e.target.value)} placeholder="Jakarta..." error={errors.tempat_terbit} />
                        </Field>
                        <Field required label="Jumlah Halaman" error={errors.halaman}>
                            <TextInput type="number" value={form.halaman} onChange={e => handleChange('halaman', e.target.value)} placeholder="106" error={errors.halaman} />
                        </Field>
                        <Field required label="Bahasa" error={errors.bahasa}>
                            <TextInput value={form.bahasa} onChange={e => handleChange('bahasa', e.target.value)} placeholder="Indonesia" error={errors.bahasa} />
                        </Field>
                        <Field required label="ISBN" error={errors.isbn}>
                            <TextInput value={form.isbn} onChange={e => handleChange('isbn', e.target.value)} placeholder="978-xxx-xxx..." error={errors.isbn} />
                        </Field>
                        <Field required label="Edisi" error={errors.edisi}>
                            <TextInput value={form.edisi} onChange={e => handleChange('edisi', e.target.value)} placeholder="Edisi ke-1..." error={errors.edisi} />
                        </Field>
                    </div>
                </div>

                {/* Upload */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <div className='flex items-center gap-2 border-b border-gray-100 pb-2.5'>
                        <svg className='size-5 text-gray-400' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80H32V56a8,8,0,0,1,8-8H92.69a8,8,0,0,1,5.65,2.34Z" opacity="0.2"></path><path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM92.69,56l16,16H40V56ZM216,200H40V88H216Zm-88-88a8,8,0,0,1,8,8v16h16a8,8,0,0,1,0,16H136v16a8,8,0,0,1-16,0V152H104a8,8,0,0,1,0-16h16V120A8,8,0,0,1,128,112Z"></path></svg>
                        <p className="text-xs font-semibold text-gray-700">Dokumen</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Cover */}
                        <Field label="Cover Buku" required error={errors.cover}>
                            <div
                                className={`relative border-[1.5px] border-dashed rounded-lg transition-colors overflow-hidden ${errors.cover ? 'border-red-300' : coverPreview ? 'border-prim/30 hover:border-prim/30' : 'border-gray-200 hover:border-prim'}`}>
                                {coverPreview ? (
                                    <div>
                                        {/* Gambar preview */}
                                        <div className="relative">
                                            {isImgLoading && (
                                                <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-gray-50 z-20">
                                                    <div className="w-5 h-5 border-2 border-prim border-t-transparent rounded-full animate-spin" />
                                                    <p className="text-[10px] font-medium text-gray-500">Memproses pratinjau Gambar...</p>
                                                </div>
                                            )}

                                            <img
                                                src={coverPreview}
                                                alt="preview"
                                                onLoad={() => setIsImgLoading(false)}
                                                className={`w-full h-40 object-cover rounded-lg transition-opacity duration-200 ${isImgLoading ? 'opacity-0' : 'opacity-100'
                                                    }`} />

                                            {/* Container Elemen Info */}
                                            {!isImgLoading && (
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
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            coverRef.current?.click()
                                                        }}
                                                        className="relative flex z-10 shrink-0 ml-2 text-[10px] gap-x-1 px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded-sm backdrop-blur-sm transition-colors cursor-pointer justify-center items-center"
                                                    >
                                                        <svg className='size-3' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2"></path><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM48,163.31l88-88L180.69,120l-88,88H48Zm144-54.62L147.32,64l24-24L216,84.69Z"></path></svg>
                                                        Ubah Gambar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div onClick={() => coverRef.current?.click()}
                                        className={`flex flex-col items-center justify-center h-40 text-gray-300 cursor-pointer hover:bg-gray-50 transition-colors`}>
                                        <svg className='size-10 mb-2 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,40H80a8,8,0,0,0-8,8V176a8,8,0,0,0,8,8H96.69l77.65-77.66a8,8,0,0,1,11.32,0L216,136.69V48A8,8,0,0,0,208,40Zm-88,64a16,16,0,1,1,16-16A16,16,0,0,1,120,104Z" opacity="0.2"></path><path d="M208,32H80A16,16,0,0,0,64,48V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V192h16a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,48H208v69.38l-16.7-16.7a16,16,0,0,0-22.62,0L93.37,176H80Zm96,160H48V80H64v96a16,16,0,0,0,16,16h96Zm32-32H116l64-64,28,28v36Zm-88-64A24,24,0,1,0,96,88,24,24,0,0,0,120,112Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,120,80Z"></path></svg>
                                        <p className="text-xs text-gray-800 font-semibold">Klik untuk upload gambar</p>
                                        <p className="text-[10px] mt-0.5">JPEG, JPG, PNG — maks 5MB</p>
                                    </div>
                                )}
                            </div>
                            <input ref={coverRef} type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleCover} className="hidden" />
                        </Field>

                        {/* PDF */}
                        <Field label="File PDF" required error={errors.file_pdf}>
                            <div
                                className={`relative border-[1.5px] border-dashed rounded-lg transition-colors overflow-hidden flex flex-col items-center justify-center ${errors.file_pdf ? 'border-red-300' : pdfPreview ? 'border-prim/30 hover:border-prim/30' : 'border-gray-200 hover:border-prim'}`}>
                                {
                                    isRenderingPdf ? (
                                        /* Tampilan Loading saat PDF sedang di-render */
                                        <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-400">
                                            <div className="w-6 h-6 border-2 border-prim border-t-transparent rounded-full animate-spin" />
                                            <p className="text-[10px] font-medium text-gray-500">Memproses pratinjau PDF...</p>
                                        </div>
                                    ) : pdfName ? (
                                        <div className="relative rounded-lg">
                                            {pdfPreview ? (
                                                <>
                                                    <img src={pdfPreview} alt="PDF preview"
                                                        className="object-cover h-40 rounded-lg" />
                                                    {/* Container Elemen Info */}
                                                    <div className="absolute bottom-0 inset-x-0 flex items-end justify-between p-3">

                                                        {/* Shadow Gradient */}
                                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-prim/80 via-prim/40 to-transparent rounded-b-lg pointer-events-none" />

                                                        {/* Elemen Info */}
                                                        <div className="relative z-10 min-w-0">
                                                            <p className="text-white text-[10px] font-medium truncate">{pdfName}</p>
                                                            <p className="text-white/70 text-[9px]">{pdfSize}</p>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                pdfRef.current?.click();
                                                            }}
                                                            className="relative flex z-10 shrink-0 ml-2 text-[10px] gap-x-1 px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded-sm backdrop-blur-sm transition-colors cursor-pointer justify-center items-center"
                                                        >
                                                            <svg className='size-3' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2"></path><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM48,163.31l88-88L180.69,120l-88,88H48Zm144-54.62L147.32,64l24-24L216,84.69Z"></path></svg>
                                                            Ubah Dokumen
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                // Fallback kalau render PDF gagal - tampil nama file saja
                                                <div className="flex flex-col items-center gap-2 px-4 text-center py-6">
                                                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-[10px] text-gray-600 font-medium truncate w-full">{pdfName}</p>
                                                    <p className="text-[10px] text-gray-400">{pdfSize}</p>
                                                    <p className="text-[10px] text-prim">Klik untuk ganti</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div onClick={() => pdfRef.current?.click()}
                                            className="flex flex-col w-full items-center justify-center h-40 text-gray-300 cursor-pointer">
                                            <svg className='w-10 h-10 mb-2 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,72V184a8,8,0,0,1-8,8H176V104L136,64H80V40a8,8,0,0,1,8-8h80Z" opacity="0.2"></path><path d="M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V56H56A16,16,0,0,0,40,72V216a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM168,216H56V72h76.69L168,107.31v84.53c0,.06,0,.11,0,.16s0,.1,0,.16V216Zm32-32H184V104a8,8,0,0,0-2.34-5.66l-40-40A8,8,0,0,0,136,56H88V40h76.69L200,75.31Zm-56-32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,152Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,184Z"></path></svg>
                                            <p className="text-xs text-gray-800 font-semibold">Klik untuk upload Dokumen</p>
                                            <p className="text-[10px] mt-0.5">PDF — maks 50MB</p>
                                        </div>
                                    )}
                            </div>
                            <input ref={pdfRef} type="file" accept="application/pdf" onChange={handlePdf} className="hidden" />
                        </Field>
                    </div>
                </div >

                {/* Button */}
                < div className="flex items-center justify-end gap-3" >
                    <Button type="button" variant="outline" onClick={() => router.visit('/panel/panduan')} className="text-xs px-6 cursor-pointer">Batal</Button>
                    <Button type="submit" disabled={processing} className="text-xs px-6 cursor-pointer bg-prim hover:bg-gratwo disabled:opacity-60">
                        {processing ? 'Menyimpan...' : 'Simpan Panduan'}
                    </Button>
                </ div>
            </form >
        </>
    );
}

PanduanCreate.layout = (page) => <PanelLayout>{page}</PanelLayout>;