import Link from 'next/link'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { ArrowRight, Clock, HeartHandshake, ShieldCheck, Zap } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

import { BootstrapData, getCmsSection } from '@/lib/cms'

export default async function Hero({ lang, cmsData }: { lang: Locale, cmsData?: BootstrapData | null }) {
  const dictionary = await getDictionary(lang)
  
  const heroSection = getCmsSection(cmsData?.sections, 'hero')
  const cmsContent = (heroSection?.content || {}) as any
  
  const headline = cmsContent.title_lines ? {
    line1: cmsContent.title_lines.line1 || dictionary.hero.headline.line1,
    line2: {
      a: cmsContent.title_lines.line2?.a || dictionary.hero.headline.line2.a,
      b: cmsContent.title_lines.line2?.b || dictionary.hero.headline.line2.b,
      c: cmsContent.title_lines.line2?.c || dictionary.hero.headline.line2.c,
    },
    line3: cmsContent.title_lines.line3 || dictionary.hero.headline.line3
  } : dictionary.hero.headline
  
  const subtitle = cmsContent.subtitle || dictionary.hero.subtitle
  const pillText = cmsContent.pill_text || dictionary.hero.pill
  const primaryCta = cmsContent.primary_cta?.text || dictionary.hero.cta_primary
  const secondaryCta = cmsContent.secondary_cta?.text || dictionary.hero.cta_secondary
  
  const sellingPoints = [
    { key: 'secure', title: dictionary.home.hero_cards.secure_title, desc: dictionary.home.hero_cards.secure_desc, icon: ShieldCheck },
    { key: 'fast', title: dictionary.home.hero_cards.fast_title, desc: dictionary.home.hero_cards.fast_desc, icon: Zap },
    { key: 'expert', title: dictionary.home.hero_cards.professional_title, desc: dictionary.home.hero_cards.professional_desc, icon: HeartHandshake },
    { key: 'support', title: dictionary.home.hero_cards.support_title, desc: dictionary.home.hero_cards.support_desc, icon: Clock },
  ]

  return (
    <section data-testid="hero" className="relative overflow-hidden bg-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef3f6] via-white to-[#e6eff4]" />
      <div className="absolute right-0 top-0 h-full w-[60%] bg-gradient-to-l from-[rgba(44,167,164,0.16)] via-[rgba(0,229,255,0.10)] to-transparent" />
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[rgba(0,229,255,0.10)] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-28 -right-24 w-[560px] h-[560px] bg-[rgba(244,122,42,0.10)] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.045]" />
      
      <div className="container mx-auto px-[var(--layout-page-px)] relative z-10 w-full pt-10 pb-14 md:pt-12 md:pb-16 h-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left Content */}
          <FadeIn className="flex flex-col justify-center space-y-4 w-full max-w-2xl lg:max-w-3xl mx-auto lg:mx-0" direction="right">
            
            <div className="inline-flex items-center self-start gap-2.5 rounded-full bg-dwp-blue/5 border border-dwp-blue/10 px-4 py-1.5 shadow-sm shadow-dwp-blue/5 text-sm font-bold text-dwp-blue transition-colors hover:bg-dwp-blue/10">
              <ShieldCheck className="w-4 h-4" />
              <span>{pillText}</span>
            </div>

            {/* Headings */}
            <div className="space-y-3">
              <h1 className="text-[44px] md:text-[56px] lg:text-[64px] font-black font-heading tracking-tight text-slate-900 leading-[1.05] max-w-2xl lg:max-w-3xl">
                <span className="block">{headline.line1}</span>
                <span className="block">
                  <span className="bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] bg-clip-text text-transparent">
                    {headline.line2.a}
                  </span>{' '}
                  <span className="text-slate-900">{headline.line2.b}</span>{' '}
                  <span className="bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] bg-clip-text text-transparent">
                    {headline.line2.c}
                  </span>
                </span>
                <span className="block">{headline.line3}</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl lg:max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-0">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-7 sm:px-10 text-base font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.22)] transition-all hover:shadow-[0_22px_46px_rgba(47,93,170,0.28)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {primaryCta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href={`/${lang}/products`}
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-7 sm:px-10 text-base font-black text-slate-900 shadow-sm shadow-slate-200/60 transition-all hover:bg-slate-50 hover:shadow-md"
              >
                {secondaryCta}
              </Link>
            </div>

            <div className="pt-2">
              <div className="grid grid-cols-3 gap-8 max-w-xl">
                {Object.values(dictionary.home.hero_stats).map((s, idx) => (
                  <div key={s.label}>
                    <div
                      className={`text-3xl font-semibold leading-none ${
                        idx === 0 ? 'text-dwp-blue' : idx === 1 ? 'text-dwp-teal' : 'text-dwp-orange'
                      }`}
                    >
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="w-full mx-auto lg:mx-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sellingPoints.map((it, index) => {
                const Icon = it.icon
                return (
                  <FadeIn key={it.key} delay={0.08 * index} direction="up" className="h-full">
                    <div className="group h-full rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-200/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 h-11 w-11 rounded-2xl bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_100%)] shadow-[0_14px_28px_rgba(15,23,42,0.10)] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.06]">
                          <Icon className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-[1.06]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-base font-black text-slate-900 leading-tight">{it.title}</div>
                          <div className="mt-2 text-sm text-slate-600 leading-relaxed">{it.desc}</div>
                        </div>
                      </div>
                      <div className="mt-4 h-[3px] w-full rounded-full bg-slate-100 group-hover:bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] transition-colors" />
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
