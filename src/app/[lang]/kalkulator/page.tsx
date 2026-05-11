'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import SectionHeader from '@/components/SectionHeader'
import {
  calculatePremium,
  premiumCalculatorConfig,
  type DurationUnit,
  type PremiumCalculatorInput,
  type PremiumCalculatorResult,
  type PremiumService,
  type RiskLevel,
} from '@/lib/premiumCalculator'
import { formatIDR, formatNumberID, parseDigitsToNumber } from '@/lib/formatCurrency'
import { Copy, RotateCcw, Send, Sparkles } from 'lucide-react'

type FieldKey =
  | 'service'
  | 'nilaiPertanggungan'
  | 'durasi'
  | 'riskLevel'
  | 'adminFee'
  | 'diskonPersen'

type FieldErrors = Partial<Record<FieldKey, string>>

const serviceOptions: Array<{ value: PremiumService; label: string }> = [
  { value: 'BANK_GARANSI', label: 'Bank Garansi' },
  { value: 'SURETY_BOND', label: 'Surety Bond' },
  { value: 'CUSTOM_BOND', label: 'Custom Bond' },
  { value: 'ASURANSI_UMUM', label: 'Asuransi Umum' },
]

const riskOptions: Array<{ value: RiskLevel; label: string }> = [
  { value: 'RENDAH', label: 'Rendah' },
  { value: 'SEDANG', label: 'Sedang' },
  { value: 'TINGGI', label: 'Tinggi' },
]

function getLang(input: unknown) {
  if (typeof input === 'string') return input
  return 'id'
}

function formatMonths(value: number) {
  if (!Number.isFinite(value)) return '0'
  const rounded = Math.round(value * 100) / 100
  if (Math.abs(rounded - Math.round(rounded)) < 1e-9) return String(Math.round(rounded))
  return String(rounded)
}

function formatRateLabel(service: PremiumService, baseRate: number, periodDivisorMonths: number) {
  const percent = baseRate * 100
  const divisor = periodDivisorMonths
  const pctText = percent % 1 === 0 ? `${percent.toFixed(0)}%` : `${percent.toFixed(2)}%`
  return `${pctText} / ${divisor} bulan`
}

function buildRingkas(
  input: PremiumCalculatorInput,
  result: PremiumCalculatorResult,
  nilaiPertanggungan: number,
  durasiNormalized: string
) {
  const serviceLabel = serviceOptions.find((s) => s.value === input.service)?.label ?? input.service
  const riskLabel = riskOptions.find((r) => r.value === input.riskLevel)?.label ?? input.riskLevel
  const rateLabel = formatRateLabel(input.service, result.baseRate, result.periodDivisorMonths)

  const lines = [
    `Kalkulator Premi (Estimasi)`,
    `Layanan: ${serviceLabel}`,
    `Nilai pertanggungan: ${formatIDR(nilaiPertanggungan)}`,
    `Durasi: ${input.durasi} ${input.durasiUnit} (${durasiNormalized} bulan)`,
    `Rate: ${rateLabel}`,
    `Risk: ${riskLabel} (x${result.riskMultiplier})`,
    `Premi akhir: ${formatIDR(result.premiAkhir)}`,
    `Catatan: Hasil ini estimasi. Premi final mengikuti verifikasi dan ketentuan perusahaan.`,
  ]

  return lines.join('\n')
}

export default function KalkulatorPage() {
  const params = useParams()
  const lang = getLang((params as { lang?: unknown })?.lang)

  const [service, setService] = useState<PremiumService>('BANK_GARANSI')
  const [nilaiPertanggunganText, setNilaiPertanggunganText] = useState('')
  const [durasiText, setDurasiText] = useState('3')
  const [durasiUnit, setDurasiUnit] = useState<DurationUnit>('bulan')
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('RENDAH')
  const [includeAdminFee, setIncludeAdminFee] = useState(false)
  const [adminFeeText, setAdminFeeText] = useState('50000')
  const [diskonPersenText, setDiskonPersenText] = useState('0')
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [result, setResult] = useState<PremiumCalculatorResult | null>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle')

  const nilaiPertanggungan = useMemo(
    () => parseDigitsToNumber(nilaiPertanggunganText),
    [nilaiPertanggunganText]
  )

  const durasi = useMemo(() => {
    const parsed = Number.parseInt(durasiText, 10)
    return Number.isFinite(parsed) ? parsed : 0
  }, [durasiText])

  const adminFee = useMemo(() => parseDigitsToNumber(adminFeeText), [adminFeeText])

  const diskonPersen = useMemo(() => {
    const parsed = Number.parseFloat(diskonPersenText)
    return Number.isFinite(parsed) ? parsed : 0
  }, [diskonPersenText])

  const errors = useMemo((): FieldErrors => {
    const next: FieldErrors = {}

    if (!service) next.service = 'Pilih jenis layanan.'
    if (!Number.isFinite(nilaiPertanggungan) || nilaiPertanggungan <= 0) {
      next.nilaiPertanggungan = 'Nilai pertanggungan harus lebih dari 0.'
    }
    if (!Number.isFinite(durasi) || durasi < 1) next.durasi = 'Durasi minimal 1.'
    if (!riskLevel) next.riskLevel = 'Pilih risk level.'

    if (includeAdminFee && (!Number.isFinite(adminFee) || adminFee < 0)) {
      next.adminFee = 'Biaya administrasi tidak valid.'
    }

    if (!Number.isFinite(diskonPersen) || diskonPersen < 0 || diskonPersen > 100) {
      next.diskonPersen = 'Diskon harus 0–100.'
    }

    return next
  }, [adminFee, diskonPersen, durasi, includeAdminFee, nilaiPertanggungan, riskLevel, service])

  const isValid = Object.keys(errors).length === 0

  const showError = (key: FieldKey) => Boolean(touched[key] && errors[key])

  const markTouched = (key: FieldKey) => {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
  }

  const handleHitung = () => {
    setTouched({
      service: true,
      nilaiPertanggungan: true,
      durasi: true,
      riskLevel: true,
      adminFee: true,
      diskonPersen: true,
    })

    if (!isValid) return

    const input: PremiumCalculatorInput = {
      service,
      nilaiPertanggungan,
      durasi,
      durasiUnit,
      riskLevel,
      includeAdminFee,
      adminFee,
      diskonPersen,
    }

    setResult(calculatePremium(input))
  }

  const handleReset = () => {
    setService('BANK_GARANSI')
    setNilaiPertanggunganText('')
    setDurasiText('3')
    setDurasiUnit('bulan')
    setRiskLevel('RENDAH')
    setIncludeAdminFee(false)
    setAdminFeeText('50000')
    setDiskonPersenText('0')
    setTouched({})
    setResult(null)
    setCopyStatus('idle')
  }

  const durasiNormalizedMonths = useMemo(() => {
    const normalized =
      durasiUnit === 'hari' ? durasi / premiumCalculatorConfig.daysPerMonth : durasi
    return Number.isFinite(normalized) ? Math.max(0, normalized) : 0
  }, [durasi, durasiUnit])

  const ringkasText = useMemo(() => {
    if (!result) return ''
    return buildRingkas(
      {
        service,
        nilaiPertanggungan,
        durasi,
        durasiUnit,
        riskLevel,
        includeAdminFee,
        adminFee,
        diskonPersen,
      },
      result,
      nilaiPertanggungan,
      formatMonths(durasiNormalizedMonths)
    )
  }, [
    adminFee,
    diskonPersen,
    durasi,
    durasiNormalizedMonths,
    durasiUnit,
    includeAdminFee,
    nilaiPertanggungan,
    result,
    riskLevel,
    service,
  ])

  const handleCopy = async () => {
    if (!ringkasText) return
    try {
      await navigator.clipboard.writeText(ringkasText)
      setCopyStatus('copied')
      window.setTimeout(() => setCopyStatus('idle'), 1200)
    } catch {
      setCopyStatus('idle')
    }
  }

  const whatsappHref = useMemo(() => {
    if (!ringkasText) return 'https://wa.me/6281288893223'
    return `https://wa.me/6281288893223?text=${encodeURIComponent(ringkasText)}`
  }, [ringkasText])

  const cardBase =
    'rounded-[40px] border border-slate-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]'
  const labelClass = 'text-sm font-black text-slate-900'
  const inputBase =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-100/50 focus:outline-none focus:ring-2 focus:ring-dwp-blue focus:border-dwp-blue'
  const errorTextClass = 'mt-2 text-xs font-semibold text-red-600'
  const primaryBtn =
    'inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-6 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.22)] hover:shadow-[0_22px_46px_rgba(47,93,170,0.28)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dwp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed'
  const secondaryBtn =
    'inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dwp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white'

  return (
    <div className="bg-white">
      <SectionHeader
        badge="Perhitungan Premi"
        title="Kalkulator Premi"
        subtitle="Hitung estimasi premi dengan cepat berdasarkan jenis layanan dan nilai pertanggungan."
      />

      <section className="py-14 md:py-16 bg-white">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className={`${cardBase} p-6 sm:p-8`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Form Perhitungan</h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Masukkan data, lalu klik <span className="font-bold text-slate-800">Hitung Premi</span>.
                  </p>
                </div>
                <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl bg-dwp-blue/5 border border-dwp-blue/10 text-dwp-blue">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8 grid gap-6">
                <div>
                  <label className={labelClass} htmlFor="service">
                    Jenis Layanan
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value as PremiumService)}
                    onBlur={() => markTouched('service')}
                    className={inputBase}
                  >
                    {serviceOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {showError('service') ? <p className={errorTextClass}>{errors.service}</p> : null}
                </div>

                <div>
                  <label className={labelClass} htmlFor="nilai">
                    Nilai Pertanggungan / Nilai Jaminan
                  </label>
                  <div className="mt-2 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500">
                      Rp
                    </span>
                    <input
                      id="nilai"
                      inputMode="numeric"
                      value={nilaiPertanggunganText ? formatNumberID(nilaiPertanggungan) : ''}
                      onChange={(e) => setNilaiPertanggunganText(e.target.value)}
                      onBlur={() => markTouched('nilaiPertanggungan')}
                      className={`${inputBase} pl-12`}
                      placeholder="0"
                    />
                  </div>
                  {showError('nilaiPertanggungan') ? (
                    <p className={errorTextClass}>{errors.nilaiPertanggungan}</p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="durasi">
                      Durasi
                    </label>
                    <input
                      id="durasi"
                      inputMode="numeric"
                      value={durasiText}
                      onChange={(e) => setDurasiText(e.target.value.replace(/[^\d]/g, ''))}
                      onBlur={() => markTouched('durasi')}
                      className={inputBase}
                      placeholder="1"
                    />
                    {showError('durasi') ? <p className={errorTextClass}>{errors.durasi}</p> : null}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="durasiUnit">
                      Satuan
                    </label>
                    <select
                      id="durasiUnit"
                      value={durasiUnit}
                      onChange={(e) => setDurasiUnit(e.target.value as DurationUnit)}
                      className={inputBase}
                    >
                      <option value="hari">Hari</option>
                      <option value="bulan">Bulan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="risk">
                    Risk Level
                  </label>
                  <select
                    id="risk"
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                    onBlur={() => markTouched('riskLevel')}
                    className={inputBase}
                  >
                    {riskOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {showError('riskLevel') ? <p className={errorTextClass}>{errors.riskLevel}</p> : null}
                </div>

                <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-slate-900">Biaya Administrasi (Opsional)</p>
                      <p className="mt-1 text-xs font-medium text-slate-600">
                        Aktifkan jika ingin menambahkan admin fee.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIncludeAdminFee((v) => !v)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full border transition-colors ${
                        includeAdminFee
                          ? 'bg-dwp-blue border-dwp-blue'
                          : 'bg-white border-slate-200'
                      }`}
                      aria-pressed={includeAdminFee}
                    >
                      <span
                        className={`inline-block h-6 w-6 rounded-full bg-white shadow transition-transform ${
                          includeAdminFee ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {includeAdminFee ? (
                    <div className="mt-4">
                      <label className={labelClass} htmlFor="admin">
                        Nominal Admin Fee
                      </label>
                      <div className="mt-2 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500">
                          Rp
                        </span>
                        <input
                          id="admin"
                          inputMode="numeric"
                          value={adminFeeText ? formatNumberID(adminFee) : ''}
                          onChange={(e) => setAdminFeeText(e.target.value)}
                          onBlur={() => markTouched('adminFee')}
                          className={`${inputBase} pl-12`}
                          placeholder="50000"
                        />
                      </div>
                      {showError('adminFee') ? <p className={errorTextClass}>{errors.adminFee}</p> : null}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className={labelClass} htmlFor="diskon">
                    Diskon (Opsional)
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="diskon"
                      inputMode="decimal"
                      value={diskonPersenText}
                      onChange={(e) => setDiskonPersenText(e.target.value)}
                      onBlur={() => markTouched('diskonPersen')}
                      className={`${inputBase} pr-12`}
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500">
                      %
                    </span>
                  </div>
                  {showError('diskonPersen') ? (
                    <p className={errorTextClass}>{errors.diskonPersen}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={handleHitung} className={primaryBtn} disabled={!isValid}>
                  Hitung Premi
                </button>
                <button type="button" onClick={handleReset} className={secondaryBtn}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>

            <div className={`${cardBase} p-6 sm:p-8`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Hasil Perhitungan</h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Ringkasan dan breakdown estimasi premi.
                  </p>
                </div>
              </div>

              {result ? (
                <div className="mt-8">
                  <div className="rounded-[32px] border border-dwp-blue/10 bg-[linear-gradient(180deg,rgba(47,93,170,0.08)_0%,rgba(44,167,164,0.06)_100%)] p-6">
                    <p className="text-xs font-black uppercase tracking-widest text-dwp-blue/90">
                      Total Premi Akhir
                    </p>
                    <p className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">
                      {formatIDR(result.premiAkhir)}
                    </p>
                    <p className="mt-3 text-sm font-medium text-slate-700">
                      Hasil ini estimasi. Premi final mengikuti verifikasi dan ketentuan perusahaan.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-3xl border border-slate-100 bg-white p-5">
                      <p className="text-sm font-black text-slate-900">Ringkasan</p>
                      <div className="mt-4 grid gap-3 text-sm">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Nilai pertanggungan</span>
                          <span className="text-slate-900 font-black">{formatIDR(nilaiPertanggungan)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Durasi (normalisasi)</span>
                          <span className="text-slate-900 font-black">
                            {durasi} {durasiUnit} → {formatMonths(durasiNormalizedMonths)} bulan
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Rate</span>
                          <span className="text-slate-900 font-black">
                            {formatRateLabel(service, result.baseRate, result.periodDivisorMonths)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Risk multiplier</span>
                          <span className="text-slate-900 font-black">x{result.riskMultiplier}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-100 bg-white p-5">
                      <p className="text-sm font-black text-slate-900">Breakdown</p>
                      <div className="mt-4 grid gap-3 text-sm">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Premi dasar</span>
                          <span className="text-slate-900 font-black">{formatIDR(result.premiDasar)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Premi (setelah risk)</span>
                          <span className="text-slate-900 font-black">{formatIDR(result.premiRisk)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Admin fee</span>
                          <span className="text-slate-900 font-black">
                            {formatIDR(result.adminFeeApplied)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600 font-semibold">Diskon</span>
                          <span className="text-slate-900 font-black">
                            {result.diskonNominal > 0 ? `- ${formatIDR(result.diskonNominal)}` : formatIDR(0)}
                          </span>
                        </div>
                        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                          <span className="text-slate-700 font-black">Total</span>
                          <span className="text-slate-900 font-black">{formatIDR(result.premiAkhir)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button type="button" onClick={handleCopy} className={secondaryBtn}>
                      <Copy className="h-4 w-4 mr-2" />
                      {copyStatus === 'copied' ? 'Tersalin' : 'Salin Ringkasan'}
                    </button>
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className={primaryBtn}>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim ke WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-8 rounded-[36px] border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
                  <p className="text-sm font-semibold text-slate-600">
                    Belum ada hasil. Isi form lalu klik <span className="font-black">Hitung Premi</span>.
                  </p>
                  <a
                    href={`/${lang}/contact`}
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    Butuh bantuan? Kontak Kami
                  </a>
                </div>
              )}

              <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Disclaimer</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Hasil ini estimasi. Premi final mengikuti verifikasi dan ketentuan perusahaan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
