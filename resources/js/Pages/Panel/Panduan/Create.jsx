import { Head, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import PanelLayout from '@/Layout/PanelLayout';
import { Button } from '@/components/ui/button';
import { usePanduanForm } from './usePanduanForm';

function Field({ label, error, required, children }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            {children}
            {error && <p className="text-[9px] text-red-500 mt-1">{error}</p>}
        </div>
    );
}

function TextInput({ error, ...props }) {
    return (
        <input {...props}
            className={`w-full px-3.5 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors placeholder:text-gray-300
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
    );
}

const ALLOWED_IMG = ['image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_PDF = ['application/pdf'];
const MAX_IMG_BYTE = 5 * 1024 * 1024;
const MAX_PDF_BYTE = 50 * 1024 * 1024;

export default function PanduanCreate() {
    const {
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
    } = usePanduanForm();

    return (
        <>
            <Head title="Tambah Panduan" />
            <div className="mb-6">
                <h1 className="text-lg font-semibold text-gray-900">Tambah Panduan Gizi</h1>
                <p className="text-xs text-gray-500 mt-0.5">Lengkapi informasi di bawah ini untuk menambahkan panduan gizi baru</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl" noValidate>

                {/* Judul & Deskripsi */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-700">Informasi Utama</p>
                    <Field label="Judul" required error={errors.judul}>
                        <TextInput value={form.judul} onChange={e => handleChange('judul', e.target.value)}
                            placeholder="Judul buku panduan..." error={errors.judul} />
                    </Field>
                    <Field label="Deskripsi Singkat" error={errors.deskripsi}>
                        <textarea value={form.deskripsi} onChange={e => handleChange('deskripsi', e.target.value)}
                            rows={3} placeholder="Deskripsi singkat buku..."
                            className={`w-full px-3.5 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors resize-none placeholder:text-gray-300 ${errors.deskripsi ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
                    </Field>
                </div>

                {/* Detail bibliografi */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-700">Detail Bibliografi</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Penerbit" error={errors.penerbit}>
                            <TextInput value={form.penerbit} onChange={e => handleChange('penerbit', e.target.value)} placeholder="Nama penerbit..." error={errors.penerbit} />
                        </Field>
                        <Field label="Penanggung Jawab" error={errors.penanggung_jawab}>
                            <TextInput value={form.penanggung_jawab} onChange={e => handleChange('penanggung_jawab', e.target.value)} placeholder="Nama penanggung jawab..." error={errors.penanggung_jawab} />
                        </Field>
                        <Field label="Tajuk Pengarang" error={errors.tajuk_pengarang}>
                            <TextInput value={form.tajuk_pengarang} onChange={e => handleChange('tajuk_pengarang', e.target.value)} placeholder="Tajuk pengarang..." error={errors.tajuk_pengarang} />
                        </Field>
                        <Field label="Tajuk Pengarah Tambahan" error={errors.tajuk_pengarah_tambahan}>
                            <TextInput value={form.tajuk_pengarah_tambahan} onChange={e => handleChange('tajuk_pengarah_tambahan', e.target.value)} placeholder="Tajuk pengarah..." error={errors.tajuk_pengarah_tambahan} />
                        </Field>
                        <Field label="Tahun Terbit" error={errors.tahun_terbit}>
                            <TextInput type="number" value={form.tahun_terbit} onChange={e => handleChange('tahun_terbit', e.target.value)} placeholder="2024" error={errors.tahun_terbit} />
                        </Field>
                        <Field label="Tempat Terbit" error={errors.tempat_terbit}>
                            <TextInput value={form.tempat_terbit} onChange={e => handleChange('tempat_terbit', e.target.value)} placeholder="Jakarta..." error={errors.tempat_terbit} />
                        </Field>
                        <Field label="Jumlah Halaman" error={errors.halaman}>
                            <TextInput type="number" value={form.halaman} onChange={e => handleChange('halaman', e.target.value)} placeholder="106" error={errors.halaman} />
                        </Field>
                        <Field label="Bahasa" error={errors.bahasa}>
                            <TextInput value={form.bahasa} onChange={e => handleChange('bahasa', e.target.value)} placeholder="Indonesia" error={errors.bahasa} />
                        </Field>
                        <Field label="ISBN" error={errors.isbn}>
                            <TextInput value={form.isbn} onChange={e => handleChange('isbn', e.target.value)} placeholder="978-xxx-xxx..." error={errors.isbn} />
                        </Field>
                        <Field label="Edisi" error={errors.edisi}>
                            <TextInput value={form.edisi} onChange={e => handleChange('edisi', e.target.value)} placeholder="Edisi ke-1..." error={errors.edisi} />
                        </Field>
                    </div>
                </div>

                {/* Upload */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-700">File</p>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Cover */}
                        <Field label="Cover Buku" required error={errors.cover}>
                            <div onClick={() => coverRef.current?.click()}
                                className={`relative border-[1.5px] border-dashed rounded-lg cursor-pointer transition-colors hover:border-prim ${errors.cover ? 'border-red-300' : 'border-gray-200'}`}>
                                {coverPreview ? (
                                    <div className="relative">
                                        <img src={coverPreview} alt="cover" className="w-full h-40 object-cover rounded-lg" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs">Ganti cover</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-gray-300">
                                        <svg className="w-8 h-8 mb-2 text-prim/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[10px]">Upload cover</p>
                                        <p className="text-[10px] mt-0.5">JPEG, JPG, PNG — maks 5MB</p>
                                    </div>
                                )}
                            </div>
                            <input ref={coverRef} type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleCover} className="hidden" />
                        </Field>

                        {/* PDF */}
                        <Field label="File PDF" required error={errors.file_pdf}>
                            <div onClick={() => pdfRef.current?.click()}
                                className={`relative border-[1.5px] border-dashed rounded-lg cursor-pointer transition-colors hover:border-prim h-40 flex flex-col items-center justify-center ${errors.file_pdf ? 'border-red-300' : 'border-gray-200'}`}>
                                {pdfName ? (
                                    <div className="flex flex-col items-center gap-2 px-4 text-center">
                                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[10px] text-gray-600 font-medium truncate w-full">{pdfName}</p>
                                        <p className="text-[10px] text-prim">Klik untuk ganti</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-gray-300">
                                        <svg className="w-8 h-8 mb-2 text-prim/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[10px]">Upload file PDF</p>
                                        <p className="text-[10px] mt-0.5">Maks 50MB</p>
                                    </div>
                                )}
                            </div>
                            <input ref={pdfRef} type="file" accept="application/pdf" onChange={handlePdf} className="hidden" />
                        </Field>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.visit('/panel/panduan')} className="text-xs px-6 cursor-pointer">Batal</Button>
                    <Button type="submit" disabled={processing} className="text-xs px-6 cursor-pointer bg-prim hover:bg-gratwo disabled:opacity-60">
                        {processing ? 'Menyimpan...' : 'Simpan Panduan'}
                    </Button>
                </div>
            </form>
        </>
    );
}

PanduanCreate.layout = (page) => <PanelLayout>{page}</PanelLayout>;