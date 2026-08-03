# Panduan Deploy Frontend Next.js ke Shared Hosting (cPanel / hPanel)

Panduan langkah demi langkah untuk melakukan deploy aplikasi **Frontend Next.js (Portfolio)** ke layanan **Shared Hosting** (seperti cPanel, Hostinger/hPanel, Niagahoster, DomaiNesia, dll).

---

## 📋 Prasyarat Deployment

Sebelum memulai, pastikan Anda telah menyiapkan:
1. Akses masuk ke cPanel / hPanel hosting Anda.
2. Komputer lokal dengan Node.js dan npm terinstal.
3. URL API Backend production (contoh: `https://api.domainanda.com` atau endpoint API live Anda).

---

## 🛠️ LANGKAH 1: Konfigurasi `next.config.ts` untuk Static Export

Untuk shared hosting tanpa server Node.js khusus, metode terbaik dan paling stabil adalah meng-export Next.js menjadi **Static Web Pages (HTML, CSS, JS)**.

Buka file [next.config.ts](file:///Users/cahyaningsekarwuryanto/Downloads/project/portfolio/next.config.ts) di project Anda dan sesuaikan seperti berikut:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Mengaktifkan mode Static HTML Export
  trailingSlash: true, // PENTING: Menghasilkan struktur /profile/index.html agar tidak muncul folder listing
  images: {
    unoptimized: true, // Diperlukan agar komponen <Image /> bekerja pada static export
  },
};

export default nextConfig;
```

> 💡 **Kenapa `trailingSlash: true` sangat penting?**
> Secara default, Next.js meregenerasi halaman `/profile` menjadi file `profile.html`. Di shared hosting Apache, ketika Anda mengakses `domainanda.com/profile`, server mencari direktori `profile/`. Tanpa `trailingSlash: true`, server Apache akan menampilkan daftar isi folder (Directory Index / File Manager). Dengan `trailingSlash: true`, Next.js akan membuat file `out/profile/index.html` sehingga halaman profil langsung terbaca dengan sempurna.

---

## 🌐 LANGKAH 2: Konfigurasi Environment Variable Production

Buat atau edit file `.env.production` di root direktori project `portfolio`:

```ini
NEXT_PUBLIC_API_URL=https://api.domainanda.com
```

> 💡 **Catatan:** Ganti `https://api.domainanda.com` dengan URL domain API backend Anda yang sudah live.

---

## 📦 LANGKAH 3: Build & Export Project Next.js

Buka terminal di komputer lokal Anda, lalu jalankan perintah build:

```bash
npm run build
```

Setelah proses build selesai dengan sukses:
- Next.js akan menghasilkan folder bernama **`out`** di root direktori project Anda.
- Di dalam folder `out/`, halaman profil akan terstruktur sebagai `out/profile/index.html`.

---

## ☁️ LANGKAH 4: Upload File ke Shared Hosting

1. Masuk ke folder `portfolio/out/` di komputer Anda.
2. Pilih seluruh file & folder di dalam folder `out/` *(termasuk file `index.html`, `404.html`, folder `profile/`, dan folder `_next/`)*.
3. Kompres file-file tersebut menjadi satu file ZIP, misal **`frontend-build.zip`**.
4. Masuk ke **cPanel / hPanel** hosting Anda.
5. Buka menu **File Manager**.
6. Masuk ke dalam direktori **`public_html`** (atau direktori root domain utama Anda).
7. Hapus file/folder lama jika ada, lalu **Upload** file `frontend-build.zip` ke folder `public_html`.
8. Klik kanan pada file `frontend-build.zip` lalu pilih **Extract**.
9. Pastikan file `index.html`, folder `profile/`, dan folder `_next/` berada langsung di bawah folder `public_html`.

---

## ⚙️ LANGKAH 5: Konfigurasi `.htaccess` (Mematikan Directory Listing & Routing)

Buat atau edit file **`.htaccess`** di dalam folder `public_html` di cPanel untuk mencegah tampilan daftar folder dan menangani routing:

```apache
# 1. Matikan Directory Listing (Mencegah tampilan folder seperti File Manager)
Options -Indexes

# 2. Tentukan file index default
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 3. Jika direktori memiliki index.html di dalamnya (seperti /profile/), buka index.html
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]

  # 4. Jika file atau direktori fisik ada, gunakan langsung
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # 5. Coba buka file .html jika ada
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]

  # 6. Fallback ke index.html utama untuk SPA
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔍 LANGKAH 6: Pengujian & SSL

1. **Pastikan SSL (HTTPS) Aktif:**
   - Di cPanel/hPanel, pastikan fitur **AutoSSL / Let's Encrypt** sudah diaktifkan untuk domain Anda (`https://domainanda.com`).
2. **Uji Akses Website:**
   - Akses domain Anda di browser: `https://domainanda.com/profile` atau `https://domainanda.com/profile/`
   - Halaman profil sekarang akan tampil normal tanpa muncul tampilan daftar folder/file manager.

---

## ❓ Troubleshooting Masalah Umum

| Masalah | Penyebab | Solusi |
| :--- | :--- | :--- |
| **Keluar daftar folder / File Manager saat buka `/profile`** | Apache membuka direktori `profile/` tetapi tidak menemukan file `index.html` di dalamnya. | 1. Tambahkan `trailingSlash: true` di [next.config.ts](file:///Users/cahyaningsekarwuryanto/Downloads/project/portfolio/next.config.ts) dan build ulang.<br>2. Pastikan file `.htaccess` berisi `Options -Indexes` dan `DirectoryIndex index.html`. |
| **Error 404 saat Refresh Page** | Server hosting tidak mengenali rute client-side Next.js. | Pastikan file `.htaccess` di Langkah 5 sudah terpasang di `public_html`. |
| **Gambar Tidak Muncul** | `unoptimized: true` belum diatur pada `next.config.ts`. | Tambahkan `images: { unoptimized: true }` di `next.config.ts` lalu build ulang. |
| **Error CORS saat Fetch Data** | Backend belum mengizinkan origin frontend. | Di file `config/cors.php` backend, tambahkan domain frontend Anda ke `allowed_origins`. |
