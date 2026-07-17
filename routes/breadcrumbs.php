<?php // routes/breadcrumbs.php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
use Diglactic\Breadcrumbs\Breadcrumbs;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Home
Breadcrumbs::for('beranda', function (BreadcrumbTrail $trail) {
    $trail->push('Beranda', route('beranda'));
});

// Beranda > Profil
Breadcrumbs::for('profil', function (BreadcrumbTrail $trail) {
    $trail->parent('beranda');
    $trail->push('Profil', route('profil'));
});

// Beranda > Visi & Misi
Breadcrumbs::for('visimisi', function (BreadcrumbTrail $trail) {
    $trail->parent('beranda');
    $trail->push('Visi & Misi', route('visimisi'));
});

// Beranda > Kontributor
Breadcrumbs::for('kontributor', function (BreadcrumbTrail $trail) {
    $trail->parent('beranda');
    $trail->push('Kontributor', route('kontributor'));
});

// Beranda > Artikel
Breadcrumbs::for('artikel', function (BreadcrumbTrail $trail) {
    $trail->parent('beranda');
    $trail->push('Artikel', route('artikel'));
});

// Beranda > Artikel > Detail
Breadcrumbs::for('detailartikel', function (BreadcrumbTrail $trail, $article) {
    $trail->parent('artikel'); // Berita
    $trail->push('Detail', route('detailartikel.show', ['id' => $article->id])); // Detail Artikel
});

// Beranda > Cek Gizi
Breadcrumbs::for('cekgizi', function (BreadcrumbTrail $trail) {
    $trail->parent('beranda');
    $trail->push('Cek Gizi', route('cekgizi'));
});

// Beranda > Cek Gizi > Status Gizi
Breadcrumbs::for('hasilgizi', function (BreadcrumbTrail $trail) {
    $trail->parent('cekgizi');
    $trail->push('Status Gizi', route('cekgizi.hitung'));
});
