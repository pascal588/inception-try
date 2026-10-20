# 🌿 PantauDesa — Dasbor WebGIS Transparansi Dana Desa & Partisipasi Publik Berbasis AI

> **Kompetisi**: Online Hackathon - INCEPTION 2026 (UPN “Veteran” Jawa Timur)  
> **Tema Utama**: *Building Resilient Communities Through Human-Centered Digital Innovation*  
> **Subtema**: Subtema 5 – *Smart Public Services and Digital Trust*  
> **Release Tag**: `submission-24h`

---

## 📌 Ringkasan Eksekutif (Executive Summary)

Menurut data **Indonesia Corruption Watch (ICW) 2024**, sektor desa menempati urutan pertama kasus korupsi di Indonesia (187 kasus pada 2023). Alokasi Dana Desa (~Rp 1 Miliar/desa/tahun) sering kali menjadi objek penyelewengan karena transparansi yang pasif (hanya dipajang di papan baliho fisik kelurahan) dan ketiadaan instrumen bagi warga biasa untuk mengaudit realita fisik di lapangan (*ground-check gap*).

**PantauDesa** adalah platform *Civic Tech* berbasis **WebGIS interaktif dua arah** yang menjembatani dokumen anggaran dengan kondisi fisik di lapangan:
1. **Peta Spasial Proyek Fisik**: Mengubah tabel anggaran akuntansi menjadi titik koordinat konkret di peta satelit desa dengan indikator status lampu lalu lintas (*Traffic Light System*).
2. **Citizen Ground-Check**: Warga sekitar dapat memotret kondisi nyata proyek di lapangan dan mengunggahnya secara terlindungi (anonimitas terjamin).
3. **AI Visual Inspection Engine (Gemini 1.5 Flash)**: Memvalidasi keaslian foto dan menganalisis tingkat anomali/kerusakan fisik secara otomatis untuk menekan fitnah dan laporan palsu (*Digital Trust*).
4. **Musrenbangdes Digital**: Warga dapat mengetuk sembarang titik di peta untuk mengusulkan prioritas pembangunan baru dan saling memberikan dukungan (*upvote*).

---

## 🚀 Fitur Unggulan

* 🗺️ **Interactive WebGIS (Leaflet & CartoDB Voyager)**: Peta beresolusi tinggi dengan render pin marker proyek berbasis status (🟢 Selesai, 🟡 Berjalan, 🔴 Bermasalah).
* 📊 **Panel KPI Keuangan Desa**: Menampilkan total pagu APBDes 2024, persentase realisasi fisik, dan skor transparansi desa.
* ⚖️ **Komparasi Rencana vs Realita**: Drawer interaktif menyandingkan foto arsip klaim resmi desa berdampingan dengan foto audit warga.
* 🤖 **AI-Powered Severity Checker**: Menggunakan Google Gemini 1.5 Flash Vision untuk mendeteksi retak jalan, proyek mangkrak, atau pekerjaan fiktif secara instan.
* 🗳️ **Partisipasi Publik (Musrenbangdes Digital)**: Sistem pinpoint usulan baru langsung di peta desa dengan voting komunitas.

---

## 🛠️ Tech Stack & Arsitektur

* **Framework Frontend**: [Next.js 16 (App Router)](https://nextjs.org/) + TypeScript + React 19
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan Design Tokens (Swiss Functional Minimalism, WCAG 2.1 AA)
* **WebGIS & Spatial Engine**: [Leaflet](https://leafletjs.com/) + CartoDB Voyager Tile Provider
* **AI Vision Engine**: [Google Generative AI (Gemini 1.5 Flash)](https://ai.google.dev/)
* **Iconography**: [Lucide React](https://lucide.dev/) (20px uniform stroke)
* **Data Layer**: Mock Data Store Lokal (Desa Sukamaju, Kab. Mojokerto, Jawa Timur) yang siap migrasi langsung ke Neon PostgreSQL via Drizzle ORM.

---

## 📋 AI Use & Third-Party Declaration (Ketentuan Wajib Slide 10)

Sesuai ketentuan integritas kompetisi INCEPTION 2026:

1. **Deklarasi Penggunaan AI**:
   - **Google Gemini 1.5 Flash API**: Digunakan dalam runtime aplikasi pada modul `/api/verify` untuk melakukan inspeksi visual multimodal terhadap foto bukti lapangan yang dikirim warga (mendeteksi jenis infrastruktur, menilai keparahan anomali fisik, dan menyusun ringkasan temuan objektif).
   - **AI Coding Assistant**: Digunakan selama fase *build sprint* untuk membantu perancangan arsitektur, penulisan antarmuka komponen, dan optimasi aksesibilitas WCAG.
2. **Pustaka Pihak Ketiga (Third-Party Libraries)**:
   - `leaflet` & `@types/leaflet`: Pustaka peta interaktif open-source.
   - `lucide-react`: Kumpulan ikon vector SVG.
   - `@google/generative-ai`: SDK resmi integrasi Gemini API.

---

## 💻 Panduan Menjalankan Secara Lokal (Local Setup)

### Prasyarat:
* Node.js v20+ atau v24+
* npm v10+

### Langkah Instalasi:

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/your-username/pantau-desa.git
   cd pantau-desa
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **(Opsional) Konfigurasi Gemini API Key**:
   Buat file `.env.local` di root direktori jika ingin mengaktifkan inspeksi live Gemini Vision:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Catatan: Jika API key tidak diisi, aplikasi otomatis menggunakan fallback heuristic cerdas untuk uji coba offline tanpa error).*

4. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```

5. **Buka di browser**:
   Akses [http://localhost:3000](http://localhost:3000)

---

## 🎬 Naskah Video Demo Produk (Maksimal 3 Menit)

| Waktu | Segmen Video | Konten & Alur Demo |
| :--- | :--- | :--- |
| **0:00 - 0:30** | *Problem & Evidence* | Menjelaskan latar belakang data ICW 2024 (187 kasus korupsi desa) dan keterbatasan papan baliho fisik desa. |
| **0:30 - 1:15** | *WebGIS Tour & Detail Proyek* | Menunjukkan peta Desa Sukamaju, KPI APBDes Rp 1.18 Miliar, dan mengklik proyek *Pembangunan Jembatan Sumberjo* yang berstatus merah. |
| **1:15 - 2:00** | *AI Ground-Check Demo* | Membuka tab komparasi rencana vs realita, mendemokan upload foto jembatan retak, dan menampilkan hasil verifikasi otomatis Gemini Vision. |
| **2:00 - 2:40** | *Musrenbangdes Digital* | Mengetuk sembarang titik jalan rusak di peta, mendaftarkan usulan baru warga, dan mendemokan penambahan upvote komunitas secara langsung. |
| **2:40 - 3:00** | *Closing & Digital Trust* | Menutup dengan visi PantauDesa dalam mewujudkan ketahanan komunitas (*Resilient Communities*) berbasis kepercayaan digital. |

---

## 👥 Tim Pengembang

* **Online Hackathon INCEPTION 2026**
* Himpunan Mahasiswa Informatika (HIMA IF), Fakultas Ilmu Komputer, UPN “Veteran” Jawa Timur.
