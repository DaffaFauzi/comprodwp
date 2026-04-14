'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function VisionCard({
  chipLabel,
  title,
  text,
  moreLabel,
  closeLabel,
}: {
  chipLabel: string
  title: string
  text: string
  moreLabel: string
  closeLabel: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="h-full rounded-[28px] bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] p-[1px] shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
        <div className="h-full rounded-[27px] bg-[rgba(255,255,255,0.10)] backdrop-blur-xl px-8 py-8 sm:px-10 sm:py-10 text-white flex flex-col">
          <div className="flex items-center justify-between gap-6">
            <div className="inline-flex items-center self-start rounded-full bg-white/15 border border-white/20 px-4 py-2 text-sm font-semibold">
              {chipLabel}
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-white/15 border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              {moreLabel}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-4">
            <div className="col-span-7 rounded-2xl overflow-hidden border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_40%,rgba(0,0,0,0.10)_100%)]">
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.22),transparent_52%),radial-gradient(circle_at_75%_70%,rgba(0,229,255,0.18),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(244,122,42,0.16),transparent_55%)]" />
                <div className="absolute inset-0 opacity-[0.07] bg-[url('/grid-pattern.svg')]" />
              </div>
            </div>
            <div className="col-span-5 grid gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(0,0,0,0.12)_100%)]">
                <div className="aspect-[16/10] relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,193,7,0.16),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(47,93,170,0.18),transparent_55%)]" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(0,0,0,0.12)_100%)]">
                <div className="aspect-[16/10] relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(44,167,164,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(244,122,42,0.14),transparent_55%)]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 text-3xl font-black">{title}</div>

          <div className="mt-4 relative">
            <p className="text-base leading-relaxed text-white/90 max-h-[7.75rem] overflow-hidden">
              {text}
            </p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[rgba(46,149,170,0.55)]" />
          </div>

          <div className="mt-auto pt-8">
            <div className="h-[3px] w-24 rounded-full bg-white/35" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl shadow-black/25 border border-slate-200 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-sm font-semibold text-slate-500">{chipLabel}</div>
                    <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">{title}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={closeLabel}
                    className="h-10 w-10 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-6 text-base text-slate-700 leading-relaxed">{text}</p>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-[#2F5DAA] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(47,93,170,0.22)] hover:shadow-[0_18px_40px_rgba(47,93,170,0.28)] transition-shadow"
                  >
                    {closeLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
