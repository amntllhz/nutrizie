import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';
import PanelLayout from '@/Layout/PanelLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import deleteIcon from '../../../../../public/img/delete.svg';
import EmptyState from '@/components/ui/EmptyState';
import noArtikel from '../../../../../public/img/no-artikel.svg'

function buildPageItems(allLinks) {
    if (!allLinks || allLinks.length < 3) return { prev: null, next: null, items: [] };
    const prev = allLinks[0], next = allLinks[allLinks.length - 1];
    const pages = allLinks.slice(1, -1), total = pages.length;
    if (total <= 3) return { prev, next, items: pages };
    const curIdx = pages.findIndex(l => l.active);
    if (curIdx === -1) return { prev, next, items: pages };
    const show = new Set();
    [0, total - 1, curIdx - 1, curIdx, curIdx + 1].filter(i => i >= 0 && i < total).forEach(i => show.add(i));
    const result = [];
    [...show].sort((a, b) => a - b).forEach((i, pos, arr) => {
        if (pos > 0 && i - arr[pos - 1] > 1) result.push({ _ellipsis: true });
        result.push(pages[i]);
    });
    return { prev, next, items: result };
}

function useFlashToast() {
    const { flash = {} } = usePage().props;
    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);
}

export default function PanduanIndex({ panduans, filters }) {
    const data = panduans?.data || [];
    const meta = panduans?.meta || {};
    const links = panduans?.meta?.links || [];
    const icon = deleteIcon;

    const [selected, setSelected] = useState([]);
    const [selectAllDb, setSelectAllDb] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch] = useState(filters?.search || '');
    const searchTimer = useRef(null);

    useFlashToast();
    useEffect(() => { setSelected([]); }, [meta.current_page]);

    const allIds = data.map(p => p.id);
    const allSelected = allIds.length > 0 && allIds.every(id => selected.includes(id));
    const someSelected = selected.length > 0;

    function toggleAll() { setSelected(allSelected ? [] : allIds); }
    function toggleOne(id) { setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]); }
    function clearSelection() { setSelected([]); }

    function goToPage(url) {
        if (!url) return;
        const u = new URL(url);
        router.get(u.pathname + u.search, {}, { preserveScroll: true });
    }

    function handlePerPage(value) {
        router.get('/panel/panduan', { per_page: value, search }, { preserveScroll: true });
    }

    function handleSearch(e) {
        const val = e.target.value;
        setSearch(val);
        clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            router.get('/panel/panduan', { search: val, per_page: meta.per_page }, { preserveScroll: true });
        }, 400);
    }

    function handleDelete() {
        if (deleteTarget === 'bulk') {
            router.delete('/panel/panduan/bulk-destroy', {
                data: { ids: selectAllDb ? [] : selected, select_all: selectAllDb },
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(selectAllDb ? 'Semua data dihapus' : `${selected.length} data dihapus`, {
                        description: 'Beberapa data berhasil dihapus dari database',
                        icon: <svg className='size-4 text-red-500' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z" opacity="0.2"></path><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                    });
                    clearSelection();
                    setDeleteTarget(null);
                },
                onError: () => toast.error('Gagal', { description: 'Terjadi kesalahan.' }),
            });
        } else {
            router.delete(`/panel/panduan/${deleteTarget}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Panduan Gizi dihapus', {
                        description: 'Data berhasil dihapus dari database',
                        icon: <svg className='size-4 text-red-500' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z" opacity="0.2"></path><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                    });
                    setDeleteTarget(null);
                },
                onError: () => toast.error('Gagal', { description: 'Terjadi kesalahan.' }),
            });
        }
    }

    return (
        <>
            <Head title="Panduan Gizi" />
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Panduan Gizi</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Kelola buku panduan gizi yang tersedia.</p>
                    </div>
                </div>

                {/* Bulk action bar */}
                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${someSelected ? 'max-h-20 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'}`}>
                    <div className="flex items-center justify-between px-4 py-2.5 bg-prim/5 border border-prim/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            {!selectAllDb ? (
                                <p className="text-xs text-prim">
                                    <span className="font-semibold">{selected.length}</span> artikel dipilih{' '}
                                    {allSelected && meta.total > data.length && (
                                        <button onClick={() => setSelectAllDb(true)}
                                            className="underline font-semibold cursor-pointer hover:opacity-75">
                                            Pilih semua {meta.total} artikel?
                                        </button>
                                    )}
                                </p>
                            ) : (
                                <p className="text-xs text-prim font-medium">
                                    Semua <span className="font-semibold">{meta.total}</span> artikel dipilih
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm"
                                onClick={() => setDeleteTarget('bulk')}
                                className="text-xs h-7 px-3 cursor-pointer border-red-200 text-red-500 hover:bg-red-50">
                                Hapus
                            </Button>
                            <button onClick={clearSelection}
                                className="text-xs text-gray-400 hover:text-gray-600 ml-1 cursor-pointer">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-3 flex justify-between items-center">
                    <div className="relative flex items-center w-full max-w-xs">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-300">
                            <svg className="w-4 h-4" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <input type="text" value={search} onChange={handleSearch}
                            placeholder="Tuliskan judul panduan gizi..."
                            className="w-full pl-9 pr-7 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-prim focus:border-prim placeholder-gray-300" />
                        {search && (
                            <button type="button" onClick={() => { setSearch(''); router.get('/panel/panduan', { per_page: meta.per_page }, { preserveScroll: true }); }}
                                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-300 hover:text-gray-500 cursor-pointer">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <Link href="/panel/panduan/create">
                        <Button size="sm" className="text-xs py-4 pr-4 cursor-pointer bg-prim hover:bg-gratwo">
                            <svg className='w-4 h-4' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Tambah Panduan
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10 text-center">
                                    <Checkbox checked={allSelected} onCheckedChange={toggleAll}
                                        className="cursor-pointer data-[state=checked]:bg-prim data-[state=checked]:border-prim" />
                                </TableHead>
                                <TableHead className="text-xs font-medium w-10 text-center">No</TableHead>
                                <TableHead className="text-xs font-medium w-16 text-center">Cover</TableHead>
                                <TableHead className="text-xs font-medium text-center">Judul</TableHead>
                                <TableHead className="text-xs font-medium text-center">Penerbit</TableHead>
                                <TableHead className="text-xs font-medium text-center">Tahun</TableHead>
                                <TableHead className="text-xs font-medium text-center">Halaman</TableHead>
                                <TableHead className="text-xs font-medium text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-sm text-gray-400 py-4">
                                        {search ?
                                            <EmptyState label="Panduan Gizi tidak ditemukan" message={`Tidak ada data dengan kata kunci "${search}".`} icon={noArtikel} />
                                            :
                                            <EmptyState label="Panduan Gizi belum tersedia" message="Silahkan buat panduan gizi pertamamu" icon={noArtikel} />}
                                    </TableCell>
                                </TableRow>
                            ) : data.map((p, index) => (
                                <TableRow key={p.id} className={selected.includes(p.id) ? 'bg-prim/5' : ''}>
                                    <TableCell className="text-center">
                                        <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggleOne(p.id)}
                                            className="cursor-pointer data-[state=checked]:bg-prim data-[state=checked]:border-prim" />
                                    </TableCell>
                                    <TableCell className="text-gray-400 text-xs text-center">
                                        {(meta.current_page - 1) * meta.per_page + index + 1}
                                    </TableCell>
                                    <TableCell className="flex items-center justify-center">
                                        {p.cover ? (
                                            <img src={p.cover} alt={p.judul} className="w-10 h-14 object-cover rounded border border-gray-100" />
                                        ) : (
                                            <div className="w-10 h-14 rounded bg-gray-100 flex items-center justify-center">
                                                <span className="text-[9px] text-gray-400">No img</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-800 font-medium max-w-[200px]">
                                        <p className="truncate">{p.judul}</p>
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-500 text-center">
                                        <p className="truncate">{p.penerbit || '-'}</p>
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-500 text-center">{p.tahun_terbit || '-'}</TableCell>
                                    <TableCell className="text-xs text-gray-500 text-center">{p.halaman ? `${p.halaman} hal` : '-'}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link href={`/panel/panduan/${p.id}/edit`}>
                                                <Button variant="outline" size="sm" className="h-7 w-7 p-0 cursor-pointer hover:bg-gray-100" title="Edit">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(p.id)}
                                                className="h-7 w-7 p-0 cursor-pointer hover:bg-red-50" title="Hapus">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-400">
                                                    <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {meta?.total > 0 && (
                        <div className="flex w-full items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/30 px-6 py-4">
                            <p className="text-[11px] text-gray-500 shrink-0">
                                Menampilkan <span className="font-semibold text-prim">{meta.from}</span> – <span className="font-semibold text-prim">{meta.to}</span> dari <span className="font-semibold text-prim">{meta.total}</span> panduan
                            </p>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[11px] text-gray-400">Tampilkan</span>
                                <Select value={String(meta.per_page)} onValueChange={handlePerPage}>
                                    <SelectTrigger className="h-6 text-xs w-14 px-2 border-gray-200 bg-white rounded-md"><SelectValue /></SelectTrigger>
                                    <SelectContent position="popper" className="min-w-20 p-1">
                                        <SelectItem value="5" className="text-[11px]">5</SelectItem>
                                        <SelectItem value="10" className="text-[11px]">10</SelectItem>
                                        <SelectItem value="25" className="text-[11px]">25</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-[11px] text-gray-400">data</span>
                            </div>
                            {meta?.last_page > 1 && (() => {
                                const { prev, next, items } = buildPageItems(links);
                                return (
                                    <Pagination className="w-auto justify-end m-0">
                                        <PaginationContent className="gap-1">
                                            <PaginationItem>
                                                <PaginationPrevious size="sm" className={!prev?.url ? 'pointer-events-none opacity-40' : 'cursor-pointer'} onClick={() => goToPage(prev?.url)} />
                                            </PaginationItem>
                                            {items.map((item, i) => item._ellipsis ? (
                                                <PaginationItem key={`e-${i}`}><PaginationEllipsis /></PaginationItem>
                                            ) : (
                                                <PaginationItem key={item.label}>
                                                    <PaginationLink size="xs" isActive={item.active} className={item.url ? 'cursor-pointer' : 'pointer-events-none opacity-40'} onClick={() => goToPage(item.url)}>
                                                        {item.label}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            <PaginationItem>
                                                <PaginationNext size="sm" className={!next?.url ? 'pointer-events-none opacity-40' : 'cursor-pointer'} onClick={() => goToPage(next?.url)} />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent className="!w-80 !max-w-80">
                    <div className="flex flex-col items-center justify-center py-4 space-y-3">
                        <img src={icon} alt="" className="w-20 h-20" />
                        <div className="flex flex-col space-y-1">
                            <p className="font-semibold text-center text-xs text-gray-800">Hapus panduan ini?</p>
                            <p className="text-[11px] text-gray-400 text-center">File cover dan PDF juga akan dihapus.</p>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <DialogClose asChild>
                            <Button className="text-xs px-4 cursor-pointer" variant="outline">Batal</Button>
                        </DialogClose>
                        <Button className="text-xs px-4 cursor-pointer" variant="destructive" onClick={handleDelete}>Hapus</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

PanduanIndex.layout = (page) => <PanelLayout>{page}</PanelLayout>;