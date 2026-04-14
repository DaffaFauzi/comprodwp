# Spacing System (4px / 8px Baseline)

Dokumen ini menjelaskan sistem spacing yang dipakai untuk Header + Navigation pada website.

## Referensi Pola Spacing (ringkas)

Referensi ini digunakan untuk menyamakan “ritme” visual yang umum pada website/produk perusahaan besar:

- Google (Material Design): 8dp baseline grid dan jarak minimum antar target interaksi. https://m1.material.io/layout/metrics-keylines.html
- Microsoft (Fluent 2): global spacing ramp berbasis 4px, dengan token skala spacing untuk konsistensi. https://fluent2.microsoft.design/layout
- IBM (Carbon): spacing token/scale untuk margin/padding, bisa “jump” di breakpoint. https://v10.carbondesignsystem.com/guidelines/spacing/overview/
- Apple (HIG Layout): menekankan negative space untuk grouping dan ruang cukup untuk elemen penting. https://developer.apple.com/design/human-interface-guidelines/layout
- Best practice spacing (8px grid): 8px baseline umum dipakai, dengan half-step 4px untuk fine tuning. https://www.conceptfusion.co.uk/post/web-design-spacing-and-sizing-best-practices

## Baseline & Token

Baseline utama: 8px, dengan half-step 4px.

Token CSS (dipakai di seluruh proyek):

- `--space-1 = 4px`
- `--space-2 = 8px`
- `--space-3 = 12px`
- `--space-4 = 16px`
- `--space-5 = 20px`
- `--space-6 = 24px`
- `--space-7 = 28px`
- `--space-8 = 32px`
- dst (lihat `src/app/globals.css`)

## Breakpoint

Mengikuti 3 breakpoint utama:

- Mobile: `< 768px`
- Tablet: `768px – 1024px`
- Desktop: `> 1024px`

## Header & Navigation Tokens

Semua dikontrol via CSS variables di `src/app/globals.css`:

- `--layout-page-px`: padding horizontal container
- `--header-py`: padding vertikal header (sesuai ketentuan)
- `--header-min-h`: min-height header supaya stabil
- `--nav-gap`: jarak antar menu item

Nilai default per breakpoint:

### Mobile (<768)

- `--layout-page-px = 16px`
- `--header-py = 12px` (ketentuan 12–16px)
- `--nav-gap = 18px` (ketentuan 16–20px; disiapkan untuk menu mobile)

### Tablet (>=768)

- `--layout-page-px = 24px`
- `--header-py = 16px` (ketentuan desktop 16–24px)
- `--nav-gap = 24px` (ketentuan desktop 24–32px)

### Desktop (>=1024)

- `--layout-page-px = 28px`
- `--header-py = 20px` (ketentuan desktop 16–24px)
- `--nav-gap = 28px` (ketentuan desktop 24–32px)

## A/B Testing Spacing (2 Versi)

Tujuan: membandingkan spacing “default” vs “lebih longgar” untuk melihat dampak pada engagement menu.

- Variant A (default): menggunakan nilai default breakpoint (terutama `--nav-gap = 28px` desktop).
- Variant B: desktop dibuat lebih longgar:
  - `--layout-page-px = 32px`
  - `--header-py = 22px`
  - `--nav-gap = 32px`

Cara memaksa varian:

- `?ab=a` untuk Variant A
- `?ab=b` untuk Variant B

Varian akan disimpan di `localStorage` key `ab-variant`.

## Pengukuran (engagement lokal)

Tanpa integrasi analytics eksternal, metrik disimpan ringan di `localStorage`:

- Key: `ab-metrics:a` atau `ab-metrics:b`
- Event:
  - `click:nav_home`, `click:nav_about`, `click:nav_products`, `click:nav_partners`, `click:nav_contact`
  - `click:cta_consult`
  - `dwell_seconds` (akumulasi durasi kunjungan)

Cara lihat cepat:

- Buka DevTools Console:
  - `localStorage.getItem('ab-metrics:a')`
  - `localStorage.getItem('ab-metrics:b')`

## File yang memakai token spacing

- Header: `src/components/Header.tsx` menggunakan `px-[var(--layout-page-px)]`, `py-[var(--header-py)]`, `gap-[var(--nav-gap)]`
- Token global: `src/app/globals.css`

