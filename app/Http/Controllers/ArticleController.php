<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //
    public function index(Request $request)
    {
        // Ambil parameter sorting dan search dari request
        $order  = $request->get('order', 'desc');
        $search = $request->get('search');

        // Ambil data artikel dengan filter search (opsional) dan urutan
        $articles = Article::when($search, function ($query) use ($search) {
                $query->where('judul', 'like', "%{$search}%")
                      ->orWhere('konten', 'like', "%{$search}%");
            })
            ->orderBy('created_at', $order)
            ->get()
            ->map(function ($article) {
                $article->created_at_human = $article->created_at->diffForHumans();
                return $article;
            });

        // Jika request AJAX → kembalikan hanya partial kartu artikel
        if ($request->ajax()) {
            return view('partials.artikel-cards', compact('articles'));
        }

        // Kirim data artikel ke view utama
        return view('artikel', compact('articles'));
    }

    public function show($id)
    {
        // Cari artikel berdasarkan id atau lempar 404 jika tidak ketemu
        $article = Article::findOrFail($id);

        // Ubah tanggal menjadi format diffForHumans
        $article->created_at_human = $article->created_at->diffForHumans();

        // Ambil 3 artikel lain untuk rekomendasi berita terkait
        $artikelTerkait = Article::where('id', '!=', $id)
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($item) {
                $item->created_at_human = $item->created_at->diffForHumans();
                return $item;
            });

        // Kirim data artikel utama dan berita terkait ke view
        return view('detail-artikel', compact('article', 'artikelTerkait'));
    }
}
