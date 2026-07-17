<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ArticlePanelController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage  = in_array((int) $request->get('per_page', 5), [5, 10, 25]) ? (int) $request->get('per_page', 5) : 5;
        $search   = $request->get('search', '');

        /** @var \Illuminate\Pagination\LengthAwarePaginator $articles */
        $articles = Article::query()
            ->when($search, fn($q) => $q->where('judul', 'like', "%{$search}%"))
            ->latest()
            ->paginate($perPage);

        return Inertia::render('Panel/Article/Index', [
            'articles' => [
                'data' => $articles->map(fn($a) => [
                    'id'         => $a->id,
                    'judul'      => $a->judul,
                    'deskripsi'  => $a->deskripsi,
                    'gambar'     => $a->gambar ? Storage::url($a->gambar) : null,
                    'created_at' => $a->created_at->diffForHumans(),
                ]),
                'meta' => [
                    'current_page' => $articles->currentPage(),
                    'last_page'    => $articles->lastPage(),
                    'per_page'     => $articles->perPage(),
                    'total'        => $articles->total(),
                    'from'         => $articles->firstItem(),
                    'to'           => $articles->lastItem(),
                    'links'        => $articles->linkCollection()->toArray(),
                ],
            ],
            'filters' => ['search' => $search, 'per_page' => $perPage],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Panel/Article/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'     => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'konten'    => 'required|string',
            'gambar'    => 'required|image|mimes:jpeg,jpg,png|max:5120',
        ]);

        $validated['gambar'] = $request->file('gambar')->store('articles', 'public');

        Article::create($validated);

        return redirect()->route('panel.artikel.index');
    }

    public function edit(Article $artikel): Response
    {
        return Inertia::render('Panel/Article/Edit', [
            'article' => [
                'id'         => $artikel->id,
                'judul'      => $artikel->judul,
                'deskripsi'  => $artikel->deskripsi,
                'konten'     => $artikel->konten,
                'gambar'     => $artikel->gambar ? Storage::url($artikel->gambar) : null,
                'gambar_path' => $artikel->gambar,
            ],
        ]);
    }

    public function update(Request $request, Article $artikel)
    {
        $validated = $request->validate([
            'judul'     => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'konten'    => 'required|string',
            'gambar'    => 'nullable|image|mimes:jpeg,jpg,png|max:5120',
        ]);

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama
            if ($artikel->gambar) Storage::disk('public')->delete($artikel->gambar);
            $validated['gambar'] = $request->file('gambar')->store('articles', 'public');
        } else {
            unset($validated['gambar']);
        }

        $artikel->update($validated);

        return redirect()->route('panel.artikel.index');
    }

    public function destroy(Article $artikel)
    {
        if ($artikel->gambar) Storage::disk('public')->delete($artikel->gambar);
        $artikel->delete();

        return back();
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids'        => 'array',
            'select_all' => 'boolean',
            'ids.*'      => 'integer',
        ]);

        $query = Article::query();

        if (!$request->boolean('select_all')) {
            $query->whereIn('id', $request->ids);
        }

        // Hapus gambar masing-masing
        $query->get()->each(function ($a) {
            if ($a->gambar) Storage::disk('public')->delete($a->gambar);
        });

        $query->delete();

        return back();
    }
}
