export type PremiumService = 'BANK_GARANSI' | 'SURETY_BOND' | 'CUSTOM_BOND' | 'ASURANSI_UMUM'
export type RiskLevel = 'RENDAH' | 'SEDANG' | 'TINGGI'
export type DurationUnit = 'hari' | 'bulan'

export type PremiumCalculatorInput = {
  service: PremiumService
  nilaiPertanggungan: number
  durasi: number
  durasiUnit: DurationUnit
  riskLevel: RiskLevel
  includeAdminFee: boolean
  adminFee: number
  diskonPersen: number
}

export type PremiumCalculatorResult = {
  normalizedMonths: number
  period: number
  periodDivisorMonths: number
  baseRate: number
  riskMultiplier: number
  premiDasar: number
  premiRisk: number
  adminFeeApplied: number
  premiSebelumDiskon: number
  diskonNominal: number
  premiAkhir: number
}

export const premiumCalculatorConfig = {
  daysPerMonth: 30,
  serviceRates: {
    BANK_GARANSI: { baseRate: 0.0025, periodDivisorMonths: 3 },
    SURETY_BOND: { baseRate: 0.003, periodDivisorMonths: 3 },
    CUSTOM_BOND: { baseRate: 0.0035, periodDivisorMonths: 3 },
    ASURANSI_UMUM: { baseRate: 0.004, periodDivisorMonths: 12 },
  } satisfies Record<PremiumService, { baseRate: number; periodDivisorMonths: number }>,
  riskMultipliers: {
    RENDAH: 1.0,
    SEDANG: 1.2,
    TINGGI: 1.5,
  } satisfies Record<RiskLevel, number>,
} as const

function toFiniteNumber(value: number) {
  return Number.isFinite(value) ? value : 0
}

function clamp(value: number, min: number, max: number) {
  const v = toFiniteNumber(value)
  if (v < min) return min
  if (v > max) return max
  return v
}

function roundRupiah(value: number) {
  const v = toFiniteNumber(value)
  return Math.round(v)
}

export function calculatePremium(input: PremiumCalculatorInput): PremiumCalculatorResult {
  const nilaiPertanggungan = Math.max(0, toFiniteNumber(input.nilaiPertanggungan))
  const durasi = Math.max(0, toFiniteNumber(input.durasi))
  const includeAdminFee = Boolean(input.includeAdminFee)
  const adminFee = Math.max(0, toFiniteNumber(input.adminFee))
  const diskonPersen = clamp(input.diskonPersen, 0, 100)

  const serviceConfig = premiumCalculatorConfig.serviceRates[input.service]
  const baseRate = serviceConfig.baseRate
  const periodDivisorMonths = serviceConfig.periodDivisorMonths
  const riskMultiplier = premiumCalculatorConfig.riskMultipliers[input.riskLevel]

  const normalizedMonths =
    input.durasiUnit === 'hari'
      ? durasi / premiumCalculatorConfig.daysPerMonth
      : durasi

  const safeMonths = Math.max(0, toFiniteNumber(normalizedMonths))
  const period = periodDivisorMonths > 0 ? safeMonths / periodDivisorMonths : 0

  const premiDasar = nilaiPertanggungan * baseRate * period
  const premiRisk = premiDasar * riskMultiplier
  const adminFeeApplied = includeAdminFee ? adminFee : 0
  const premiSebelumDiskon = premiRisk + adminFeeApplied
  const diskonNominal = premiSebelumDiskon * (diskonPersen / 100)
  const premiAkhir = premiSebelumDiskon - diskonNominal

  return {
    normalizedMonths: toFiniteNumber(safeMonths),
    period: toFiniteNumber(period),
    periodDivisorMonths,
    baseRate,
    riskMultiplier,
    premiDasar: roundRupiah(premiDasar),
    premiRisk: roundRupiah(premiRisk),
    adminFeeApplied: roundRupiah(adminFeeApplied),
    premiSebelumDiskon: roundRupiah(premiSebelumDiskon),
    diskonNominal: roundRupiah(diskonNominal),
    premiAkhir: roundRupiah(premiAkhir),
  }
}

