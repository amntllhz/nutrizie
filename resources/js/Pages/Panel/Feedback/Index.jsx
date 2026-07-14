import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import PanelLayout from '@/Layout/PanelLayout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import deleteIcon from '../../../../../public/img/delete.svg';

// ── Icons ────────────────────────────────────────────────
function IconMarkRead({ active }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            className={active ? 'text-prim' : 'text-gray-400'}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M9 10.5L11 12.5L15.5 8M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconTrash() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            className="text-red-400"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconEye() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            className="text-gray-400"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ── Flash toast handler ───────────────────────────────────
function useFlashToast() {
    const { flash = {} } = usePage().props;

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.info) toast.info(flash.info);
    }, [flash]);
}

// ── Main component ────────────────────────────────────────
export default function FeedbackIndex({ feedbacks }) {
    const data = feedbacks?.data || [];
    const meta = feedbacks?.meta || {};
    const links = feedbacks?.meta?.links || [];
    const icon = deleteIcon;

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [viewTarget, setViewTarget] = useState(null);
    const [selected, setSelected] = useState([]);
    const [selectAllDb, setSelectAllDb] = useState(false);

    const allIds = data.map(f => f.id);
    const allSelected = allIds.length > 0 && allIds.every(id => selected.includes(id));
    const someSelected = selected.length > 0;
    const allSelectedRead = selectAllDb
        ? false  // kalau select all DB, selalu aktif — pasti ada yang belum dibaca (backend filter sendiri)
        : selected.length > 0 && selected.every(id => data.find(f => f.id === id)?.is_read === true);

    function toggleAll() {
        setSelectAllDb(false);
        setSelected(allSelected ? [] : allIds);
    }

    function toggleOne(id) {
        setSelectAllDb(false);
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    }

    function clearSelection() {
        setSelected([]);
        setSelectAllDb(false);
    }

    useFlashToast();

    function goToPage(url) {
        if (!url) return;
        // Parse the absolute URL Laravel returns and use router.get (same as handlePerPage)
        const u = new URL(url);
        router.get(u.pathname + u.search, {}, { preserveScroll: true });
    }

    function handlePerPage(value) {
        router.get('/panel/feedback', { per_page: value }, { preserveScroll: true });
    }

    function buildPageItems(allLinks) {
        if (!allLinks || allLinks.length < 3) return { prev: null, next: null, items: [] };
        const prev = allLinks[0];
        const next = allLinks[allLinks.length - 1];
        const pages = allLinks.slice(1, -1);
        const total = pages.length;

        if (total <= 3) return { prev, next, items: pages };

        const curIdx = pages.findIndex(l => l.active);
        if (curIdx === -1) return { prev, next, items: pages };

        const result = [];
        const show = new Set();

        // Selalu tampil: halaman pertama, terakhir, current, current±1
        [0, total - 1, curIdx - 1, curIdx, curIdx + 1]
            .filter(i => i >= 0 && i < total)
            .forEach(i => show.add(i));

        [...show].sort((a, b) => a - b).forEach((i, pos, arr) => {
            if (pos > 0 && i - arr[pos - 1] > 1) {
                result.push({ _ellipsis: true });
            }
            result.push(pages[i]);
        });

        return { prev, next, items: result };
    }

    function handleMarkRead(id, currentStatus) {
        router.patch(`/panel/feedback/${id}/mark-read`, {
            is_read: !currentStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setViewTarget(prev => {
                    // Jika modal sedang terbuka dan ID-nya cocok, perbarui nilai is_read-nya
                    if (prev && prev.id === id) {
                        return { ...prev, is_read: !currentStatus };
                    }
                    return prev;
                });
                toast.success(
                    currentStatus ? 'Ditandai belum dibaca' : 'Ditandai sudah dibaca',
                    {
                        description: currentStatus ? 'Feedback dikembalikan ke belum dibaca' : 'Feedback berhasil ditandai dibaca',
                        icon: <svg className='size-4 text-prim' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11L11 13L15.5 8.5M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                );
            },
            onError: () => toast.error('Gagal', {
                description: 'Terjadi kesalahan, coba lagi.',
            }),
        });
    }

    function handleDelete() {
        if (deleteTarget === 'bulk') {
            handleBulkDelete();
        } else {
            router.delete(`/panel/feedback/${deleteTarget}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteTarget(null);
                    toast.success('Feedback dihapus', {
                        description: 'Feedback berhasil dihapus secara permanen.',
                    });
                },
                onError: () => toast.error('Gagal', { description: 'Terjadi kesalahan.' }),
            });
        }
    }

    function handleBulkMarkRead() {
        router.post('/panel/feedback/bulk-mark-read', {
            ids: selectAllDb ? [] : selected,
            select_all: selectAllDb,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(selectAllDb
                    ? `Semua feedback ditandai dibaca`
                    : `${selected.length} feedback diperbarui`, {
                    description: 'Feedback telah berhasil ditandai dibaca',
                    icon: <svg className='size-4 text-prim' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L11 13L15.5 8.5M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                });
                clearSelection();
            },
            onError: () => toast.error('Gagal', { description: 'Terjadi kesalahan.' }),
        });
    }

    function handleBulkDelete() {
        router.delete('/panel/feedback/bulk-destroy', {
            data: {
                ids: selectAllDb ? [] : selected,
                select_all: selectAllDb,
            },
            preserveScroll: true,
            onSuccess: () => {
                toast.success(selectAllDb
                    ? `Semua feedback dihapus`
                    : `${selected.length} feedback dihapus`, {
                    description: 'Feedback berhasil dihapus secara permanen.'
                });
                clearSelection();
                setDeleteTarget(null);
            },
            onError: () => toast.error('Gagal', { description: 'Terjadi kesalahan.' }),
        });
    }

    return (
        <>
            <Head title="Feedback" />

            <div>
                <div className="mb-6">
                    <h1 className="text-lg font-semibold text-gray-900">Feedback</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Daftar pesan masuk dari pengguna Nutrizie</p>
                </div>


                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${someSelected ? 'max-h-20 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'
                    }`}>
                    <div className="flex items-center justify-between px-4 py-2.5 bg-prim/5 border border-prim/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            {!selectAllDb ? (
                                <p className="text-xs text-prim">
                                    <span className="font-semibold">{selected.length}</span> feedback di halaman ini dipilih.{' '}
                                    {allSelected && meta.total > data.length && (
                                        <button
                                            onClick={() => setSelectAllDb(true)}
                                            className="underline font-semibold cursor-pointer hover:opacity-75"
                                        >
                                            Pilih semua {meta.total} feedback?
                                        </button>
                                    )}
                                </p>
                            ) : (
                                <p className="text-xs text-prim font-medium">
                                    Semua <span className="font-semibold">{meta.total}</span> feedback dipilih
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleBulkMarkRead} disabled={allSelectedRead}
                                className="text-xs h-7 px-3 cursor-pointer border-prim/30 text-prim hover:text-prim hover:bg-prim/5 disabled:cursor-not-allowed">
                                Tandai Dibaca
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setDeleteTarget('bulk')}
                                className="text-xs h-7 px-3 cursor-pointer border-red-200 text-red-500 hover:text-red-500 hover:bg-red-50">
                                Hapus
                            </Button>
                            <button onClick={() => setSelected([])}
                                className="text-xs text-gray-400 hover:text-gray-600 ml-1 cursor-pointer">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10 text-center">
                                    <Checkbox
                                        checked={allSelected}
                                        onCheckedChange={toggleAll}
                                        className="cursor-pointer data-[state=checked]:bg-prim data-[state=checked]:border-prim"
                                    />
                                </TableHead>
                                <TableHead className="text-xs font-medium text-center">No</TableHead>
                                <TableHead className="text-xs font-medium text-center">Email</TableHead>
                                <TableHead className="text-xs font-medium text-center">Pesan</TableHead>
                                <TableHead className="text-xs font-medium text-center">Status</TableHead>
                                <TableHead className="text-xs font-medium text-center">Dikirim</TableHead>
                                <TableHead className="text-xs font-medium text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-sm text-gray-400 py-10">
                                        Belum ada feedback masuk.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((fb, index) => (
                                    <TableRow key={fb.id}>
                                        <TableCell className="text-center">
                                            <Checkbox
                                                checked={selected.includes(fb.id)}
                                                onCheckedChange={() => toggleOne(fb.id)}
                                                className="cursor-pointer data-[state=checked]:bg-prim data-[state=checked]:border-prim"
                                            />
                                        </TableCell>
                                        <TableCell className="text-gray-400 text-xs text-center">
                                            {(meta.current_page - 1) * meta.per_page + index + 1}
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-600 text-center">
                                            {fb.email}
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-500 max-w-[200px] text-center">
                                            <p className="truncate">{fb.pesan}</p>
                                        </TableCell>
                                        <TableCell className="text-xs text-center">
                                            <Badge
                                                size="sm"
                                                variant="secondary"
                                                className={!fb.is_read
                                                    ? 'border-prim/20 text-prim bg-prim/5'
                                                    : 'border-gray-200 text-gray-400 bg-gray-50'
                                                }
                                            >
                                                {fb.is_read ? 'Dibaca' : 'Belum dibaca'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <p className="text-[11px] text-gray-400">{fb.created_at}</p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                {/* Detail */}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setViewTarget(fb)}
                                                    className="h-7 w-7 p-0 cursor-pointer hover:bg-gray-100"
                                                    title="Lihat detail"
                                                >
                                                    <IconEye />
                                                </Button>
                                                {/* Mark read */}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => !fb.is_read && handleMarkRead(fb.id, fb.is_read)}
                                                    disabled={fb.is_read}
                                                    className="h-7 w-7 p-0 cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed"
                                                    title={fb.is_read ? 'Sudah dibaca' : 'Tandai dibaca'}
                                                >
                                                    <IconMarkRead active={fb.is_read} />
                                                </Button>
                                                {/* Delete */}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setDeleteTarget(fb.id)}
                                                    className="h-7 w-7 p-0 cursor-pointer hover:bg-red-50"
                                                    title="Hapus"
                                                >
                                                    <IconTrash />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {meta?.total > 0 && (
                        <div className="flex w-full items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/30 px-6 py-4">
                            {/* Kiri: Info Penomoran Halaman */}
                            <p className="text-[11px] text-gray-500 shrink-0">
                                Menampilkan <span className="font-semibold text-prim">{meta.from}</span> –{' '}
                                <span className="font-semibold text-prim">{meta.to}</span> dari{' '}
                                <span className="font-semibold text-prim">{meta.total}</span> Data
                            </p>

                            {/* Tengah: Dropdown per_page */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[11px] text-gray-400">Tampilkan</span>
                                <Select
                                    value={String(meta.per_page)}
                                    onValueChange={handlePerPage}
                                >
                                    <SelectTrigger className="h-6 text-xs w-14 px-2 border-gray-200 bg-white rounded-md">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="min-w-20 p-1">
                                        <SelectItem value="5" className="text-[11px]">5</SelectItem>
                                        <SelectItem value="10" className="text-[11px]">10</SelectItem>
                                        <SelectItem value="15" className="text-[11px]">15</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-[11px] text-gray-400">data</span>
                            </div>

                            {/* Kanan: Konten Pagination Shadcn */}
                            {meta?.last_page > 1 && (() => {
                                const { prev, next, items } = buildPageItems(links);
                                const prevDisabled = !prev?.url;
                                const nextDisabled = !next?.url;
                                return (
                                    <Pagination className="w-auto justify-end m-0">
                                        <PaginationContent className="gap-1">
                                            {/* Prev arrow */}
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    size="sm"
                                                    className={prevDisabled ? 'pointer-events-none opacity-40 select-none' : 'cursor-pointer'}
                                                    onClick={() => goToPage(prev?.url)}
                                                />
                                            </PaginationItem>

                                            {/* Page numbers with smart ellipsis */}
                                            {items.map((item, i) =>
                                                item._ellipsis ? (
                                                    <PaginationItem key={`e-${i}`}>
                                                        <PaginationEllipsis />
                                                    </PaginationItem>
                                                ) : (
                                                    <PaginationItem key={item.label}>
                                                        <PaginationLink
                                                            size="xs"
                                                            isActive={item.active}
                                                            className={item.url ? 'cursor-pointer' : 'pointer-events-none opacity-40'}
                                                            onClick={() => goToPage(item.url)}
                                                        >
                                                            {item.label}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            )}

                                            {/* Next arrow */}
                                            <PaginationItem>
                                                <PaginationNext
                                                    size="sm"
                                                    className={nextDisabled ? 'pointer-events-none opacity-40 select-none' : 'cursor-pointer'}
                                                    onClick={() => goToPage(next?.url)}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>

            {/* Dialog detail feedback */}
            <Dialog open={!!viewTarget} onOpenChange={(open) => !open && setViewTarget(null)}>
                <DialogContent className="!w-96 !max-w-96">
                    <DialogHeader>
                        <DialogTitle className="text-sm">Detail Feedback</DialogTitle>
                    </DialogHeader>
                    {viewTarget && (
                        <div className="space-y-1">
                            <div className='flex justify-between items-center'>
                                <div className="flex py-2 space-x-2">
                                    <p className="text-[10px] text-gray-500">Dari :</p>
                                    <p className="text-xs font-medium text-gray-800">{viewTarget.email}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => !viewTarget.is_read && handleMarkRead(viewTarget.id, viewTarget.is_read)}
                                    disabled={viewTarget.is_read}
                                    className="h-7 w-7 p-0 cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <IconMarkRead active={viewTarget.is_read} />
                                </Button>
                            </div>
                            <div className="flex flex-col p-2 rounded-r-lg rounded-bl-lg border border-gray-200 justify-between">
                                <p className="text-[10px] text-gray-500 text-justify leading-relaxed whitespace-pre-wrap">{viewTarget.pesan}</p>
                                <div className="flex items-center justify-end pt-2 space-x-1">
                                    <svg className='w-2 h-2 text-gray-400' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.7 13.5L20.7005 11.5L18.7 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3019 3 18.1885 4.77814 19.7545 7.42909M12 7V12L15 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p className="text-[8px] text-gray-500 text-right">{viewTarget.created_at}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent >
            </Dialog >

            {/* Dialog konfirmasi hapus */}
            <Dialog Dialog open={!!deleteTarget
            } onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent className="!w-80 !max-w-80">
                    <div className="flex flex-col items-center justify-center py-4 space-y-3">
                        <div className="w-fit">
                            <img src={icon} alt="" className='w-20 h-20' />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className="font-semibold text-center text-xs text-gray-800">
                                {deleteTarget === 'bulk'
                                    ? selectAllDb
                                        ? `Hapus semua ${meta.total} feedback?`
                                        : `Hapus ${selected.length} feedback?`
                                    : 'Hapus feedback ini?'
                                }
                            </p>
                            <p className="text-[11px] text-gray-400 text-center">Tindakan ini tidak bisa dikembalikan.</p>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <DialogClose asChild>
                            <Button className="text-xs px-4 cursor-pointer" variant="outline">Batal</Button>
                        </DialogClose>
                        <Button
                            className="text-xs px-4 cursor-pointer"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    );
}

FeedbackIndex.layout = (page) => <PanelLayout>{page}</PanelLayout>;