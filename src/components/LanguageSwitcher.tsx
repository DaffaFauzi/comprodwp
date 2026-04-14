'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n-config'
import { ChevronDown } from 'lucide-react'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const currentLocale = i18n.locales.find((l) => pathname?.startsWith(`/${l}`)) ?? i18n.locales[0]
  const label = currentLocale === 'id' ? 'Bahasa Indonesia' : 'English'
  const activeLabel = currentLocale === 'id' ? 'Aktif' : 'Active'

  return (
    <div className="relative">
      <div className="group inline-flex">
        <button
          type="button"
          className="h-10 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:text-slate-900 shadow-sm shadow-slate-200/50"
        >
          <span className="inline-flex flex-col h-4 w-6 overflow-hidden rounded-sm border border-slate-200">
            <span className="flex-1 w-full bg-red-600" />
            <span className="flex-1 w-full bg-white" />
          </span>
          <span className="hidden xl:inline">{label}</span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </button>

        <div className="pointer-events-none opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="py-1">
            {i18n.locales.map((locale) => {
              const isActive = locale === currentLocale
              const itemLabel = locale === 'id' ? 'Bahasa Indonesia' : 'English'
              return (
                <Link
                  key={locale}
                  href={redirectedPathName(locale)}
                  className={`flex items-center justify-between px-3 py-2 text-sm ${
                    isActive ? 'font-semibold text-slate-900 bg-slate-50' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {itemLabel}
                  {isActive ? <span className="text-xs text-slate-500">{activeLabel}</span> : null}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
