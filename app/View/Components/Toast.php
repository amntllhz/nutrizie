<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Toast extends Component
{
    public string $type;
    public ?string $title;
    public int $duration;

    public function __construct(string $type = 'success', ?string $title = null, int $duration = 4000)
    {
        $this->type = $type;
        $this->title = $title;
        $this->duration = $duration;
    }

    public function render()
    {
        return view('components.toast');
    }
}
