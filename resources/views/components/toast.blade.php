@php
    // Konfigurasi warna per tipe toast - tambahkan tipe baru di sini kalau perlu
    $colors = [
        'success' => [
            'bg' => 'bg-white',
            'title' => 'text-gray-800',
            'message' => 'text-gray-400',
            'border' => 'border-gray-200',
            'icon' => 'text-prim',
        ],
        'danger' => [
            'bg' => 'bg-white',
            'title' => 'text-gray-800',
            'message' => 'text-gray-400',
            'border' => 'border-gray-200',
            'icon' => 'text-red-500',
        ],
        'warning' => [
            'bg' => 'bg-white',
            'title' => 'text-gray-800',
            'message' => 'text-gray-400',
            'border' => 'border-gray-200',
            'icon' => 'text-amber-500',
        ],
    ];
    $color = $colors[$type] ?? $colors['success'];
@endphp

<div x-data="{ show: false }" x-init="setTimeout(() => show = true, 50);
setTimeout(() => show = false, {{ $duration }})" x-show="show" x-cloak
    x-transition:enter="transition ease-[cubic-bezier(0.16,1,0.3,1)] duration-350"
    x-transition:enter-start="opacity-0 translate-x-6 scale-95"
    x-transition:enter-end="opacity-100 translate-x-0 scale-100"
    x-transition:leave="transition ease-[cubic-bezier(0.4,0,1,1)] duration-200"
    x-transition:leave-start="opacity-100 translate-x-0 scale-100"
    x-transition:leave-end="opacity-0 translate-x-0 scale-95"
    class="fixed top-5 right-5 z-50 flex items-start gap-x-2.5 max-w-sm p-4 rounded-xl border font-in {{ $color['bg'] }} {{ $color['border'] }}">

    {{-- Ikon berbeda per tipe --}}
    @if ($type === 'success')
        <svg class="w-3.5 h-3.5 mt-0.5 flex-shrink-0 {{ $color['icon'] }}" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    @elseif ($type === 'danger')
        <svg class="w-3.5 h-3.5 mt-0.5 flex-shrink-0 {{ $color['icon'] }}" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    @elseif ($type === 'warning')
        <svg class="w-3.5 h-3.5 mt-0.5 flex-shrink-0 {{ $color['icon'] }}" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
                d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
        </svg>
    @endif

    {{-- Title + Message --}}
    <div class="flex-1">
        @if ($title)
            <p class="text-xs font-semibold {{ $color['title'] }} mb-0.5">{{ $title }}</p>
        @endif
        <p class="text-[11px] {{ $color['message'] }}">
            {{ $slot }}
        </p>
    </div>

    {{-- Tombol close --}}
    <button type="button" @click="show = false" class="text-gray-300 hover:text-gray-400 flex-shrink-0">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    </button>
</div>
