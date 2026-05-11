function toFiniteNumber(value: number) {
  return Number.isFinite(value) ? value : 0
}

export function formatIDR(value: number) {
  const safe = toFiniteNumber(value)
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(safe)
}

export function formatNumberID(value: number) {
  const safe = toFiniteNumber(value)
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(safe)
}

export function parseDigitsToNumber(input: string) {
  const digits = input.replace(/[^\d]/g, '')
  if (!digits) return 0
  const parsed = Number.parseInt(digits, 10)
  return Number.isFinite(parsed) ? parsed : 0
}

