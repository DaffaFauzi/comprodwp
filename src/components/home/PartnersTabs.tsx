'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PartnerMarquee from '@/components/partners/PartnerMarquee'
import LogoTile from '@/components/partners/LogoTile'

export default function PartnersTabs({
  insuranceLabel,
  bankLabel,
  insurance,
  bank,
}: {
  insuranceLabel: string
  bankLabel: string
  insurance: string[]
  bank: string[]
}) {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<'insurance' | 'bank'>('insurance')
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const list = tab === 'insurance' ? insurance : bank

  if (!mounted) {
    return (
      <div className="min-h-[200px]">
        {/* Skeleton or empty space to prevent layout shift */}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setTab('insurance')}
          className={`relative inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-bold border transition-colors ${
            tab === 'insurance'
              ? 'bg-dwp-blue text-white border-dwp-blue'
              : 'bg-white text-slate-700 border-slate-200 hover:text-slate-900'
          }`}
        >
          {insuranceLabel}
        </button>
        <button
          type="button"
          onClick={() => setTab('bank')}
          className={`relative inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-bold border transition-colors ${
            tab === 'bank'
              ? 'bg-dwp-blue text-white border-dwp-blue'
              : 'bg-white text-slate-700 border-slate-200 hover:text-slate-900'
          }`}
        >
          {bankLabel}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          <PartnerMarquee
            items={list}
            type="text"
            gradientColor="#f7f8fb"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
