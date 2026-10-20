# Tasklist & Sprint Backlog: PantauDesa
**Online Hackathon INCEPTION 2026 — 24-Hour Build Sprint**

Dokumen ini memecah pengerjaan **PantauDesa** menjadi **Major Tasks (Prioritas Utama)** dan **Minor Tasks (Penyempurnaan & Polish)**.

---

## 🎯 DAFTAR TASK MAJOR (Semua Selesai & Terverifikasi di Browser)

Task Major adalah 5 pilar utama aplikasi yang menentukan berjalannya nilai produk (*core value*) saat live demo di depan juri.

### [MAJOR 1] Fondasi Proyek, Design Tokens, & Database Lokal
*Status: [x] SELESAI*
- [x] Inisialisasi Next.js (App Router, TypeScript, Tailwind CSS v4, Turbopack).
- [x] Konfigurasi Design Tokens di `globals.css` (CSS Custom Properties: warna Slate 900/Slate 50, status Traffic Light hijau/kuning/merah, skala spacing kelipatan 4/8px, radius max 12px, Leaflet CSS).
- [x] Setup Mock Data Store lokal (`src/data/mock-data.ts`) yang mencakup data tabel `projects`, `verifications`, dan `proposals`.
- [x] Buat struktur data dan tipe TypeScript (`src/types/index.ts`) untuk mengambil data dan menambahkan laporan/usulan baru secara instan.

### [MAJOR 2] Interactive WebGIS Core (Peta Leaflet & Dynamic Pin Markers)
*Status: [x] SELESAI*
- [x] Integrasi Leaflet dengan SSR-safe dynamic import (`next/dynamic` dengan `{ ssr: false }`) untuk mencegah error `window is not defined`.
- [x] Render peta satelit CartoDB Voyager terpusat pada Desa Sukamaju, Kec. Dlanggu, Kab. Mojokerto, Jawa Timur.
- [x] Render pin marker SVG berdiameter 36px untuk setiap proyek desa dengan kode warna status:
  - 🟢 Hijau: Selesai 100%
  - 🟡 Kuning: Pengerjaan Berjalan
  - 🔴 Merah: Dilaporkan Bermasalah / Mangkrak
- [x] Implementasi interaksi klik pin marker yang memicu terbukanya Project Detail Drawer di sisi kanan layar.

### [MAJOR 3] Project Detail Drawer & Komparasi Transparansi
*Status: [x] SELESAI*
- [x] Buat komponen Drawer detail proyek yang menampilkan:
  - Judul proyek, Pagu Anggaran tercetak tebal (misal: `Rp 185.000.000`), pelaksana (TPK), dan sumber dana.
  - Badge status proyek sesuai warna pin.
- [x] Implementasi Tab Komparasi Visual:
  - Tab 1: *Rencana Resmi Desa* (Target fisik & foto klaim arsip desa).
  - Tab 2: *Bukti Lapangan Warga* (Daftar foto dan catatan hasil audit warga sekitar).
- [x] Sediakan tepat 1 tombol aksi primer: `Verifikasi Lapangan` untuk membuka form pelaporan.

### [MAJOR 4] Citizen Ground-Check Form & Integrasi AI Vision (Gemini 1.5 Flash)
*Status: [x] SELESAI*
- [x] Buat formulir pelaporan warga:
  - Input foto kondisi nyata (dengan image preview instan).
  - Pilihan nama samaran/anonim (*"Warga Peduli (Anonim)"*).
  - Catatan kondisi lapangan.
- [x] Buat Route Handler (`/api/verify`) yang mengirimkan gambar ke **Google Gemini 1.5 Flash Vision** (dengan fallback offline heuristic cerdas).
- [x] Prompt AI untuk menghasilkan:
  1. Validasi relevansi foto.
  2. Klasifikasi keparahan (*Ringan*, *Sedang*, *Kritis*).
  3. Ringkasan singkat temuan fisik (misal: *"Retak abutment vertikal jembatan sepanjang 1.2m"*).
- [x] Auto-Flagging: Jika keparahan *Kritis*, status proyek otomatis berubah menjadi **Merah** di peta dan memunculkan badge verifikasi AI.

### [MAJOR 5] Musrenbangdes Digital (Usulan Proyek Baru Warga)
*Status: [x] SELESAI*
- [x] Implementasi mode "Tambah Usulan": Ketika tombol `+ Usul Proyek Baru` aktif, klik pada sembarang titik peta akan menangkap koordinat `latitude` dan `longitude` secara otomatis.
- [x] Form usulan: Judul kebutuhan pembangunan (misal: *"Pengaspalan Jalan Tani"*), estimasi manfaat, dan upload foto jalan rusak.
- [x] Simpan usulan baru ke data lokal dan render pin usulan baru di peta.
- [x] Implementasi tombol interaktif `Dukung (+1 Upvote)` yang dapat diklik oleh warga sekitar (terverifikasi naik dari 32 ke 33 di browser).

---

## 🛠️ DAFTAR TASK MINOR (Semua Selesai & Terverifikasi)

### [MINOR 1] Realisme Mock Data & Kurasi Bukti Visual
- [x] Koordinat GPS realistis untuk Desa Sukamaju, Dlanggu, Mojokerto (`-7.5590, 112.4775`).
- [x] 5 proyek realistis: Jalan Rabat Beton Krajan, Jembatan Sumberjo, Irigasi Tersier, Balai Posyandu, dan Sumur Bor Kangkung.
- [x] Foto resolusi tinggi untuk setiap proyek dan bukti verifikasi warga.

### [MINOR 2] Header Bar & KPI Widget Keuangan Desa
- [x] Header Bar: Logo PantauDesa, badge desa, tombol `Aspirasi Warga`, dan tombol primer `+ Usul Proyek Baru`.
- [x] Panel KPI di sisi kiri peta:
  - Total Pagu APBDes 2024 (`Rp 1.180.000.000`).
  - Realisasi Pembangunan Fisik (`68%`).
  - Total Titik Proyek Terpetakan (`5 Proyek`).
  - Indeks Transparansi Partisipatif (`Tinggi / 88%`).

### [MINOR 3] Filter Kategori Spasial
- [x] Filter kategori cepat: *Semua*, *Jalan & Jembatan*, *Irigasi*, *Fasilitas Sosial*, *Air Bersih*.
- [x] Filter status proyek: *Semua*, *Selesai*, *Berjalan*, *Dilaporkan*.
- [x] Pin di peta otomatis terfilter reaktif sesuai pilihan.

### [MINOR 4] Optimasi Tampilan Mobile & Responsiveness
- [x] Container peta menggunakan viewport `h-dvh` agar tidak tertutup bar navigasi browser HP.
- [x] Drawer detail proyek dan modal responsif di layar ponsel maupun desktop.
- [x] Seluruh tombol memiliki touch target minimal 44x44px.

### [MINOR 5] Standar Aksesibilitas (WCAG) & Polish State
- [x] Atribut `aria-hidden="true"` pada seluruh ikon dekoratif Lucide.
- [x] Outline fokus jelas (`:focus-visible`) untuk navigasi keyboard.
- [x] Loading state dengan spinner saat AI Gemini sedang menganalisis foto.
- [x] Disiplin warna: bebas gradien ungu-pink, kontras teks Slate 900 di atas Slate 50 mencapai 14:1.

### [MINOR 6] Persiapan Berkas Submission Hackathon (Slide 10 & 12)
- [x] Naskah video demo 3 menit disertakan di `README.md`.
- [x] Deklarasi penggunaan AI (Gemini 1.5 Flash API) & Third-Party Library di `README.md`.
- [x] Panduan instalasi dan deployment lokal lengkap di `README.md`.
