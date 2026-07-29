<?php

namespace App\Http\Controllers;

use App\Models\Panduan;
use Illuminate\Http\Request;

class PanduanController extends Controller
{
    //
    public function index(Request $request)
    {
        // Ambil parameter sorting dari request (default: desc)
        $order = $request->get('order', 'desc');
        $search = $request->get('search');

        // Ambil data artikel dengan filter search (opsional) dan urutan
        $panduans = Panduan::when($search, function ($query) use ($search) {
            $query->where('judul', 'like', "%{$search}%")
                ->orWhere('deskripsi', 'like', "%{$search}%");
        })
            ->orderBy('created_at', $order)
            ->get()
            ->map(function ($panduan) {
                $panduan->created_at_human = $panduan->created_at->diffForHumans();
                return $panduan;
            });

        // Jika request AJAX → kembalikan hanya partial kartu artikel
        if ($request->ajax()) {
            return view('partials.panduan-cards', compact('panduans'));
        }


        // kirim data artikel ke view
        return view('panduan', compact('panduans'));
    }

    public function show($id)
    {
        // Cari artikel berdasarkan id atau lempar 404 jika tidak ketemu
        $panduan = Panduan::findOrFail($id);

        // Ubah tanggal menjadi format diffForHumans
        $panduan->created_at_human = $panduan->created_at->diffForHumans();

        // Ambil 3 artikel lain untuk rekomendasi berita terkait
        $panduanTerkait = Panduan::where('id', '!=', $id)
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($item) {
                $item->created_at_human = $item->created_at->diffForHumans();
                return $item;
            });

        // Kirim data artikel utama dan berita terkait ke view
        return view('detail-panduan', compact('panduan', 'panduanTerkait'));
    }
}
