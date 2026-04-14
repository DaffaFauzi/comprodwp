# Pixel-Perfect (Screenshot) Testing

Dokumen ini menjelaskan cara melakukan screenshot comparison untuk memastikan tampilan sama dengan referensi.

## Setup

1. Install dependency:

```bash
npm install
```

2. Install browser Playwright:

```bash
npx playwright install
```

## Cara Menjalankan

1. Jalankan dev server:

```bash
npm run dev
```

2. Jalankan visual test (snapshot compare):

```bash
npm run test:visual
```

Jika ini pertama kali, snapshot belum ada sehingga akan gagal. Buat baseline snapshot:

```bash
npm run test:visual:update
```

## Target yang di-screenshot

- Hero section: `[data-testid="hero"]`
- Snapshot tersimpan di: `tests/__screenshots__/`

## Catatan Pixel-Perfect

- Untuk hasil stabil, test memaksa reduced motion + mematikan transition/animation.
- Jika ingin membandingkan terhadap screenshot referensi eksternal, letakkan screenshot referensi sebagai baseline snapshot (nama file harus sama: `hero-en.png`, `hero-id.png`), lalu jalankan `npm run test:visual`.

