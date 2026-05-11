import { test, expect } from '@playwright/test'
import { calculatePremium } from '../src/lib/premiumCalculator'

test('Bank Garansi 90 hari (3 bulan) risk rendah', () => {
  const result = calculatePremium({
    service: 'BANK_GARANSI',
    nilaiPertanggungan: 100_000_000,
    durasi: 90,
    durasiUnit: 'hari',
    riskLevel: 'RENDAH',
    includeAdminFee: false,
    adminFee: 50_000,
    diskonPersen: 0,
  })

  expect(result.normalizedMonths).toBeCloseTo(3, 8)
  expect(result.period).toBeCloseTo(1, 8)
  expect(result.baseRate).toBeCloseTo(0.0025, 12)
  expect(result.riskMultiplier).toBe(1)
  expect(result.premiDasar).toBe(250_000)
  expect(result.premiAkhir).toBe(250_000)
})

test('Surety Bond 6 bulan risk tinggi + admin + diskon', () => {
  const result = calculatePremium({
    service: 'SURETY_BOND',
    nilaiPertanggungan: 200_000_000,
    durasi: 6,
    durasiUnit: 'bulan',
    riskLevel: 'TINGGI',
    includeAdminFee: true,
    adminFee: 50_000,
    diskonPersen: 10,
  })

  expect(result.period).toBeCloseTo(2, 8)
  expect(result.baseRate).toBeCloseTo(0.003, 12)
  expect(result.riskMultiplier).toBe(1.5)
  expect(result.premiDasar).toBe(1_200_000)
  expect(result.premiRisk).toBe(1_800_000)
  expect(result.adminFeeApplied).toBe(50_000)
  expect(result.premiSebelumDiskon).toBe(1_850_000)
  expect(result.diskonNominal).toBe(185_000)
  expect(result.premiAkhir).toBe(1_665_000)
})

test('Asuransi Umum 12 bulan risk sedang + admin + diskon', () => {
  const result = calculatePremium({
    service: 'ASURANSI_UMUM',
    nilaiPertanggungan: 10_000_000,
    durasi: 12,
    durasiUnit: 'bulan',
    riskLevel: 'SEDANG',
    includeAdminFee: true,
    adminFee: 50_000,
    diskonPersen: 10,
  })

  expect(result.period).toBeCloseTo(1, 8)
  expect(result.baseRate).toBeCloseTo(0.004, 12)
  expect(result.riskMultiplier).toBe(1.2)
  expect(result.premiDasar).toBe(40_000)
  expect(result.premiRisk).toBe(48_000)
  expect(result.premiAkhir).toBe(88_200)
})

test('Input invalid tidak menghasilkan NaN', () => {
  const result = calculatePremium({
    service: 'CUSTOM_BOND',
    nilaiPertanggungan: Number.NaN,
    durasi: Number.NaN,
    durasiUnit: 'bulan',
    riskLevel: 'RENDAH',
    includeAdminFee: true,
    adminFee: Number.NaN,
    diskonPersen: Number.NaN,
  })

  expect(Number.isFinite(result.premiAkhir)).toBe(true)
  expect(result.premiAkhir).toBe(0)
})

