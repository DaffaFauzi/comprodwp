'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import SafeImage from '@/components/SafeImage'

export default function VisionCard({
  chipLabel,
  title,
  text,
  moreLabel,
  closeLabel,
  imageSrc = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  imageAlt = 'Office building',
}: {
  chipLabel: string
  title: string
  text: string
  moreLabel: string
  closeLabel: string
  imageSrc?: string
  imageAlt?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70">
        <div className="relative h-44 sm:h-52">
          <SafeImage
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-slate-900/10 to-transparent" />
          <div className="absolute left-6 top-6 flex items-center gap-3">
            <div className="inline-flex items-center self-start rounded-full bg-white/90 border border-white/60 px-4 py-2 text-sm font-black text-slate-900 shadow-sm shadow-black/5">
              {chipLabel}
            </div>
          </div>
          <div className="absolute right-6 top-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-5 py-2 text-sm font-black text-white shadow-[0_14px_32px_rgba(47,93,170,0.22)] hover:shadow-[0_18px_40px_rgba(47,93,170,0.28)] transition-shadow"
            >
              {moreLabel}
            </button>
          </div>
        </div>

        <div className="px-7 py-7 sm:px-8 sm:py-8 flex flex-col">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{title}</div>
          <div className="mt-4">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 text-center sm:text-justify whitespace-normal break-words">
              {text}
            </p>
          </div>
          <div className="mt-7 h-[3px] w-24 rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal" />
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
                <p className="mt-6 text-base text-slate-700 leading-relaxed text-center sm:text-justify whitespace-normal break-words">{text}</p>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(47,93,170,0.22)] hover:shadow-[0_18px_40px_rgba(47,93,170,0.28)] transition-shadow"
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
