import Link from 'next/link'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import SafeImage from '@/components/SafeImage'

export default async function Hero({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  const featureCards = [
    {
      title: dictionary.home.hero_cards.secure_title,
      desc: dictionary.home.hero_cards.secure_desc,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', // Blue building
    },
    {
      title: dictionary.home.hero_cards.fast_title,
      desc: dictionary.home.hero_cards.fast_desc,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', // Team meeting
    },
    {
      title: dictionary.home.hero_cards.professional_title,
      desc: dictionary.home.hero_cards.professional_desc,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', // Professional team
    },
    {
      title: dictionary.home.hero_cards.support_title,
      desc: dictionary.home.hero_cards.support_desc,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', // Customer support
    },
  ]

  return (
    <section data-testid="hero" className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F7FAFC]" />
      <div className="absolute right-0 top-0 h-full w-[60%] bg-gradient-to-l from-[rgba(44,167,164,0.16)] via-[rgba(0,229,255,0.10)] to-transparent" />
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[rgba(0,229,255,0.10)] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-28 -right-24 w-[560px] h-[560px] bg-[rgba(244,122,42,0.10)] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.045]" />
      
      <div className="container mx-auto px-[var(--layout-page-px)] relative z-10 pt-4 pb-16 md:pt-8 md:pb-20 lg:pt-10 lg:pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <FadeIn className="flex flex-col space-y-6 max-w-2xl" direction="right">
            
            <div className="inline-flex items-center self-start gap-2.5 rounded-full bg-dwp-blue/5 border border-dwp-blue/10 px-4 py-2 shadow-sm shadow-dwp-blue/5 text-sm font-bold text-dwp-blue transition-colors hover:bg-dwp-blue/10">
              <ShieldCheck className="w-4 h-4" />
              <span>{dictionary.hero.pill}</span>
            </div>

            {/* Headings */}
            <div className="space-y-4">
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
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-7 sm:px-10 text-base font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.22)] transition-all hover:shadow-[0_22px_46px_rgba(47,93,170,0.28)] hover:-translate-y-0.5 active:translate-y-0"
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

            <div className="pt-4">
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

          {/* Right Content - Visual Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureCards.map((card, index) => {
              return (
                <FadeIn key={card.title} delay={0.1 * index} direction="up" className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
                    <div className="relative h-40 w-full overflow-hidden rounded-xl mb-5">
                      <SafeImage 
                        src={card.image} 
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity group-hover:opacity-0" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-dwp-blue transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </FadeIn>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
