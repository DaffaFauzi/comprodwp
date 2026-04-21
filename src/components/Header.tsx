import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import LanguageSwitcher from './LanguageSwitcher'
import { Menu } from 'lucide-react'

export default async function Header({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-white/85 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-200/40 supports-[backdrop-filter]:bg-white/70">
        <div className="container mx-auto px-[var(--layout-page-px)] min-h-[var(--header-min-h)] py-[var(--header-py)] flex items-center justify-between gap-6">
          <Link href={`/${lang}`} className="flex items-center transition-transform hover:scale-105">
            <Image src="/logos/dwp.png" alt="DWP" width={80} height={36} className="object-contain w-auto h-12" priority />
          </Link>
          
          <nav className="hidden md:flex items-center gap-[var(--nav-gap)] text-sm font-semibold text-slate-800">
            <Link data-track="nav_home" href={`/${lang}`} className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-dwp-cyan after:to-dwp-orange after:transition-all hover:text-slate-900 hover:after:w-full">{dictionary.navigation.home}</Link>
            <Link data-track="nav_about" href={`/${lang}/about`} className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-dwp-cyan after:to-dwp-orange after:transition-all hover:text-slate-900 hover:after:w-full">{dictionary.navigation.about}</Link>
            <Link data-track="nav_products" href={`/${lang}/products`} className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-dwp-cyan after:to-dwp-orange after:transition-all hover:text-slate-900 hover:after:w-full">{dictionary.navigation.products}</Link>
            <Link data-track="nav_partners" href={`/${lang}/partners`} className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-dwp-cyan after:to-dwp-orange after:transition-all hover:text-slate-900 hover:after:w-full">{dictionary.navigation.partners}</Link>
            <Link data-track="nav_contact" href={`/${lang}/contact`} className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-dwp-cyan after:to-dwp-orange after:transition-all hover:text-slate-900 hover:after:w-full">{dictionary.navigation.contact}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link 
              data-track="cta_consult"
              href={`/${lang}/contact`} 
              className="hidden lg:inline-flex h-10 items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.20)] hover:shadow-[0_22px_46px_rgba(47,93,170,0.26)] transition-shadow"
            >
              {dictionary.navigation.cta_consult}
            </Link>
            <button className="md:hidden p-2 text-slate-700 hover:text-slate-900">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
