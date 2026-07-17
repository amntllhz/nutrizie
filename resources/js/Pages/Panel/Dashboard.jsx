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
                            <svg className='w-4.5 h-4.5 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H40a8,8,0,0,0-8,8V216l32-16,32,16,32-16,32,16,32-16,32,16V56A8,8,0,0,0,216,48ZM112,160H64V96h48Z" opacity="0.2"></path><path d="M216,40H40A16,16,0,0,0,24,56V216a8,8,0,0,0,11.58,7.15L64,208.94l28.42,14.21a8,8,0,0,0,7.16,0L128,208.94l28.42,14.21a8,8,0,0,0,7.16,0L192,208.94l28.42,14.21A8,8,0,0,0,232,216V56A16,16,0,0,0,216,40Zm0,163.06-20.42-10.22a8,8,0,0,0-7.16,0L160,207.06l-28.42-14.22a8,8,0,0,0-7.16,0L96,207.06,67.58,192.84a8,8,0,0,0-7.16,0L40,203.06V56H216ZM136,112a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H144A8,8,0,0,1,136,112Zm0,32a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H144A8,8,0,0,1,136,144ZM64,168h48a8,8,0,0,0,8-8V96a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v64A8,8,0,0,0,64,168Zm8-64h32v48H72Z"></path></svg>
                        }
                    />
                    <StatCard
                        label="Total Masukan"
                        value={totalFeedback}
                        icon={
                            <svg className='w-4.5 h-4.5 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,96V224l-39.58-32H88a8,8,0,0,1-8-8V144h88a8,8,0,0,0,8-8V88h40A8,8,0,0,1,224,96Z" opacity="0.2"></path><path d="M216,80H184V48a16,16,0,0,0-16-16H40A16,16,0,0,0,24,48V176a8,8,0,0,0,13,6.22L72,154V184a16,16,0,0,0,16,16h93.59L219,230.22a8,8,0,0,0,5,1.78,8,8,0,0,0,8-8V96A16,16,0,0,0,216,80ZM66.55,137.78,40,159.25V48H168v88H71.58A8,8,0,0,0,66.55,137.78ZM216,207.25l-26.55-21.47a8,8,0,0,0-5-1.78H88V152h80a16,16,0,0,0,16-16V96h32Z"></path></svg>
                        }
                    />
                    <StatCard
                        label="Masukan Belum Dibaca"
                        value={feedbackBelumDibaca}
                        icon={
                            <svg className='w-4.5 h-4.5 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,60a28,28,0,1,1-28-28A28,28,0,0,1,224,60Z" opacity="0.2"></path><path d="M216,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40h80a8,8,0,0,1,0,16H48V208H200V128a8,8,0,0,1,16,0Zm16-68a36,36,0,1,1-36-36A36,36,0,0,1,232,60Zm-16,0a20,20,0,1,0-20,20A20,20,0,0,0,216,60Z"></path></svg>
                        }
                    />
                </div>

                {/* Tables row */}
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 items-start">

                    {/* Recent Artikel */}
                    <div className="bg-white col-span-2 rounded-xl border border-gray-100 p-1 ">
                        <div className="flex items-center justify-between p-3 ">
                            <h2 className="text-xs font-semibold text-gray-600">Artikel Terbaru</h2>
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
                                recentArtikel.slice(0, 3).map((artikel) => (
                                    <Link
                                        key={artikel.id}
                                        href={`/artikel/${artikel.id}`}
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
                            <h2 className="text-xs font-semibold text-gray-600">Masukan Terbaru</h2>
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