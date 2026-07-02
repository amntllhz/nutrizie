<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Feedback;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Panel/Dashboard', [
            'stats' => [
                'totalArtikel'         => Article::count(),
                'totalFeedback'        => Feedback::count(),
                'feedbackBelumDibaca'  => Feedback::where('is_read', false)->count(),
            ],

            'recentArtikel' => Article::latest()
                ->limit(5)
                ->get(['id', 'judul', 'created_at'])
                ->map(fn($a) => [
                    'id'         => $a->id,
                    'judul'      => $a->judul,
                    'created_at' => $a->created_at->diffForHumans(),
                ]),

            'recentFeedback' => Feedback::latest()
                ->limit(5)
                ->get(['id', 'email', 'pesan', 'is_read', 'created_at'])
                ->map(fn($f) => [
                    'id'         => $f->id,
                    'email'       => $f->email,
                    'pesan'      => $f->pesan,
                    'is_read'    => $f->is_read,
                    'created_at' => $f->created_at->diffForHumans(),
                ]),
        ]);
    }
}
