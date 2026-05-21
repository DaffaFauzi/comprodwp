'use client'

import { useMemo, useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, MessageCircle, Info } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

type GuaranteeType = 'bank-garansi' | 'surety-bond'
type Duration = '3' | '6' | '9' | '12'
type SuretyBondType = 'penawaran' | 'uang-muka' | 'pelaksanaan' | 'pemeliharaan'
type DurationSelection = '' | Duration

const SURETY_RATE_RULES: Record<SuretyBondType, { min: number; max: number }> = {
  penawaran: { min: 0.00275, max: 0.0035 },
  pelaksanaan: { min: 0.003, max: 0.004 },
  'uang-muka': { min: 0.004, max: 0.005 },
  pemeliharaan: { min: 0.003, max: 0.004 },
}

const DURATION_FACTOR: Record<Duration, number> = {
  '3': 1,
  '6': 2,
  '9': 3,
  '12': 4,
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const NUMBER_FORMATTER = new Intl.NumberFormat('id-ID')
const STEPS = [1, 2, 3, 4] as const

function toCurrency(value: number) {
  return CURRENCY_FORMATTER.format(value)
}

function formatRupiahInput(digits: string) {
  if (!digits) return ''
  return `Rp ${NUMBER_FORMATTER.format(Number(digits))}`
}

function parseDigits(input: string) {
  return input.replace(/\D/g, '')
}

function FloatingField({ label, children, error }: { label: string; children: ReactNode; error?: string }) {
  return (
    <div className="space-y-1.5">
      <div className={`relative rounded-xl border bg-white px-4 pb-2.5 pt-5 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-600/10 ${error ? 'border-red-500 bg-red-50/30' : 'border-slate-200 focus-within:border-blue-600 shadow-sm'}`}>
        <div className="pointer-events-none absolute -top-2 left-3 rounded-md bg-white px-2 py-0 text-[9px] font-bold uppercase tracking-wider text-slate-400 border border-slate-100 shadow-sm">
          {label}
        </div>
        <div className="relative text-slate-900">
          {children}
        </div>
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-1 text-[10px] font-bold text-red-500 flex items-center gap-1"
        >
          <Info className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 11) return 'Pagi'
  if (hour < 15) return 'Siang'
  if (hour < 19) return 'Sore'
  return 'Malam'
}

export default function KalkulatorClient({ lang, dictionary }: { lang: string; dictionary: any }) {
  const [step, setStep] = useState<(typeof STEPS)[number]>(1)
  const [guaranteeValueDigits, setGuaranteeValueDigits] = useState('')
  const [guaranteeType, setGuaranteeType] = useState<GuaranteeType>('bank-garansi')
  const [suretyType, setSuretyType] = useState<SuretyBondType>('penawaran')
  const [duration, setDuration] = useState<DurationSelection>('')
  const [animatedMinPremium, setAnimatedMinPremium] = useState(0)
  const [animatedMaxPremium, setAnimatedMaxPremium] = useState(0)

  const guaranteeValue = Number(guaranteeValueDigits)
  const isStep1Valid = Number.isFinite(guaranteeValue) && guaranteeValue > 0
  const isStep2Valid = Boolean(guaranteeType)
  const isStep3Valid = Boolean(suretyType)
  const isStep4Valid = duration !== ''
  const isComplete = isStep1Valid && isStep2Valid && isStep3Valid && isStep4Valid

  const rateRule = SURETY_RATE_RULES[suretyType]
  const clampStep = (n: number) => {
    if (n < 1) return 1
    if (n > 4) return 4
    return n as (typeof STEPS)[number]
  }

  const estimationRange = useMemo<{ min: number; max: number } | null>(() => {
    if (!isComplete) return null
    const factor = DURATION_FACTOR[duration]
    const min = guaranteeValue * rateRule.min * factor
    const max = guaranteeValue * rateRule.max * factor
    return { min, max }
  }, [duration, guaranteeValue, isComplete, rateRule.max, rateRule.min])

  useEffect(() => {
    if (!estimationRange) return
    const durationMs = 800
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      const easedProgress = easeOutExpo(progress)
      
      setAnimatedMinPremium(Math.round(estimationRange.min * easedProgress))
      setAnimatedMaxPremium(Math.round(estimationRange.max * easedProgress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [estimationRange])

  const t = (path: string) => {
    const keys = path.split('.')
    let current = dictionary
    for (const key of keys) {
      if (!current || current[key] === undefined) return path
      current = current[key]
    }
    return current as string
  }

  const suretyLabel = t(`calculatorPage.suretyTypes.${suretyType}`)
  const guaranteeTypeLabel = guaranteeType === 'surety-bond' ? 'Surety Bond' : 'Bank Garansi'
  const durationLabel = duration ? `${duration} ${t('calculatorPage.months')}` : '-'

  const canGoNext =
    (step === 1 && isStep1Valid) ||
    (step === 2 && isStep2Valid) ||
    (step === 3 && isStep3Valid) ||
    (step === 4 && isStep4Valid)

  const stepHint = t(`calculatorPage.stepHint${step}`)

  const whatsappMessage = `Selamat ${getGreeting()} Tim DWP Insurance,

Saya ingin mengonsultasikan pengajuan ${guaranteeTypeLabel}
dengan data sebagai berikut :

Nilai Jaminan : ${formatRupiahInput(guaranteeValueDigits) || '-'}
Jenis Jaminan : ${suretyLabel}
Jangka Waktu : ${durationLabel}
Estimasi Premi By Web : ${toCurrency(animatedMinPremium)} — ${toCurrency(animatedMaxPremium)}

Mohon Bantuannya terkait pengajuan terlampir.`

  const whatsappUrl = `https://wa.me/6281288893223?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="w-full select-none">
      <div className="mx-auto max-w-xl px-4 sm:px-0">
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
          {/* Decorative gradients */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-500/5 blur-[80px]" />

          <div className="relative space-y-8">
            {/* Header */}
            <div className="space-y-4 text-center sm:text-left">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-heading leading-tight">
                  {t('calculatorPage.wizardTitle')}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-lg">
                  {t('calculatorPage.wizardDesc')}
                </p>
              </div>
              
              {/* Step Progress Bar */}
              <div className="flex items-center gap-2 sm:gap-3 pt-1">
                {STEPS.map((item) => {
                  const active = item === step
                  const done = 
                    (item === 1 && isStep1Valid) ||
                    (item === 2 && isStep2Valid) ||
                    (item === 3 && isStep3Valid) ||
                    (item === 4 && isStep4Valid)
                  
                  return (
                    <div
                      key={item}
                      className={`flex-1 relative overflow-hidden rounded-xl border py-2 text-center transition-all duration-300 ${
                        active
                          ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                          : done
                          ? 'border-blue-600/20 bg-blue-50 text-blue-700 font-bold'
                          : 'border-slate-100 bg-slate-50 text-slate-400'
                      }`}
                    >
                      <span className="relative z-10 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider block whitespace-nowrap">
                        {t('calculatorPage.stepLabel')} {item}
                      </span>
                      {done && !active && (
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 origin-left"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Fields */}
            <div className="min-h-[100px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full"
                >
                  {step === 1 && (
                    <FloatingField label={t('calculatorPage.fields.projectValue')} error={!isStep1Valid && step === 1 && guaranteeValueDigits !== '' ? t('calculatorPage.stepHint1') : undefined}>
                      <input
                        id="guarantee-value"
                        inputMode="numeric"
                        placeholder={t('calculatorPage.fields.projectPlaceholder')}
                        value={formatRupiahInput(guaranteeValueDigits)}
                        onChange={(e) => {
                          setGuaranteeValueDigits(parseDigits(e.target.value))
                          setAnimatedMinPremium(0)
                          setAnimatedMaxPremium(0)
                        }}
                        className="h-9 w-full border-none bg-transparent px-0 text-lg font-bold text-slate-900 outline-none placeholder:text-slate-200"
                      />
                    </FloatingField>
                  )}

                  {step === 2 && (
                    <FloatingField label={t('calculatorPage.fields.guaranteeType')}>
                      <div className="relative group">
                        <select
                          id="guarantee-type"
                          value={guaranteeType}
                          onChange={(e) => {
                            setGuaranteeType(e.target.value as GuaranteeType)
                            setAnimatedMinPremium(0)
                            setAnimatedMaxPremium(0)
                          }}
                          className="h-9 w-full border-none bg-transparent px-0 text-base font-bold text-slate-900 outline-none appearance-none cursor-pointer"
                        >
                          <option value="bank-garansi">Bank Garansi</option>
                          <option value="surety-bond">Surety Bond</option>
                        </select>
                        <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 rotate-90 pointer-events-none group-hover:text-slate-400 transition-colors" />
                      </div>
                    </FloatingField>
                  )}

                  {step === 3 && (
                    <FloatingField label={t('calculatorPage.fields.suretyType')}>
                      <div className="relative group">
                        <select
                          id="surety-type"
                          value={suretyType}
                          onChange={(e) => {
                            setSuretyType(e.target.value as SuretyBondType)
                            setAnimatedMinPremium(0)
                            setAnimatedMaxPremium(0)
                          }}
                          className="h-9 w-full border-none bg-transparent px-0 text-base font-bold text-slate-900 outline-none appearance-none cursor-pointer"
                        >
                          <option value="penawaran">{t('calculatorPage.suretyTypes.penawaran')}</option>
                          <option value="uang-muka">{t('calculatorPage.suretyTypes.uang-muka')}</option>
                          <option value="pelaksanaan">{t('calculatorPage.suretyTypes.pelaksanaan')}</option>
                          <option value="pemeliharaan">{t('calculatorPage.suretyTypes.pemeliharaan')}</option>
                        </select>
                        <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 rotate-90 pointer-events-none group-hover:text-slate-400 transition-colors" />
                      </div>
                    </FloatingField>
                  )}

                  {step === 4 && (
                    <FloatingField label={t('calculatorPage.fields.duration')}>
                      <div className="relative group">
                        <select
                          id="duration"
                          value={duration}
                          onChange={(e) => {
                            setDuration(e.target.value as Duration)
                          }}
                          className="h-9 w-full border-none bg-transparent px-0 text-base font-bold text-slate-900 outline-none appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            {t('calculatorPage.fields.duration')}
                          </option>
                          <option value="3">3 {t('calculatorPage.months')}</option>
                          <option value="6">6 {t('calculatorPage.months')}</option>
                          <option value="9">9 {t('calculatorPage.months')}</option>
                          <option value="12">12 {t('calculatorPage.months')}</option>
                        </select>
                        <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 rotate-90 pointer-events-none group-hover:text-slate-400 transition-colors" />
                      </div>
                    </FloatingField>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
              <button
                onClick={() => setStep((s) => clampStep(s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 transition-all hover:text-slate-900 disabled:opacity-0 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-5 h-5" />
                {lang === 'id' ? 'Sebelumnya' : 'Previous'}
              </button>

              <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setStep((s) => clampStep(s + 1))}
                  disabled={!canGoNext || step === 4}
                  className="group relative flex h-12 w-full sm:w-44 items-center justify-center overflow-hidden rounded-xl bg-slate-900 font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:shadow-slate-900/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:translate-y-0 disabled:pointer-events-none outline-none ring-0"
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm">
                    {lang === 'id' ? 'Berikutnya' : 'Next'}
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                {!canGoNext && (
                  <motion.span 
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold text-red-500/80 uppercase tracking-wider text-center sm:text-right"
                  >
                    {stepHint}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Result Display */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  className="mt-10 overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50/50 p-8 sm:p-10 text-center shadow-[inset_0_1px_10px_rgba(0,0,0,0.01)]"
                >
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        {t('calculatorPage.resultLabel')}
                      </span>
                      <div className="flex flex-col items-center justify-center gap-3 pt-1">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
                          <div className="flex flex-col items-center sm:items-end">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-blue-600/40 mb-1">Min</span>
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-heading">
                              {toCurrency(animatedMinPremium)}
                            </span>
                          </div>
                          <div className="hidden sm:flex h-10 w-[1px] bg-slate-200 rotate-[20deg] mx-1" />
                          <div className="flex flex-col items-center sm:items-start">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-blue-600/40 mb-1">Max</span>
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-heading">
                              {toCurrency(animatedMaxPremium)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 px-6 py-3 mx-auto rounded-xl bg-white border border-slate-100 shadow-sm w-fit max-w-md">
                      <Info className="w-4 h-4 text-blue-600 shrink-0" />
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                        {t('calculatorPage.disclaimer')}
                      </p>
                    </div>

                    <div className="pt-6">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-teal-600 px-12 py-4 text-base font-bold text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:translate-y-0"
                      >
                        <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-105" />
                        {t('calculatorPage.cta')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
