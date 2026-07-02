import PanelLayout from '@/Layout/PanelLayout';
import { Head, Link } from '@inertiajs/react';
import noArtikel from '../../../../public/img/no-artikel.svg';
import noFeedback from '../../../../public/img/no-feedback.svg';

export default function Dashboard({ stats = {}, recentArtikel = [], recentFeedback = [] }) {
    const {
        totalArtikel = 0,
        totalFeedback = 0,
        feedbackBelumDibaca = 0,
    } = stats;

    return (
        <>
            <Head title='Dashboard' />
            <div>
                <div className="mb-6">
                    <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Selamat datang di panel admin Nutrizie</p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 mb-8">
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
                        label="Total Feedback"
                        value={totalFeedback}
                        icon={
                            <svg className="w-4.5 h-4.5" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 10.5H7.51M12 10.5H12.01M16.5 10.5H16.51M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2ZM8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5ZM12.5 10.5C12.5 10.7761 12.2761 11 12 11C11.7239 11 11.5 10.7761 11.5 10.5C11.5 10.2239 11.7239 10 12 10C12.2761 10 12.5 10.2239 12.5 10.5ZM17 10.5C17 10.7761 16.7761 11 16.5 11C16.2239 11 16 10.7761 16 10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    />
                    <StatCard
                        label="Feedback Belum Dibaca"
                        value={feedbackBelumDibaca}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        }
                    />
                </div>

                {/* Tables row */}
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-6">

                    {/* Recent Artikel */}
                    <div className="bg-white col-span-2 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-900">Artikel Terbaru</h2>
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
                        <div className="divide-y divide-gray-50">
                            {recentArtikel.length === 0 ? (
                                <EmptyState label="Artikel belum tersedia" message="Silahkan buat sebuah artikel baru" icon={noArtikel} />
                            ) : (
                                recentArtikel.map((artikel) => (
                                    <div key={artikel.id} className="px-5 py-3">
                                        <p className="text-sm text-gray-800 font-medium truncate">{artikel.title}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{artikel.created_at}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Feedback */}
                    <div className="bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-900">Feedback Terbaru</h2>
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
                        <div className="divide-y divide-gray-100 bg-white rounded-xl overflow-hidden">
                            {recentFeedback.length === 0 ? (
                                <EmptyState label="Feedback belum tersedia" message="Belum ada feedback dari user" icon={noFeedback} />
                            ) : (
                                recentFeedback.slice(0, 3).map((fb) => (
                                    <div
                                        key={fb.id}
                                        className="px-5 py-4 flex items-start gap-3.5 hover:bg-gray-50/60 transition-colors duration-200 group"
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
                                                <span className="shrink-0 text-[9px] tracking-wide text-gray-400">
                                                    {fb.created_at}
                                                </span>
                                            </div>

                                            {/* Pesan Feedback */}
                                            <p className="text-[10px] text-gray-500 font-normal line-clamp-2 mt-1 leading-relaxed pr-2">
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

                {/* Inertia check badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-green-700 font-medium">Inertia + React aktif</span>
                </div>
            </div>
        </>
    );
}

function StatCard({ label, value, icon }) {

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">{label}</span>
                <span className="p-1.5 rounded-lg bg-prim/5 text-prim">{icon}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    );
}

function EmptyState({ label, message, icon }) {
    return (
        <>
            <div className='flex flex-col items-center justify-center py-8 space-y-2'>
                <div className="w-fit">
                    <img src={icon} alt="" className='w-20 h-20' />
                </div>
                <div className='flex flex-col space-y-0.5'>
                    <div className="px-5 font-semibold text-center text-xs text-gray-800">{label}</div>
                    <p className='text-[11px] text-gray-400 text-center'>{message}</p>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <PanelLayout>{page}</PanelLayout>;