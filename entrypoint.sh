#!/bin/sh
set -e

# Generate APP_KEY cuma kalo belum ada isinya — cegah key ke-generate ulang
# tiap restart (yang bakal bikin semua session/encrypted data lama ga valid lagi)
if [ -z "$(grep '^APP_KEY=.\+' .env)" ]; then
    php artisan key:generate --force
fi

# Migrate aman dijalanin berkali-kali — Laravel skip migration yang udah pernah jalan
php artisan migrate --force

# Symlink storage, tapi cek dulu biar ga error kalo udah ada (misal dari run sebelumnya)
if [ ! -L "public/storage" ]; then
    php artisan storage:link
fi

# Permission — wajib tiap start, karena volume yang baru di-mount
# defaultnya root-owned, PHP-FPM jalan sebagai www-data
chown -R www-data:www-data storage bootstrap/cache

# exec "$@" lempar ke command asli (CMD di Dockerfile) — bukan dijalanin manual,
# biar signal (SIGTERM dll) tetep diterima proses utama dgn benar
exec "$@"