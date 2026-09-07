# ============================================
# Stage 1: Build frontend asset
# ============================================
# Kenapa stage terpisah: Node.js cuma dibutuhin buat COMPILE asset
# (React/Vite jadi HTML/CSS/JS statis). Setelah itu Node ga kepake lagi.
# Kalo digabung ke image final, Node runtime numpang ~150MB tanpa guna.
FROM node:22-alpine AS frontend
WORKDIR /app

# Copy package.json duluan (bukan semua file) → manfaatin cache layer.
# Kalo cuma ubah kode (bukan nambah dependency), Docker skip "npm ci"
# di build berikutnya karena layer ini dianggap ga berubah.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# ============================================
# Stage 2: Ambil binary Composer
# ============================================
# Composer itu tool PHP, tapi official image "composer:2" bawa PHP
# versi terbarunya sendiri (kadang PHP 8.5), BEDA sama PHP 8.2 yang
# dipake project ini. Kalo langsung dipake sebagai base, composer.lock
# yang di-lock buat PHP 8.2 bakal ditolak (ini penyebab error paling awal).
# Solusi: ambil BINARY-nya doang, pasang di atas PHP versi yang benar.
FROM composer:2 AS composer-bin


# ============================================
# Stage 3: Install dependency PHP (versi PHP disamakan sama runtime)
# ============================================
FROM php:8.2-cli-alpine AS vendor
COPY --from=composer-bin /usr/bin/composer /usr/bin/composer
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction
# --no-dev        : skip package testing/debug (Pest, dll) — ga perlu di production
# --no-scripts    : skip auto-run script Laravel (butuh .env/APP_KEY yang belum ada di sini)
# --no-interaction: jangan nanya apapun secara interaktif, build harus otomatis


# ============================================
# Stage 4: Runtime — image final yang beneran jalan
# ============================================
FROM php:8.2-fpm-alpine
WORKDIR /var/www

# Install compiler + development headers (SEMENTARA), compile ekstensi,
# lalu compiler-nya DIBUANG lagi. Binary hasil compile (.so) tetap ada,
# cuma toolchain compiler-nya yang ga numpang di image final.
RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    oniguruma-dev \
    mariadb-connector-c-dev \
    && docker-php-ext-install pdo_mysql mbstring bcmath \
    && apk del .build-deps

# Ambil HASIL dari stage lain (bukan proses ulang) — inti dari multi-stage.
COPY --from=vendor /app/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build
COPY . .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# www-data = user default yang dipake PHP-FPM buat eksekusi.
# storage/ & bootstrap/cache/ butuh izin tulis (log, cache, session file).
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]