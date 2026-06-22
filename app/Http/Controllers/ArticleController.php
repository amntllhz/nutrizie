<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //
    public function index(Request $request)
    {
        // Ambil parameter sorting dari request (default: desc)
        $order = $request->get('order', 'desc');

        // Ambil data artikel sesuai urutan
        $articles = Article::orderBy('created_at', $order)->get()->map(function ($article) {
            $article->created_at_human = $article->created_at->diffForHumans();
            return $article;
        });


        // kirim data artikel ke view
        return view('berita', compact('articles'));
    }

    public function show($id)
    {
        // Cari artikel berdasarkan id atau lempar 404 jika tidak ketemu
        $article = Article::findOrFail($id);

        // Ubah tanggal menjadi format diffForHumans
        $article->created_at_human = $article->created_at->diffForHumans();

        // Ambil 3 artikel lain untuk rekomendasi berita terkait
        $beritaTerkait = Article::where('id', '!=', $id)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($item) {
                $item->created_at_human = $item->created_at->diffForHumans();
                return $item;
            });

        // Kirim data artikel utama dan berita terkait ke view
        return view('detail', compact('article', 'beritaTerkait'));
    }
}
