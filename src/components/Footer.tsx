import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import { MapPin, Mail, Phone, Instagram, Facebook, Linkedin } from 'lucide-react'

export default async function Footer({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return (
    <footer className="bg-[#3E4A61] text-white">
      <div className="container mx-auto px-[var(--layout-page-px)] pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-start transition-transform hover:scale-105">
              <Image src="/logos/dwp-transparent.png" alt="DWP" width={120} height={48} className="object-contain" />
            </div>
            <div className="text-xl font-black font-heading">{dictionary.footer.about_title}</div>
            <p className="text-sm leading-relaxed text-white/85">
              {dictionary.footer.company_desc}
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-xl font-black font-heading">{dictionary.footer.contact_title}</div>
            <div className="space-y-4 text-sm text-white/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-white/85" />
                <span>{dictionary.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-white/85" />
                <span>{dictionary.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-white/85" />
                <span>{dictionary.contact.email}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-xl font-black font-heading">{dictionary.footer.nav_title}</div>
            <nav className="flex flex-col gap-2 text-sm text-white/85">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{dictionary.navigation.home}</Link>
              <Link href={`/${lang}/about`} className="hover:text-white transition-colors">{dictionary.navigation.about}</Link>
              <Link href={`/${lang}/products`} className="hover:text-white transition-colors">{dictionary.navigation.products}</Link>
              <Link href={`/${lang}/kalkulator`} className="hover:text-white transition-colors">{dictionary.navigation.kalkulator}</Link>
              <Link href={`/${lang}/partners`} className="hover:text-white transition-colors">{dictionary.navigation.partners}</Link>
              <Link href={`/${lang}/contact`} className="hover:text-white transition-colors">{dictionary.navigation.contact}</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <div className="text-xl font-black font-heading">{dictionary.footer.social_title}</div>
            <div className="space-y-3 text-sm text-white/85">
              <div className="flex items-center gap-3">
                <Facebook className="w-4 h-4 text-white/85" />
                <span>PT. Dwi Kusuma Perkasa</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-white/85" />
                <span>PT. Dwi Kusuma Perkasa</span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-white/85" />
                <span>@pt.dwikusumaperkasa</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="h-11 w-11 rounded-2xl bg-white/12 border border-white/15 flex items-center justify-center hover:bg-white/18 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/pt.dwikusumaperkasa"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-11 w-11 rounded-2xl bg-white/12 border border-white/15 flex items-center justify-center hover:bg-white/18 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/dwi-kusuma-perkasa-191543402/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-11 w-11 rounded-2xl bg-white/12 border border-white/15 flex items-center justify-center hover:bg-white/18 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-white/15 text-center text-sm text-white/70">
          {dictionary.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
