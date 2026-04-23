'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function InitialLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded')

    if (hasLoaded) {
      const timer = window.setTimeout(() => {
        setLoading(false)
      }, 0)
      return () => window.clearTimeout(timer)
    }

    sessionStorage.setItem('hasLoaded', 'true')

    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 2200)

    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.06]" />
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-[rgba(0,229,255,0.16)] blur-[160px]" />
        <div className="absolute -bottom-28 -right-24 h-[560px] w-[560px] rounded-full bg-[rgba(244,122,42,0.14)] blur-[160px]" />

        <div className="relative w-full max-w-sm rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-6">
            <div className="animate-fadeIn">
              <Image
                src="/logos/dwp.png"
                alt="DWP Logo"
                width={120}
                height={120}
                priority
                className="object-contain"
              />
            </div>

            <div className="relative flex items-center justify-center">
              <div className="h-12 w-12 rounded-full border-4 border-slate-200" />
              <div className="absolute h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>

            <p className="text-sm text-slate-500 tracking-wide animate-pulse">
              Loading your experience...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
