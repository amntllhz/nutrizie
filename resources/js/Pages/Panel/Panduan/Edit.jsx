import { Head, router } from '@inertiajs/react';
import PanelLayout from '@/Layout/PanelLayout';
import { Button } from '@/components/ui/button';
import { usePanduanForm, DESKRIPSI_MIN, DESKRIPSI_MAX } from './usePanduanForm';

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
            className={`w-full px-3.5 py-2 text-xs border text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors placeholder:text-gray-300
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
    );
}

export default function PanduanEdit({ panduan }) {
    const {
        form, errors, coverPreview, pdfName,
        processing, coverRef, pdfRef,
        handleChange, handleCover, handlePdf, handleSubmit,
    } = usePanduanForm({
        mode: 'edit',
        panduanId: panduan.id,
        initialData: panduan,
    });

    return (
        <>
            <Head title="Edit Panduan" />
            <div className="mb-6">
                <h1 className="text-lg font-bold text-gray-900">Edit Panduan Gizi</h1>
                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">{panduan.judul}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* Informasi Utama */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-700 mb-5">Informasi Utama</p>
                    <Field label="Judul" required error={errors.judul}>
                        <TextInput value={form.judul} onChange={e => handleChange('judul', e.target.value)}
                            placeholder="Judul buku panduan..." error={errors.judul} />
                    </Field>
                    <Field label="Deskripsi Singkat" error={errors.deskripsi}>
                        <div className="relative">
                            <textarea
                                value={form.deskripsi}
                                onChange={e => handleChange('deskripsi', e.target.value.slice(0, DESKRIPSI_MAX))}
                                maxLength={DESKRIPSI_MAX}
                                rows={3}
                                placeholder="Deskripsi singkat buku..."
                                className="w-full px-3.5 py-2 h-32 text-xs text-gray-600 border text-justify border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim transition-colors resize-none placeholder:text-gray-300"
                            />
                            <div className="flex items-center justify-between mt-1 px-0.5">
                                <span className={`text-[10px] transition-colors ${(form.deskripsi?.length ?? 0) > 0 && (form.deskripsi?.length ?? 0) < DESKRIPSI_MIN
                                    ? 'text-amber-400' : 'text-transparent'
                                    }`}>
                                    min. {DESKRIPSI_MIN} karakter
                                </span>
                                <span className={`text-[10px] tabular-nums transition-colors ${(form.deskripsi?.length ?? 0) >= DESKRIPSI_MAX ? 'text-red-400 font-semibold'
                                    : (form.deskripsi?.length ?? 0) >= DESKRIPSI_MAX * 0.8 ? 'text-amber-400'
                                        : (form.deskripsi?.length ?? 0) < DESKRIPSI_MIN && (form.deskripsi?.length ?? 0) > 0 ? 'text-amber-400'
                                            : 'text-gray-300'
                                    }`}>
                                    {form.deskripsi?.length ?? 0}/{DESKRIPSI_MAX}
                                </span>
                            </div>
                        </div>
                    </Field>
                </div>

                {/* Detail Bibliografi */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-700 mb-5">Detail Bibliografi</p>
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

                {/* File */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-700 mb-5">File
                        <span className="text-gray-300 font-light ml-1">( kosongkan jika tidak ingin mengubah )</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Cover */}
                        <Field label="Cover Buku" error={errors.cover}>
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
                                        <p className="text-[10px]">Upload cover baru</p>
                                        <p className="text-[10px] mt-0.5">JPEG, JPG, PNG — maks 5MB</p>
                                    </div>
                                )}
                            </div>
                            <input ref={coverRef} type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleCover} className="hidden" />
                        </Field>

                        {/* PDF */}
                        <Field label="File PDF" error={errors.file_pdf}>
                            <div onClick={() => pdfRef.current?.click()}
                                className={`relative border-[1.5px] border-dashed rounded-lg cursor-pointer transition-colors hover:border-prim h-40 flex flex-col items-center justify-center ${errors.file_pdf ? 'border-red-300' : 'border-gray-200'}`}>
                                {pdfName ? (
                                    <div className="flex flex-col items-center gap-2.5 px-4 text-center">
                                        <svg className='w-8 h-8 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,88H152V32Z" opacity="0.2"></path><path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"></path></svg>
                                        <div className='flex flex-col items-center gap-1'>
                                            <p className="text-[10px] text-gray-500 font-semibold truncate w-full">{pdfName}</p>
                                            <p className="text-[10px] text-gray-300">Klik untuk ganti</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2.5 text-gray-300">
                                        <svg className='w-8 h-8 text-prim' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,88H152V32Z" opacity="0.2"></path><path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"></path></svg>
                                        <div className='flex flex-col items-center gap-1'>
                                            <p className="text-[10px]">Upload PDF baru</p>
                                            <p className="text-[10px] mt-0.5">Maks 50MB</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input ref={pdfRef} type="file" accept="application/pdf" onChange={handlePdf} className="hidden" />
                        </Field>
                    </div>
                </div>

                {/* Button */}
                <div className="flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.visit('/panel/panduan')} className="text-xs px-6 cursor-pointer">Batal</Button>
                    <Button type="submit" disabled={processing} className="text-xs px-6 cursor-pointer bg-prim hover:bg-gratwo disabled:opacity-60">
                        {processing ? 'Menyimpan...' : 'Perbarui Panduan'}
                    </Button>
                </div>
            </form>
        </>
    );
}

PanduanEdit.layout = (page) => <PanelLayout>{page}</PanelLayout>;