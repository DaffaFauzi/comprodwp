'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PartnerMarquee from '@/components/partners/PartnerMarquee'

export default function PartnersTabs({
  insuranceLabel,
  bankLabel,
  insurance,
  bank,
}: {
  insuranceLabel: string
  bankLabel: string
  insurance: { name: string; fileName: string }[]
  bank: { name: string; fileName: string }[]
}) {
  const [tab, setTab] = useState<'insurance' | 'bank'>('insurance')

  const list = tab === 'insurance' ? insurance : bank

  return (
    <div className="mt-10 rounded-3xl border border-slate-200 bg-[#f7f8fb] p-6 sm:p-8 shadow-sm shadow-slate-200/60">
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
          className="mt-8 px-6"
        >
          <PartnerMarquee
            items={list}
            type="logo"
            gradientColor="#f7f8fb"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
