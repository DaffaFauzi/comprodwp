'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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
  const [tab, setTab] = useState<'insurance' | 'bank'>('insurance')
  const list = tab === 'insurance' ? insurance : bank

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

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {list.slice(0, 12).map((partner) => (
          <div
            key={partner}
            className="h-16 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-center px-2 shadow-sm shadow-slate-200/50 hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-semibold text-slate-700">{partner}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

