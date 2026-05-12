import { NextResponse } from 'next/server'

type ChatRequest = {
  message?: unknown
  pathname?: unknown
  lang?: unknown
}

function normalize(input: string) {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

function isLang(value: unknown): value is 'id' | 'en' {
  return value === 'id' || value === 'en'
}

function inScope(q: string) {
  const keywords = [
    'dwp',
    'dwi kusuma',
    'kusuma perkasa',
    'asuransi',
    'bank garansi',
    'bank guarantee',
    'surety',
    'surety bond',
    'custom bond',
    'premi',
    'biaya',
    'harga',
    'produk',
    'layanan',
    'mitra',
    'partner',
    'kontak',
    'hubungi',
    'whatsapp',
    'cabang',
    'alamat',
    'kantor',
    'kalkulator',
  ]
  const greetings = ['halo', 'hai', 'hi', 'hello', 'pagi', 'siang', 'sore', 'malam']
  return keywords.some((k) => q.includes(k)) || greetings.some((k) => q === k || q.startsWith(`${k} `))
}

function pickService(q: string): 'bg' | 'sb' | 'cb' | 'general' | null {
  if (q.includes('bank garansi') || q.includes('bank guarantee')) return 'bg'
  if (q.includes('surety')) return 'sb'
  if (q.includes('custom bond')) return 'cb'
  if (q.includes('asuransi umum') || q.includes('general insurance')) return 'general'
  return null
}

export async function POST(request: Request) {
  let body: ChatRequest
  try {
    body = (await request.json()) as ChatRequest
  } catch {
    return NextResponse.json({ reply: 'Invalid request.' }, { status: 400 })
  }

  const lang = isLang(body.lang) ? body.lang : 'id'
  const isID = lang === 'id'
  const messageRaw = typeof body.message === 'string' ? body.message : ''
  const message = messageRaw.trim()
  const q = normalize(message)

  if (!message || message.length > 2000) {
    return NextResponse.json(
      { reply: isID ? 'Pesan tidak valid.' : 'Invalid message.' },
      { status: 400 },
    )
  }

  if (!inScope(q)) {
    return NextResponse.json({
      reply: isID
        ? 'Saya hanya bisa menjawab pertanyaan seputar website DWP (produk/layanan, kalkulator premi, mitra, cabang, dan kontak). Silakan tanyakan hal terkait DWP.'
        : 'I can only answer questions about the DWP website (services, premium calculator, partners, branches, and contact). Please ask something related to DWP.',
    })
  }

  const dictModule = await (lang === 'id'
    ? import('@/dictionaries/id.json')
    : import('@/dictionaries/en.json'))
  const dict = dictModule.default as {
    navigation?: Record<string, string>
    about?: { page?: { branches_list?: Array<{ name: string; address: string; phone: string }> } }
  }

  const branches = dict.about?.page?.branches_list ?? []
  const service = pickService(q)

  if (
    q.includes('premi') ||
    q.includes('biaya') ||
    q.includes('harga') ||
    q.includes('kalkulator')
  ) {
    return NextResponse.json({
      reply: isID
        ? [
            'Untuk estimasi premi, gunakan menu “Kalkulator Premi”.',
            'Isi: jenis layanan, nilai pertanggungan, durasi (hari/bulan), risk level, admin fee (opsional), dan diskon (opsional).',
            'Catatan: Hasil ini estimasi. Premi final mengikuti verifikasi dan ketentuan perusahaan.',
          ].join('\n')
        : [
            'For a premium estimate, use the “Premium Calculator” menu.',
            'Fill in: service type, coverage amount, duration (days/months), risk level, admin fee (optional), and discount (optional).',
            'Note: This is an estimate. Final premium depends on verification and company policy.',
          ].join('\n'),
    })
  }

  if (q.includes('cabang') || q.includes('alamat') || q.includes('kantor')) {
    const top = branches.slice(0, 6)
    const lines =
      top.length > 0
        ? top.map((b) => `- ${b.name} — ${b.address} (${b.phone})`).join('\n')
        : isID
          ? '- Data cabang belum tersedia.'
          : '- Branch data is not available.'
    return NextResponse.json({
      reply: isID
        ? [
            'Berikut beberapa cabang DWP:',
            lines,
            'Untuk daftar lengkap, buka halaman “Tentang Kami” dan gunakan pencarian di section Data Cabang.',
          ].join('\n')
        : [
            'Here are some DWP branches:',
            lines,
            'For the full list, open the “About” page and use the search in the Branches section.',
          ].join('\n'),
    })
  }

  if (q.includes('mitra') || q.includes('partner')) {
    return NextResponse.json({
      reply: isID
        ? 'Daftar mitra asuransi dan bank ada di menu “Mitra Kami”. Jika Anda sebutkan kebutuhan Anda, saya bisa bantu arahkan mitra yang paling relevan.'
        : 'You can find the list of insurance and bank partners in “Our Partners”. If you share your needs, I can suggest the most relevant partners.',
    })
  }

  if (q.includes('kontak') || q.includes('hubungi') || q.includes('whatsapp')) {
    return NextResponse.json({
      reply: isID
        ? 'Untuk konsultasi, buka menu “Kontak Kami” atau klik tombol WhatsApp di kanan bawah.'
        : 'For consultation, open “Contact Us” or click the WhatsApp button on the bottom-right.',
    })
  }

  if (service === 'bg') {
    return NextResponse.json({
      reply: isID
        ? [
            'Bank Garansi membantu menjamin kewajiban dalam proyek/kontrak (mis. penawaran, pelaksanaan, pemeliharaan).',
            'Jika Anda beri nilai jaminan dan durasi, saya bisa bantu estimasi lewat Kalkulator Premi.',
          ].join('\n')
        : [
            'A Bank Guarantee helps secure obligations in a project/contract (bid bond, performance, maintenance, etc.).',
            'Share coverage amount and duration, and I can guide you to estimate via the Premium Calculator.',
          ].join('\n'),
    })
  }

  if (service === 'sb') {
    return NextResponse.json({
      reply: isID
        ? [
            'Surety Bond adalah penjaminan untuk kewajiban pihak terjamin kepada obligee dalam suatu pekerjaan/proyek.',
            'Jika Anda beri nilai jaminan dan durasi, saya bisa bantu estimasi lewat Kalkulator Premi.',
          ].join('\n')
        : [
            'A Surety Bond guarantees the principal’s obligation to the obligee for a project/work.',
            'Share coverage amount and duration, and I can guide you to estimate via the Premium Calculator.',
          ].join('\n'),
    })
  }

  if (service === 'cb') {
    return NextResponse.json({
      reply: isID
        ? [
            'Custom Bond biasanya dipakai untuk kebutuhan penjaminan khusus sesuai skema/ketentuan proyek.',
            'Jika Anda jelaskan kebutuhan dan nilainya, saya bisa bantu arahkan langkah berikutnya.',
          ].join('\n')
        : [
            'Custom Bond is typically used for special bonding needs based on the project’s scheme/policy.',
            'If you describe your need and the amount, I can guide the next steps.',
          ].join('\n'),
    })
  }

  if (service === 'general') {
    return NextResponse.json({
      reply: isID
        ? [
            'Asuransi Umum mencakup perlindungan aset/operasional sesuai kebutuhan (mis. properti, kendaraan, dll.).',
            'Beritahu objek yang diasuransikan dan durasi, saya bantu arahkan estimasinya.',
          ].join('\n')
        : [
            'General Insurance covers assets/operations based on your needs (property, vehicles, etc.).',
            'Tell me the insured object and duration, and I will guide the estimate.',
          ].join('\n'),
    })
  }

  return NextResponse.json({
    reply: isID
      ? 'Saya bisa bantu seputar produk/layanan DWP, kalkulator premi, mitra, cabang, dan kontak. Anda ingin info yang mana?'
      : 'I can help with DWP services, premium calculator, partners, branches, and contact. What would you like to know?',
  })
}

