import PanelLayout from '@/Layout/PanelLayout';
import { Head, Link } from '@inertiajs/react';
import noArtikel from '../../../../public/img/no-artikel.svg';
import noFeedback from '../../../../public/img/no-feedback.svg';
import CountUp from '@/components/ui/CountUp';
import EmptyState from '@/components/ui/EmptyState';
import StatCard from '@/components/ui/statcard';
import QuickAdd from '@/components/ui/quickAdd';

export default function Dashboard({ stats = {}, recentArtikel = [], recentFeedback = [] }) {
    const {
        totalArtikel = 0,
        totalFeedback = 0,
        feedbackBelumDibaca = 0,
    } = stats;

    return (
        <>
            <Head title='Beranda' />
            <div>
                <div className="mb-6">
                    <h1 className="text-lg font-bold text-gray-900">Beranda</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Selamat datang di beranda admin Nutrizie</p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 mb-6">
                    <StatCard
                        label="Total Artikel"
                        value={totalArtikel}
                        icon={
                            <svg className="w-4.5 h-4.5" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 11H8M10 15H8M16 7H8M20 6.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H15.2C16.8802 2 17.7202 2 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C20 4.27976 20 5.11984 20 6.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    />
                    <StatCard
                        label="Total Masukan"
                        value={totalFeedback}
                        icon={
                            <svg className="w-4.5 h-4.5" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 10.5H7.51M12 10.5H12.01M16.5 10.5H16.51M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2ZM8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5ZM12.5 10.5C12.5 10.7761 12.2761 11 12 11C11.7239 11 11.5 10.7761 11.5 10.5C11.5 10.2239 11.7239 10 12 10C12.2761 10 12.5 10.2239 12.5 10.5ZM17 10.5C17 10.7761 16.7761 11 16.5 11C16.2239 11 16 10.7761 16 10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    />
                    <StatCard
                        label="Masukan Belum Dibaca"
                        value={feedbackBelumDibaca}
                        icon={
                            <svg className='w-4.5 h-4.5' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V13M13 17H7M15 13H7M20.1213 3.87868C21.2929 5.05025 21.2929 6.94975 20.1213 8.12132C18.9497 9.29289 17.0503 9.29289 15.8787 8.12132C14.7071 6.94975 14.7071 5.05025 15.8787 3.87868C17.0503 2.70711 18.9497 2.70711 20.1213 3.87868Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    />
                </div>

                {/* Tables row */}
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 items-start">

                    {/* Recent Artikel */}
                    <div className="bg-white col-span-2 rounded-xl border border-gray-100 p-1 ">
                        <div className="flex items-center justify-between p-3 ">
                            <h2 className="text-xs font-semibold text-gray-800">Artikel Terbaru</h2>
                            <Link
                                href="/panel/artikel"
                                className="flex items-center justify-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 font-medium transition-all duration-300"
                            >
                                Lihat semua
                                <svg className="w-3.5 h-3.5" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                            {recentArtikel.length === 0 ? (
                                <EmptyState label="Artikel belum tersedia" message="Silahkan buat sebuah artikel baru" icon={noArtikel} />
                            ) : (
                                recentArtikel.map((artikel) => (
                                    <Link
                                        key={artikel.id}
                                        href={`/panel/artikel/${artikel.id}`}
                                        className="block group"
                                    >
                                        <div className="w-full bg-white p-2 rounded-xl space-y-3 ring-1 ring-inset ring-prim/20 hover:bg-prim/5 hover:ring-2 hover:ease-in-out hover:duration-300 sm:p-4">
                                            {artikel.gambar && (
                                                <div className="relative w-full h-24 rounded-md overflow-hidden transition-transform duration-300">
                                                    <img
                                                        className="object-cover w-full h-full"
                                                        src={artikel.gambar}
                                                        alt={artikel.judul}
                                                    />

                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                                                    <div className="absolute bottom-0 inset-x-0 px-2 py-1 flex flex-row w-full justify-between items-center sm:p-4">
                                                        <p className="text-white bg-white/20 backdrop-blur-sm font-semibold text-[8px] py-0.5 px-2.5 rounded-full border border-white/10">
                                                            Author
                                                        </p>
                                                        <p className="text-white text-[8px] py-1.5 px-1 font-medium drop-shadow-md">
                                                            {artikel.created_at}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="px-2 pb-1 space-y-1.5">
                                                <h1 className="text-xs text-prim font-bold line-clamp-1 sm:text-lg group-hover:text-gratwo transition-colors duration-300">
                                                    {artikel.judul}
                                                </h1>

                                                <p className="text-[10px] text-gray-400 line-clamp-2 font-light">
                                                    {artikel.deskripsi}
                                                </p>

                                                <div className="flex items-center text-[10px] text-prim font-semibold pt-1 group-hover:underline">
                                                    Baca selengkapnya
                                                    <svg
                                                        className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}

                            {/* Placeholder dinamis */}
                            {recentArtikel.length === 1 && (
                                <div className="col-span-2">
                                    <QuickAdd />
                                </div>
                            )}

                            {recentArtikel.length === 2 && (
                                <QuickAdd />
                            )}
                        </div>

                    </div>

                    {/* Recent Feedback */}
                    <div className="bg-white rounded-xl border border-gray-100 p-1">
                        <div className="flex items-center justify-between p-3 ">
                            <h2 className="text-xs font-semibold text-gray-800">Masukan Terbaru</h2>
                            <Link
                                href="/panel/feedback"
                                className="flex items-center justify-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 font-medium transition-all duration-300"
                            >
                                Lihat semua
                                <svg className="w-3.5 h-3.5" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden p-1">
                            {recentFeedback.length === 0 ? (
                                <EmptyState label="Feedback belum tersedia" message="Belum ada feedback dari user" icon={noFeedback} />
                            ) : (
                                recentFeedback.slice(0, 4).map((fb) => (
                                    <div
                                        key={fb.id}
                                        className="px-4 py-2.5 flex items-start gap-3.5 hover:bg-gray-50/60 transition-colors duration-200 group"
                                    >
                                        {/* 1. Avatar Ringkas Modern */}
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200/60 text-gray-600 font-semibold text-xs uppercase">
                                            {fb.email ? fb.email.charAt(0) : 'F'}
                                        </div>

                                        {/* 2. Konten Utama */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline justify-between gap-4">
                                                {/* Nama/Email User */}
                                                <p className="text-xs font-semibold text-gray-800 truncate">
                                                    {fb.email}
                                                </p>

                                                {/* Waktu di Sisi Kanan agar Balance */}
                                                <span className="shrink-0 text-[8px] tracking-wide text-gray-400">
                                                    {fb.created_at}
                                                </span>
                                            </div>

                                            {/* Pesan Feedback */}
                                            <p className="text-[10px] text-gray-500 font-normal line-clamp-1 mt-1 leading-relaxed pr-2">
                                                {fb.pesan}
                                            </p>
                                        </div>

                                        {/* 3. Indikator Unread di Pojok Kanan Atas */}
                                        {!fb.is_read && (
                                            <div className="shrink-0 pt-1.5">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    {/* Ping Efek (Radar) */}
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prim opacity-75"></span>
                                                    {/* Bulatan Inti */}
                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-prim"></span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <PanelLayout>{page}</PanelLayout>;