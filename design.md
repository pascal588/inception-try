# Design System & UI/UX Guidelines: PantauDesa (Pastel & Earthy Theme)
**Spesifikasi Desain Berdasarkan UI/UX Pro Max Intelligence & Aturan Tata Desain Native**

* **Produk**: PantauDesa (Dasbor WebGIS Transparansi Dana Desa & Partisipasi Publik)
* **Arah Gaya**: *Earthy Civic Warmth* + *Swiss Functional Minimalism* (User-Friendly, Membumi, Bersahabat)
* **Nuansa (Tone)**: Hangat, Transparan, Alami (Karakter Pedesaan Indonesia), Tidak Kaku, Tanpa Gradien Ungu
* **Standar Aksesibilitas**: WCAG 2.1 Level AA Compliant

---

## 1. Filosofi Desain

PantauDesa dirancang dengan pendekatan **Human-Centered** yang ramah warga:
1. **Membumi & Alami (Earthy Tones)**: Menggunakan warna-warna alam pedesaan (Deep Pine Green, Terracotta Clay, Soft Sage, Warm Sand) yang terasa akrab bagi masyarakat lokal.
2. **Tidak Kaku (Soft & Friendly Layout)**: Menghindari warna hitam pekat birokratik atau abu-abu klinis dingin. Menggunakan latar krem hangat (*warm cream canvas*) dan radius tombol bersahabat (8px–14px).
3. **Bebas Gradien Ungu / AI Slop**: Desain datar berbobot (*solid & tinted surfaces*), tipografi tajam, dan elemen visual yang murni fungsional.

---

## 2. Design Tokens & CSS Custom Properties

```css
:root {
  /* Warm Earthy & Pastel Tokens */
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

  /* Radius Scale */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-full: 9999px;
}
```

---

## 3. Komponen Utama

1. **Header Bar:**
   - Latar: Deep Pine Green (`#20362B`) yang berwibawa namun hangat dan alami.
   - Badge desa: Sage green pill yang ramah (`#2B4638` / `#BEE3CC`).
   - Tombol utama: Terracotta Clay (`#C25E3B`) yang kontras lembut dan menarik perhatian tanpa silau.
2. **Sidebar Kiri (Editorial Clean List):**
   - Latar: Warm cream canvas (`#FAF9F5`).
   - Filter chips: Pastel chips ramah (Sage green untuk selesai, honey amber untuk pengerjaan, soft terracotta untuk temuan).
   - Daftar proyek: Clean list dengan pembatas halus dan angka anggaran tabular.
3. **Peta WebGIS (OSM):**
   - 100% bebas watermark.
   - Pin peta: Tapered Geo-Pin dengan jarum presisi berwarna earthy (Forest green, Ochre, Terracotta).
4. **Drawer Detail Proyek:**
   - Banner pagu anggaran: Warm deep forest (`#233A2D`) dengan angka kontras tinggi.
   - Lembar audit AI: Disajikan dengan gaya laporan teknis lapangan berlatar krem rapi.
