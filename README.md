# Loreast - Banyuwangi Tourism Platform

Loreast adalah platform pariwisata digital modern yang dirancang untuk memperkenalkan pesona keindahan alam, budaya, dan ekowisata di Kabupaten Banyuwangi, Jawa Timur. Platform ini menyajikan pengalaman menjelajah destinasi wisata unggulan dengan transisi visual yang mulus, interaktif, dan mendukung multi-bahasa secara real-time.

---

## 🌟 Fitur Utama

1. **Multi-Bahasa (i18n) Real-Time**:
   - Mendukung peralihan bahasa instan antara **Bahasa Indonesia (ID)** dan **Inggris (EN)** menggunakan integrasi `next-intl` berbasis cookie.
   - Perubahan bahasa teraplikasikan langsung ke data destinasi, navigasi, informasi operasional, hingga metadata halaman (SEO friendly).
2. **Smooth Page Transitions & Scrolling**:
   - Transisi halaman grid yang memukau dan sinematik menggunakan **GSAP Timeline**.
   - Pengalaman berselancar halaman yang halus dengan **Lenis Smooth Scroll**.
   - Penanganan navigasi hash/section (smooth scroll ke section tertentu) tanpa tumpang tindih hash di URL browser.
3. **Trip Planner (Vacation Vibes Filter)**:
   - Memudahkan wisatawan untuk menyaring destinasi berdasarkan jenis kategori/vibes liburan (_Volcanic_, _Forest_, _Ocean_, _Sunset_) dengan animasi stagger GSAP.
4. **Interactive Photo Gallery**:
   - Galeri foto interaktif bertipe carousel pada detail destinasi yang responsif terhadap aksi swipe pada perangkat mobile.
5. **Interactive Map & Navigation Integration**:
   - Peta lokasi berbasis _Maplibre GL_ terintegrasi.
   - Tombol shortcut untuk langsung membuka navigasi rute di **Google Maps** atau **Waze** berdasarkan koordinat destinasi yang akurat.
6. **Informasi Operasional & HTM Dinamis**:
   - Menampilkan status tempat wisata secara real-time ("Buka" atau "Tutup") berdasarkan jam saat ini.
   - Informasi harga tiket masuk (HTM) yang terpisah antara wisatawan domestik dan mancanegara secara dinamis.

---

## 🛠️ Tech Stack

Platform ini dibangun menggunakan teknologi modern berkinerja tinggi:

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router) & [React](https://react.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation Libraries**:
  - [GSAP](https://gsap.com/) (GreenSock Animation Platform) & `@gsap/react`
  - [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis Scroll](https://lenis.darkroom.engineering/)
- **Internationalization (i18n)**: [next-intl](https://next-intl-docs.vercel.app/)
- **Media Delivery**: [Cloudinary](https://cloudinary.com/) (menggunakan `next-cloudinary` untuk optimasi gambar & video streaming berkecepatan tinggi)
- **Map Engine**: [Maplibre GL](https://maplibre.org/)

---

## 🚀 Cara Menjalankan Project Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan project di komputer Anda:

### 1. Prasyarat (Prerequisites)

Pastikan Anda sudah menginstal node environment dan package manager berikut:

- **Node.js** (versi 18 ke atas)
- **Bun** (direkomendasikan, karena project ini menggunakan `bun.lock`) atau **npm**

### 2. Clone Repository

Clone project dari GitHub menggunakan perintah berikut:

```bash
git clone https://github.com/d4goat/comp-sci.git
cd comp-sci
```

### 3. Setup Environment Variables (.env)

Buat sebuah file bernama `.env` di root direktori project, lalu isi variabel lingkungan berikut:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=divkjbs7y
```

### 4. Install Dependencies

Instal semua package yang dibutuhkan menggunakan **Bun**:

```bash
bun install
```

_Atau jika menggunakan **npm** (opsional):_

```bash
npm install
```

### 5. Jalankan Development Server

Mulai server lokal Anda untuk melihat project secara langsung:

```bash
bun run dev
```

_Atau jika menggunakan **npm**:_

```bash
npm run dev
```

Buka browser Anda dan kunjungi [http://localhost:3000](http://localhost:3000). Project siap dijelajahi!

### 6. Build untuk Produksi

Untuk melakukan kompilasi versi produksi:

```bash
bun run build
bun run start
```
