'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n-config'
import { ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const languages = [
  {
    code: 'en',
    label: 'English',
    shortLabel: 'EN',
    flag: (
      <svg className="w-full h-full" viewBox="0 0 640 480">
        <path fill="#012169" d="M0 0h640v480H0z"/>
        <path fill="#FFF" d="m75 0 245 181L565 0h75v56L395 240l245 184v56h-75L320 299 75 480H0v-56l245-184L0 56V0h75z"/>
        <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM216 199 0 32V0h54l162 119v80zM0 448l216-159h55L0 480v-32zM640 32 424 191V111L586 0h54v32z"/>
        <path fill="#FFF" d="M240 0h160v480H240zM0 160v160h640V160z"/>
        <path fill="#C8102E" d="M280 0h80v480h-80zM0 200v80h640v-80z"/>
      </svg>
    )
  },
  {
    code: 'id',
    label: 'Indonesia',
    shortLabel: 'ID',
    flag: (
      <svg className="w-full h-full" viewBox="0 0 640 480">
        <path fill="#E12127" d="M0 0h640v240H0z"/>
        <path fill="#FFF" d="M0 240h640v240H0z"/>
      </svg>
    )
  }
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const currentLocale = i18n.locales.find((l) => pathname?.startsWith(`/${l}`)) ?? i18n.locales[0]
  const currentLang = languages.find(l => l.code === currentLocale) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-10 inline-flex items-center gap-2.5 rounded-full border transition-all duration-200 px-4 text-sm font-bold shadow-sm ${
          isOpen 
            ? 'border-dwp-blue bg-dwp-blue/5 text-dwp-blue ring-4 ring-dwp-blue/5' 
            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-slate-200/50'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Change Language"
      >
        <div className="w-5 h-3.5 overflow-hidden rounded-sm border border-slate-200 shadow-sm shrink-0">
          {currentLang.flag}
        </div>
        <span className="hidden sm:inline">{currentLang.label}</span>
        <span className="sm:hidden">{currentLang.shortLabel}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-dwp-blue' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/60 z-50 overflow-hidden"
          >
            <div className="space-y-1">
              {languages.map((lang) => {
                const isActive = lang.code === currentLocale
                return (
                  <Link
                    key={lang.code}
                    href={redirectedPathName(lang.code)}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                      isActive 
                        ? 'bg-dwp-blue/5 text-dwp-blue font-bold' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="w-5 h-3.5 overflow-hidden rounded-sm border border-slate-200 shadow-sm shrink-0">
                      {lang.flag}
                    </div>
                    <span className="flex-1">{lang.label}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-4 h-4 text-dwp-blue" />
                      </motion.div>
                    )}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
