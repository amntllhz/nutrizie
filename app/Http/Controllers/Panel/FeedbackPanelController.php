<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackPanelController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = in_array((int) $request->query('per_page'), [5, 10, 15])
            ? (int) $request->query('per_page')
            : 5;

        $feedbacks = Feedback::latest()->paginate($perPage)->appends(['per_page' => $perPage]);

        return Inertia::render('Panel/Feedback/Index', [
            'feedbacks' => [
                'data'  => $feedbacks->map(fn($f) => [
                    'id'         => $f->id,
                    'email'      => $f->email,
                    'pesan'      => $f->pesan,
                    'is_read'    => (bool) $f->is_read,
                    'created_at' => $f->created_at->diffForHumans(),
                ]),
                'meta'  => [
                    'current_page' => $feedbacks->currentPage(),
                    'last_page'    => $feedbacks->lastPage(),
                    'per_page'     => $feedbacks->perPage(),
                    'total'        => $feedbacks->total(),
                    'from'         => $feedbacks->firstItem(),
                    'to'           => $feedbacks->lastItem(),
                    'links'        => $feedbacks->linkCollection()->toArray(),
                ],
            ],
        ]);
    }

    public function markRead(Request $request, Feedback $feedback)
    {
        $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $feedback->update(['is_read' => $request->is_read]);

        return back();
    }

    public function bulkMarkRead(Request $request)
    {
        $request->validate([
            'select_all' => 'boolean',
            'ids'        => 'array',
            'ids.*'      => 'integer',
        ]);

        $query = Feedback::where('is_read', false);

        if (!$request->boolean('select_all')) {
            $query->whereIn('id', $request->ids);
        }

        $query->update(['is_read' => true]);

        return back();
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return back();
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'select_all' => 'boolean',
            'ids'        => 'array',
            'ids.*'      => 'integer',
        ]);

        $query = Feedback::query();

        if (!$request->boolean('select_all')) {
            $query->whereIn('id', $request->ids);
        }

        $query->delete();

        return back();
    }
}
