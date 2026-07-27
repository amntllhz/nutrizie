<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Panduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PanduanPanelController extends Controller
{
    //
    public function index(Request $request): Response
    {
        $perPage = in_array((int) $request->get('per_page', 5), [5, 10, 25])
            ? (int) $request->get('per_page', 5) : 5;
        $search  = $request->get('search', '');

        /** @var \Illuminate\Pagination\LengthAwarePaginator $panduans */
        $panduans = Panduan::query()
            ->when($search, fn($q) => $q->where('judul', 'like', "%{$search}%"))
            ->latest()
            ->paginate($perPage);

        return Inertia::render('Panel/Panduan/Index', [
            'panduans' => [
                'data' => collect($panduans->items())->map(fn($p) => [
                    'id'           => $p->id,
                    'judul'        => $p->judul,
                    'penerbit'     => $p->penerbit,
                    'tahun_terbit' => $p->tahun_terbit,
                    'halaman'      => $p->halaman,
                    'cover'        => $p->cover ? Storage::url($p->cover) : null,
                    'created_at'   => $p->created_at->diffForHumans(),
                ]),
                'meta' => [
                    'current_page' => $panduans->currentPage(),
                    'last_page'    => $panduans->lastPage(),
                    'per_page'     => $panduans->perPage(),
                    'total'        => $panduans->total(),
                    'from'         => $panduans->firstItem(),
                    'to'           => $panduans->lastItem(),
                    'links'        => $panduans->linkCollection()->toArray(),
                ],
            ],
            'filters' => ['search' => $search, 'per_page' => $perPage],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Panel/Panduan/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'                   => 'required|string|max:255',
            'deskripsi'               => 'nullable|string',
            'penerbit'                => 'nullable|string|max:255',
            'penanggung_jawab'        => 'nullable|string|max:255',
            'tajuk_pengarang'         => 'nullable|string|max:255',
            'tajuk_pengarah_tambahan' => 'nullable|string|max:255',
            'tahun_terbit'            => 'nullable|digits:4|integer',
            'tempat_terbit'           => 'nullable|string|max:255',
            'halaman'                 => 'nullable|integer|min:1',
            'bahasa'                  => 'nullable|string|max:100',
            'isbn'                    => 'nullable|string|max:50',
            'edisi'                   => 'nullable|string|max:100',
            'cover'                   => 'required|image|mimes:jpeg,jpg,png|max:5120',
            'file_pdf'                => 'required|mimes:pdf|max:51200', // 50MB
        ]);

        $validated['cover']    = $request->file('cover')->store('panduan/covers', 'public');
        $validated['file_pdf'] = $request->file('file_pdf')->store('panduan/files', 'public');

        Panduan::create($validated);

        return redirect()->route('panel.panduan.index');
    }

    public function edit(Panduan $panduan): Response
    {
        return Inertia::render('Panel/Panduan/Edit', [
            'panduan' => [
                ...$panduan->toArray(),
                'cover_url'    => $panduan->cover    ? Storage::url($panduan->cover)    : null,
                'file_pdf_url' => $panduan->file_pdf ? Storage::url($panduan->file_pdf) : null,
            ],
        ]);
    }

    public function update(Request $request, Panduan $panduan)
    {
        $validated = $request->validate([
            'judul'                   => 'required|string|max:255',
            'deskripsi'               => 'nullable|string',
            'penerbit'                => 'nullable|string|max:255',
            'penanggung_jawab'        => 'nullable|string|max:255',
            'tajuk_pengarang'         => 'nullable|string|max:255',
            'tajuk_pengarah_tambahan' => 'nullable|string|max:255',
            'tahun_terbit'            => 'nullable|digits:4|integer',
            'tempat_terbit'           => 'nullable|string|max:255',
            'halaman'                 => 'nullable|integer|min:1',
            'bahasa'                  => 'nullable|string|max:100',
            'isbn'                    => 'nullable|string|max:50',
            'edisi'                   => 'nullable|string|max:100',
            'cover'                   => 'nullable|image|mimes:jpeg,jpg,png|max:5120',
            'file_pdf'                => 'nullable|mimes:pdf|max:51200',
        ]);

        if ($request->hasFile('cover')) {
            if ($panduan->cover) Storage::disk('public')->delete($panduan->cover);
            $validated['cover'] = $request->file('cover')->store('panduan/covers', 'public');
        } else {
            unset($validated['cover']);
        }

        if ($request->hasFile('file_pdf')) {
            if ($panduan->file_pdf) Storage::disk('public')->delete($panduan->file_pdf);
            $validated['file_pdf'] = $request->file('file_pdf')->store('panduan/files', 'public');
        } else {
            unset($validated['file_pdf']);
        }

        $panduan->update($validated);

        return redirect()->route('panel.panduan.index');
    }

    public function destroy(Panduan $panduan)
    {
        if ($panduan->cover)    Storage::disk('public')->delete($panduan->cover);
        if ($panduan->file_pdf) Storage::disk('public')->delete($panduan->file_pdf);
        $panduan->delete();

        return back();
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids'        => 'array',
            'select_all' => 'boolean',
            'ids.*'      => 'integer',
        ]);

        $query = Panduan::query();

        if (!$request->boolean('select_all')) {
            $query->whereIn('id', $request->ids);
        }

        $query->get()->each(function ($p) {
            if ($p->cover)    Storage::disk('public')->delete($p->cover);
            if ($p->file_pdf) Storage::disk('public')->delete($p->file_pdf);
        });

        $query->delete();

        return back();
    }
}
