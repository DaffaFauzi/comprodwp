'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

type NavigationCopy = {
  home: string
  about: string
  products: string
  partners: string
  contact: string
  cta_consult: string
}

function normalizePath(input: string) {
  if (input.length > 1 && input.endsWith('/')) return input.slice(0, -1)
  return input
}

export default function HeaderClient({
  lang,
  navigation,
}: {
  lang: string
  navigation: NavigationCopy
}) {
  const pathname = usePathname() ?? `/${lang}`
  const reduceMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)

  const links = useMemo(() => {
    return [
      { key: 'home', href: `/${lang}`, label: navigation.home, match: 'exact' as const },
      { key: 'about', href: `/${lang}/about`, label: navigation.about, match: 'startsWith' as const },
      { key: 'products', href: `/${lang}/products`, label: navigation.products, match: 'startsWith' as const },
      { key: 'partners', href: `/${lang}/partners`, label: navigation.partners, match: 'startsWith' as const },
      { key: 'contact', href: `/${lang}/contact`, label: navigation.contact, match: 'startsWith' as const },
    ]
  }, [lang, navigation])

  const current = normalizePath(pathname)

  const isActive = (href: string, mode: 'exact' | 'startsWith') => {
    const h = normalizePath(href)
    if (mode === 'exact') return current === h
    return current === h || current.startsWith(`${h}/`)
  }

  const desktopLinkClass = (active: boolean) => {
    const base =
      'relative py-2 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:rounded-full after:bg-gradient-to-r after:from-dwp-cyan after:to-dwp-orange after:transition-transform after:duration-300 after:origin-left'
    if (active) {
      return `${base} text-dwp-blue font-black after:scale-x-100`
    }
    return `${base} text-slate-700 font-semibold after:scale-x-0 hover:text-slate-900 hover:after:scale-x-100`
  }

  const mobileLinkClass = (active: boolean) => {
    const base =
      'flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors duration-200 border'
    if (active) {
      return `${base} bg-dwp-blue/5 border-dwp-blue/20 text-dwp-blue font-black`
    }
    return `${base} bg-white border-slate-200 text-slate-700 font-semibold hover:bg-slate-50`
  }

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-white/85 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-200/40 supports-[backdrop-filter]:bg-white/70">
        <div className="container mx-auto px-[var(--layout-page-px)] min-h-[var(--header-min-h)] py-[var(--header-py)] flex items-center justify-between gap-6">
          <Link
            href={`/${lang}`}
            className="flex items-center transition-transform hover:scale-105"
            aria-label="Home"
          >
            <Image
              src="/logos/dwp.png"
              alt="DWP"
              width={80}
              height={36}
              className="object-contain w-auto h-12"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-[var(--nav-gap)] text-sm">
            {links.map((l) => {
              const active = isActive(l.href, l.match)
              return (
                <Link
                  key={l.key}
                  data-track={`nav_${l.key}`}
                  href={l.href}
                  className={desktopLinkClass(active)}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              data-track="cta_consult"
              href={`/${lang}/contact`}
              className="hidden lg:inline-flex h-10 items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.20)] hover:shadow-[0_22px_46px_rgba(47,93,170,0.26)] transition-shadow"
            >
              {navigation.cta_consult}
            </Link>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-[var(--layout-page-px)] py-4">
              <div className="grid gap-2">
                {links.map((l) => {
                  const active = isActive(l.href, l.match)
                  return (
                    <Link
                      key={l.key}
                      href={l.href}
                      className={mobileLinkClass(active)}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{l.label}</span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          active ? 'bg-dwp-blue' : 'bg-transparent'
                        }`}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

