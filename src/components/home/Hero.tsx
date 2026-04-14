import Link from 'next/link'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { ArrowRight, BadgeCheck, ShieldCheck, TrendingUp } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

export default async function Hero({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return (
    <section data-testid="hero" className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F7FAFC]" />
      <div className="absolute right-0 top-0 h-full w-[60%] bg-gradient-to-l from-[rgba(44,167,164,0.16)] via-[rgba(0,229,255,0.10)] to-transparent" />
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[rgba(0,229,255,0.10)] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-28 -right-24 w-[560px] h-[560px] bg-[rgba(244,122,42,0.10)] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.045]" />
      
      <div className="container mx-auto px-[var(--layout-page-px)] relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Content */}
          <FadeIn className="flex flex-col space-y-8 max-w-2xl" direction="right">
            
            <div className="inline-flex items-center self-start gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm shadow-slate-200/60 text-sm font-semibold text-slate-700">
              <span className="h-2 w-2 rounded-full bg-dwp-teal" />
              <span>{dictionary.hero.pill}</span>
            </div>

            {/* Headings */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-slate-900 leading-[1.03]">
                <span className="block">{dictionary.hero.headline.line1}</span>
                <span className="block">
                  <span className="text-[#2F5DAA]">{dictionary.hero.headline.line2.a}</span>{' '}
                  <span className="text-slate-400">{dictionary.hero.headline.line2.b}</span>{' '}
                  <span className="text-[#2CA7A4]">{dictionary.hero.headline.line2.c}</span>
                </span>
                <span className="block">{dictionary.hero.headline.line3}</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {dictionary.hero.subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-2xl bg-[#2F5DAA] px-7 sm:px-10 text-base font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.25)] transition-all hover:shadow-[0_22px_46px_rgba(47,93,170,0.30)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {dictionary.hero.cta_primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href={`/${lang}/products`}
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-7 sm:px-10 text-base font-black text-slate-900 shadow-sm shadow-slate-200/60 transition-all hover:bg-slate-50 hover:shadow-md"
              >
                {dictionary.hero.cta_secondary}
              </Link>
            </div>

            <div className="pt-6">
              <div className="grid grid-cols-3 gap-10 max-w-xl">
                {Object.values(dictionary.home.hero_stats).map((s, idx) => (
                  <div key={s.label}>
                    <div
                      className={`text-4xl font-black leading-none ${
                        idx === 0 ? 'text-dwp-blue' : idx === 1 ? 'text-dwp-teal' : 'text-dwp-orange'
                      }`}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right Content - Visual */}
          <FadeIn className="relative" direction="left" delay={0.2}>
            <div data-testid="hero-cards" className="relative aspect-[4/3]">
              <div className="hero-float-a absolute left-6 top-8 w-[42%] rounded-[22px] bg-white px-5 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.16)]">
                <div className="h-12 w-12 rounded-2xl bg-[#2CA7A4] flex items-center justify-center text-white mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-xl font-black text-slate-900">{dictionary.home.hero_cards.secure_title}</div>
                <div className="mt-2 text-sm text-slate-500">{dictionary.home.hero_cards.secure_desc}</div>
              </div>

              <div className="hero-float-b absolute right-6 top-8 w-[42%] rounded-[22px] bg-white px-5 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.16)]">
                <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#2CA7A4_0%,#F47A2A_100%)] flex items-center justify-center text-white mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-xl font-black text-slate-900">{dictionary.home.hero_cards.fast_title}</div>
                <div className="mt-2 text-sm text-slate-500">{dictionary.home.hero_cards.fast_desc}</div>
              </div>

              <div className="hero-float-b absolute left-6 bottom-10 w-[42%] rounded-[22px] bg-white px-5 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.16)]">
                <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#F47A2A_0%,#2F5DAA_100%)] flex items-center justify-center text-white mb-4">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div className="text-xl font-black text-slate-900">{dictionary.home.hero_cards.professional_title}</div>
                <div className="mt-2 text-sm text-slate-500">{dictionary.home.hero_cards.professional_desc}</div>
              </div>

              <div className="hero-float-a absolute right-6 bottom-10 w-[42%] rounded-[22px] bg-white px-5 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.16)]">
                <div className="h-12 w-12 rounded-2xl bg-[#2F5DAA] flex items-center justify-center text-white mb-4">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div className="text-xl font-black text-slate-900 leading-none">{dictionary.home.hero_cards.support_title}</div>
                <div className="mt-2 text-sm text-slate-500">{dictionary.home.hero_cards.support_desc}</div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
