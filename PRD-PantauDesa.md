# Product Requirement Document (PRD) & Design System
## Proyek: PantauDesa (Dasbor WebGIS Transparansi Dana Desa & Partisipasi Publik Berbasis AI)

* **Kompetisi**: Online Hackathon - INCEPTION 2026 (UPN “Veteran” Jawa Timur)
* **Tema Utama**: *Building Resilient Communities Through Human-Centered Digital Innovation*
* **Subtema**: Subtema 5 – *Smart Public Services and Digital Trust*
* **Target MVP**: 24-Hour Build Sprint
* **Tech Stack**: Next.js (App Router), Tailwind CSS, Leaflet/MapLibre (WebGIS), Neon PostgreSQL (Trial: Local Mock Data/JSON), Google Gemini 1.5 Flash (AI Vision)
* **Design Intelligence**: UI/UX Pro Max (*Accessible & Ethical* + *Swiss Functional Minimalism*)

---

## 1. Executive Summary & Problem Statement

### 1.1 Latar Belakang Masalah
Berdasarkan laporan Indonesia Corruption Watch (ICW) 2024, sektor desa menempati urutan pertama kasus korupsi di Indonesia (187 kasus pada tahun 2023). Alokasi Dana Desa (~Rp 1 Miliar/desa/tahun) rentan diselewengkan karena:
1. **Transparansi Pasif & Satu Arah**: Transparansi APBDes hanya dipajang di papan baliho fisik kelurahan atau tabel angka statistik yang tidak dimengerti warga awam.
2. **Ketiadaan Verifikasi Lapangan (Ground-Check Gap)**: Tidak ada jembatan antara *klaim dokumen anggaran* dengan *realita fisik bangunan di lapangan*.
3. **Minimnya Partisipasi Warga**: Rapat Musrenbangdes (Musyawarah Perencanaan Pembangunan Desa) sering kali hanya melibatkan elit desa tanpa representasi suara warga akar rumput.

### 1.2 Solusi PantauDesa
PantauDesa adalah platform *Civic Tech* berbasis peta interaktif (WebGIS) dua arah yang mendigitalkan pengawasan dana desa:
* Mengubah tabel anggaran menjadi **titik koordinat spasial konkret di peta satelit desa**.
* Memfasilitasi **verifikasi crowdsourced warga** (mengunggah foto kondisi nyata proyek).
* Mengintegrasikan **AI Vision (Gemini 1.5 Flash)** untuk memvalidasi keabsahan bukti foto dan mendeteksi anomali kerusakan fisik secara objektif (*Digital Trust*).
* Membuka kanal **Musrenbangdes Digital** untuk mengusulkan dan mem-voting prioritas pembangunan desa.

---

## 2. User Persona & Target Pengguna

| Persona | Peran di Desa | Kebutuhan Utama |
| :--- | :--- | :--- |
| **Warga Desa (Warga Akar Rumput)** | Petani, buruh, pemuda, pedagang | Melihat ke mana uang desa dialokasikan, melaporkan jalan/jembatan rusak, mengusulkan perbaikan di lingkungannya tanpa takut intimidasi. |
| **Badan Permusyawaratan Desa (BPD) / Pengawas** | Lembaga pengawas independen desa | Memeriksa progres fisik proyek dan menindaklanjuti laporan kejanggalan dari warga sebelum LPJ disahkan. |
| **Pemerintah Desa (Kades & Perangkat)** | Pelaksana anggaran | Mempublikasikan akuntabilitas kinerja fisik proyek dan memetakan prioritas aspirasi warga untuk APBDes tahun berikutnya. |

---

## 3. Fitur Utama & Definisi Fungsi (Functional Specifications)

### Modul 1: WebGIS Spatial Dashboard (Peta Interaktif Desa)
* **Tujuan**: Visualisasi spasial proyek pembangunan fisik desa agar mudah dipahami warga awam.
* **Definisi Fungsi**:
  1. `F-1.1 Peta Satelit Interaktif`: Merender peta desa dengan batas wilayah jelas dan lapisan jalan menggunakan OpenStreetMap/Leaflet.
  2. `F-1.2 Pinpoint Marker Proyek`: Setiap proyek fisik ditandai dengan pin berwarna berdasarkan status:
     - 🟢 **Hijau (Selesai)**: Proyek rampung dan telah diverifikasi.
     - 🟡 **Kuning (Berjalan)**: Proyek sedang dalam masa pengerjaan fisik.
     - 🔴 **Merah (Bermasalah / Dilaporkan)**: Terdapat sanggahan atau laporan ketidaksesuaian dari warga.
  3. `F-1.3 Filter Kategori & Status`: Filter peta berdasarkan kategori proyek: *Infrastruktur Jalan & Jembatan*, *Irigasi & Air Bersih*, *Kesehatan/Posyandu*, *Pendidikan/PAUD*.
  4. `F-1.4 Ringkasan Indikator Keuangan (KPI Desa)`: Menampilkan kartu ringkasan: Total Pagu APBDes, Realisasi Fisik (%), Jumlah Titik Proyek, dan Skor Transparansi Desa.

### Modul 2: Rincian Anggaran & Transparansi Proyek (Project Detail Drawer)
* **Tujuan**: Menyediakan data detail proyek saat pin di peta diklik.
* **Definisi Fungsi**:
  1. `F-2.1 Metadata Proyek`: Menampilkan nama kegiatan, tahun anggaran, sumber dana (Dana Desa / PADes / Bantuan Provinsi), pelaksana (TPK - Tim Pelaksana Kegiatan), dan target volume (misal: rabat beton 400 meter).
  2. `F-2.2 Komparasi "Rencana vs Realita"`: Menampilkan foto resmi klaim desa berdampingan dengan foto verifikasi terbaru dari warga.
  3. `F-2.3 Timeline Pengerjaan`: Menampilkan rekam jejak tanggal pencairan termin anggaran dan progres fisik pengerjaan.

### Modul 3: Citizen Ground-Check & Verifikasi Partisipatif
* **Tujuan**: Memungkinkan warga sekitar melakukan audit fisik langsung di lapangan.
* **Definisi Fungsi**:
  1. `F-3.1 Unggah Laporan Kondisi Nyata`: Warga dapat mengambil foto langsung kondisi proyek di lapangan, menambahkan catatan kondisi (misal: "jalan retak", "tukang tidak bekerja 2 bulan"), dan mengirimkan laporan.
  2. `F-3.2 Geofencing/Coordinate Attachment`: Sistem mengaitkan laporan secara otomatis dengan titik koordinat proyek yang sedang dibuka.
  3. `F-3.3 Perlindungan Privasi (Pseudonymous Submission)`: Warga dapat memilih opsi pelaporan anonim (*"Warga Peduli"*) untuk mencegah gesekan sosial dengan aparat desa.
  4. `F-3.4 Konfirmasi Komunitas (Crowdsourced Upvote)`: Warga lain yang melihat laporan tersebut dapat mengklik tombol *"Saya Menyaksikan Hal Serupa (+1)"* untuk memperkuat validitas laporan.

### Modul 4: AI Visual Inspection & Integrity Engine (Gemini 1.5 Flash)
* **Tujuan**: Menyaring laporan palsu/hoaks dan memberikan analisis objektif atas foto bukti fisik.
* **Definisi Fungsi**:
  1. `F-4.1 Deteksi Relevansi Foto`: AI memeriksa apakah foto yang diunggah benar-benar menampilkan infrastruktur (jalan, jembatan, saluran air, gedung) atau gambar acak/tidak relevan.
  2. `F-4.2 Klasifikasi Tingkat Kerusakan (Severity Assessment)`: AI mendeteksi anomali fisik (misal: retakan aspal struktural, lubang, pengerjaan belum selesai) dan memberikan kategori: *Ringan*, *Sedang*, atau *Kritis*.
  3. `F-4.3 Ringkasan Otomatis AI`: AI menghasilkan catatan ringkas 1–2 kalimat yang disematkan pada laporan:
     > *"Terdeteksi jalan aspal dengan retak buaya (alligator cracking) sepanjang ~5 meter. Indikasi kualitas pondasi jalan kurang padat."*
  4. `F-4.4 Penanda Otomatis (Auto-Flagging)`: Jika AI mendeteksi kerusakan tingkat *Kritis* dengan keyakinan >85%, status pin proyek di peta otomatis berubah warna menjadi merah (*Flagged for Review*).

### Modul 5: Musrenbangdes Digital (Usulan Pembangunan Baru oleh Warga)
* **Tujuan**: Mengubah perencanaan desa dari elitis menjadi partisipatif.
* **Definisi Fungsi**:
  1. `F-5.1 Pinpoint Usulan Baru`: Warga dapat mengetuk sembarang titik di peta desa untuk menandai lokasi yang membutuhkan pembangunan (misal: jalan tani becek, jembatan bambu rapuh).
  2. `F-5.2 Formulir Aspirasi Cepat`: Mengisi judul usulan, estimasi penerima manfaat (misal: 40 KK petani), dan unggah foto kondisi saat ini.
  3. `F-5.3 Papan Peringkat Aspirasi Warga (Leaderboard)`: Warga desa dapat memberikan suara (*Upvote*). Usulan dengan dukungan warga terbanyak otomatis masuk ke daftar rekomendasi prioritas RKPDes (Rencana Kerja Pemerintah Desa).

---

## 4. User Flow & Interaksi Utama

### Flow A: Warga Mengaudit Proyek Desa
```text
Buka Web PantauDesa
   └── Pilih Desa di Peta
        └── Klik Pin Proyek (misal: Jembatan Dusun A)
             └── Drawer Detail Terbuka (Lihat Anggaran: Rp 150 Juta)
                  └── Klik "Verifikasi Lapangan"
                       └── Ambil/Upload Foto + Catatan
                            └── AI Gemini Menganalisis Foto (< 3 Detik)
                                 └── Laporan Terbit + Badge Analisis AI Muncul
```

### Flow B: Warga Mengusulkan Proyek Baru
```text
Buka Halaman "Usul Pembangunan"
   └── Ketuk Titik Lokasi Rusak di Peta (Koordinat Otomatis Terisi)
        └── Upload Foto Jalan Rusak + Tulis Kebutuhan
             └── Submit Usulan
                  └── Muncul Pin Usulan Baru di Peta
                       └── Warga Sekitar Memberikan Dukungan (+1 Vote)
```

---

## 5. Design System & UI/UX Specifications (UI/UX Pro Max)

### 5.1 Filosofi Desain
* **Arah Gaya**: *Accessible & Ethical* + *Swiss Functional Minimalism*.
* **Nuansa (Tone)**: *Civic Trust*, Otoritatif, Bersih, Tegas, Tanpa Elemen Dekoratif Sia-sia.
* **Standar Aksesibilitas**: Memenuhi standar WCAG 2.1 Level AA (Kontras teks utama terhadap background minimal 4.5:1, Slate 900 di atas Slate 50 = 14:1).

### 5.2 Token Desain (CSS Custom Properties)
Semua nilai warna, jarak (*spacing*), radius, dan elevasi wajib menggunakan variabel CSS berikut (dilarang menggunakan *magic numbers* atau nilai *hardcoded*).

```css
:root {
  /* Warm Earthy & Pastel Tokens (Natural, Approachable, Human-Centered) */
  --color-background: #FAF9F5;        /* Warm Cream / Natural Canvas */
  --color-foreground: #222925;        /* Deep Warm Charcoal */
  --color-card: #FFFFFF;              /* Kartu & Drawer */
  --color-card-foreground: #222925;
  --color-border: #E8E3DA;            /* Warm Linen Stone */
  --color-border-subtle: #F3EFE9;     /* Soft Sand */
  --color-muted: #F4EFEB;             /* Soft Warm Stone */
  --color-muted-foreground: #6B665D;  /* Earthy Muted Gray */

  /* Civic Earthy Identity: Deep Pine Green & Terracotta */
  --color-primary: #284E3A;           /* Warm Forest / Deep Pine */
  --color-on-primary: #FFFFFF;
  --color-accent: #C25E3B;            /* Terracotta Clay */
  --color-accent-hover: #AF4F2E;
  --color-on-accent: #FFFFFF;

  /* Earthy Semantic Statuses */
  --color-status-success: #2A6B48;    /* Muted Forest Green */
  --color-status-success-bg: #EAF4EE; /* Soft Sage Pastel */
  --color-status-warning: #9C6016;    /* Warm Ochre / Honey */
  --color-status-warning-bg: #FEF7EA; /* Soft Amber Pastel */
  --color-status-danger: #B43E2C;     /* Muted Terracotta Rust */
  --color-status-danger-bg: #FDF0ED;  /* Soft Clay Pastel */

  /* Focus & Accessibility */
  --color-focus-ring: #284E3A;

  /* Skala Spacing (Kelipatan 4px & 8px Disiplin) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Skala Radius (Disiplin & Tidak Agresif, Maksimal 12px) */
  --radius-sm: 4px;    /* Tombol kecil, badge */
  --radius-md: 8px;    /* Input field, kartu proyek */
  --radius-lg: 12px;   /* Modal, floating panel, drawer */
  --radius-full: 9999px; /* Chip pill status saja */

  /* Elevasi (Satu level per komponen, tanpa shadow stacking) */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-panel: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-drawer: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

### 5.3 Tipografi (Maksimal 2 Font Weights per Komponen: 400 & 600)
* **Font Family**: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
* **Skala Ukuran Teks**:
  - `Display / KPI`: `28px` (Font weight: `600`, line-height: `1.2`)
  - `Heading 1`: `24px` (Font weight: `600`, line-height: `1.25`)
  - `Heading 2`: `18px` (Font weight: `600`, line-height: `1.3`)
  - `Body Regular`: `15px` (Font weight: `400`, line-height: `1.5`)
  - `Body Medium`: `15px` (Font weight: `600`, line-height: `1.5`)
  - `Caption / Metadata`: `13px` (Font weight: `400`, line-height: `1.4`)

### 5.4 Spesifikasi Komponen & Layout
1. **Navigasi Utama (Header Bar)**:
   - Logo `PantauDesa` + badge lokasi desa percontohan (*"Desa Sukamaju, Kec. Mojokerto"*).
   - Tepat **1 tombol aksi utama**: `+ Usul Proyek Baru` (Tombol primer gelap, ikon 20px).
2. **Layout Layar Peta (Split / Overlay Layout)**:
   - *Desktop*: Panel kontrol mengambang di sisi kiri (`380px`), peta satelit Leaflet mengisi sisa layar.
   - *Mobile*: Peta memenuhi layar penuh (`min-h-dvh`), drawer geser bawah untuk detail proyek.
3. **Pin Marker Peta**:
   - Berbasis SVG berdiameter `32px` dengan cincin warna status (Hijau, Kuning, Merah).
   - Area klik (*touch target*) minimal 44x44px.
4. **Modal / Drawer Detail Proyek**:
   - Pagu anggaran tercetak besar (`Rp 125.000.000`), pelaksana (TPK), dan tab komparasi: *Rencana Resmi* vs *Bukti Warga*.
   - **Hanya 1 aksi primer per tampilan**: Tombol `Verifikasi Lapangan`.
5. **Formulir Laporan Lapangan & Analisis AI**:
   - Setiap `<label>` wajib terpasang dengan `<input>`/`<textarea>` menggunakan `htmlFor` dan `id`.
   - Pratinjau instan foto yang diunggah (aspect ratio 4:3).
   - Kartu analisis AI Gemini menampilkan tingkat keparahan (*Ringan*, *Sedang*, *Kritis*) dan ringkasan temuan otomatis.

### 5.5 Standar Ikon & Aset Visual
* Menggunakan SVG vector murni (Lucide React atau Phosphor Icons).
* Ukuran ikon konsisten: **20px** untuk tombol & kontrol kontrol; **16px** untuk metadata.
* Ikon dekoratif di samping teks diberi `aria-hidden="true"`.
* Tombol kontrol tanpa teks diberi `aria-label`.

### 5.6 Aturan Anti-Pattern (Wajib Dihindari)
* ❌ Dilarang menggunakan gradien berlebihan pada tombol/latar belakang.
* ❌ Dilarang border-radius agresif (> 16px) pada kontainer persegi panjang.
* ❌ Dilarang animasi berlebih yang memperlambat interaksi warga.
* ❌ Dilarang "Div Soup" — gunakan elemen HTML5 semantik (`<nav>`, `<header>`, `<main>`, `<section>`, `<article>`).
* ❌ Dilarang membuat lebih dari 1 tombol aksi primer per tampilan.

---

## 6. Rancangan Struktur Data (Model Data Lokal / Neon DB)

### 1. `projects` (Titik Proyek Resmi Desa)
* `id`: string/number (PK)
* `title`: string (misal: "Pembangunan Jalan Rabat Beton Dusun Krajan")
* `category`: string ("jalan", "irigasi", "gedung", "air_bersih")
* `budget`: number (misal: 125000000)
* `fiscal_year`: number (2024)
* `status`: enum ("completed", "ongoing", "flagged")
* `latitude`: float (-7.5321)
* `longitude`: float (112.4512)
* `official_photo_url`: string
* `description`: text

### 2. `verifications` (Laporan Audit Fisik Warga)
* `id`: string/number (PK)
* `project_id`: FK -> projects.id
* `citizen_alias`: string ("Warga RT 02")
* `photo_url`: string
* `notes`: text
* `ai_summary`: text (Output analisis Gemini)
* `ai_severity`: enum ("none", "low", "medium", "high")
* `upvotes_count`: number (default: 1)
* `created_at`: timestamp

### 3. `proposals` (Aspirasi Pembangunan Warga)
* `id`: string/number (PK)
* `title`: string (misal: "Pengaspalan Akses Sawah Blok Kidul")
* `description`: text
* `latitude`: float
* `longitude`: float
* `photo_url`: string
* `category`: string
* `upvotes`: number (default: 1)
* `created_at`: timestamp

---

## 7. Cakupan Scope Hackathon (24-Hour Sprint MVP)

| Fitur | Status di MVP 24 Jam | Rencana Pasca-Hackathon |
| :--- | :--- | :--- |
| Peta WebGIS Interaktif (Leaflet) | **Wajib (1 Desa Contoh, 5–6 Titik Proyek)** | Multi-desa se-kabupaten |
| Modal Detail Anggaran | **Wajib** | Integrasi PDF RAB resmi |
| Upload Foto & Form Verifikasi | **Wajib (Local Mock / Cloudinary)** | Integrasi EXIF metadata GPS kamera |
| Analisis AI (Gemini Vision) | **Wajib (Live API call / Fallback)** | Fine-tuned computer vision model |
| Musrenbangdes (Usulan & Vote) | **Wajib (Simulasi upvoting interaktif)** | Verifikasi KTP/NIK via Dukcapil |
| Role Admin Kepala Desa | *Mocked / Read-only untuk demo* | Dashboard analitik internal BPD/Kades |

---

## 8. Keunggulan untuk Pitching (Value Proposition INCEPTION 2026)

1. **Memenuhi Tema "Digital Trust"**: Memulihkan kepercayaan masyarakat desa terhadap pengelolaan dana publik melalui keterbukaan data geospasial dan audit partisipatif.
2. **Kekuatan Visual Panggung**: Peta WebGIS satelit interaktif memberikan dampak visual instan yang memikat dalam video demo 3 menit.
3. **Penerapan AI yang Beralasan Kuat**: AI digunakan bukan sekadar tren/gimmick, melainkan sebagai penilai independen untuk memfilter laporan palsu/hoaks sebelum ditindaklanjuti.
