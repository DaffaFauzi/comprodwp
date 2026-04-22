import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import SafeImage from '@/components/SafeImage'
import SectionHeader from '@/components/SectionHeader'

export const metadata = {
  title: 'Products & Services | PT. Dwi Kusuma Perkasa',
  description: 'Our comprehensive insurance and bond services including Bank Guarantee, Surety Bond, Custom Bond and General Insurance',
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dictionary = await getDictionary(locale)

  const consultLabel =
    dictionary?.navigation?.cta_consult || (locale === 'id' ? 'Konsultasi Sekarang' : 'Consult Now')

  const ctaBase =
    'inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.22)] hover:shadow-[0_22px_46px_rgba(47,93,170,0.28)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dwp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white'

  const sections = [
    {
      key: 'bg' as const,
      image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=800&auto=format&fit=crop', // Financial consultation
    },
    {
      key: 'sb' as const,
      image: 'https://images.unsplash.com/photo-1541913057815-9980b450673e?q=80&w=800&auto=format&fit=crop', // Construction project
    },
    {
      key: 'cb' as const,
      image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=800&auto=format&fit=crop', // Shipping/port
    },
    {
      key: 'general' as const,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', // Asset protection
    },
  ]

  return (
    <div className="bg-white">
      <SectionHeader
        badge={dictionary.home.our_services_badge}
        title={dictionary.products.title}
        subtitle={dictionary.products.subtitle}
      />

      {/* Products Sections */}
      <div className="overflow-hidden">
        {sections.map((s, idx) => {
          const item = dictionary.products.items[s.key]
          const isEven = idx % 2 === 0
          
          return (
            <section 
              key={s.key} 
              id={s.key} 
              className={`py-16 md:py-24 ${isEven ? 'bg-white' : 'bg-slate-50/50'}`}
            >
              <div className="container mx-auto px-[var(--layout-page-px)]">
                <div className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Content Column */}
                  <div className="w-full lg:w-1/2">
                    <FadeIn direction={isEven ? 'right' : 'left'}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dwp-blue/5 border border-dwp-blue/10 text-dwp-blue text-xs font-bold uppercase tracking-wider mb-6">
                        {item.title}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {item.desc}
                      </p>
                      
                      <div className="mb-10">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                          <span className="w-6 h-0.5 bg-dwp-blue rounded-full" />
                          {dictionary.products.features_title}
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 justify-items-start text-left">
                          {item.features.map((feature: string) => (
                            <div key={feature} className="flex items-start justify-start gap-3 w-full group">
                              <div className="shrink-0 w-5 h-5 rounded-full bg-dwp-blue/5 border border-dwp-blue/10 flex items-center justify-center text-dwp-blue group-hover:bg-dwp-blue group-hover:text-white transition-colors">
                                <Check className="w-3 h-3" />
                              </div>
                              <span className="text-slate-700 font-medium text-sm leading-snug text-left">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-sm font-bold text-slate-500 italic">
                          &ldquo;{dictionary.products.consult_cta_prefix} {item.title}&rdquo;
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link
                            href={`/${lang}/contact`}
                            className={`${ctaBase} px-8 py-4 text-sm sm:text-base`}
                          >
                            {consultLabel}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Image Column */}
                  <div className="w-full lg:w-1/2">
                    <FadeIn direction={isEven ? 'left' : 'right'} delay={0.2}>
                      <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 group">
                        <SafeImage
                          src={s.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-dwp-blue/10 to-transparent pointer-events-none" />
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#0B1630] via-[#101F3F] to-[#122B57] p-8 md:p-12 lg:p-16">
              <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-dwp-blue/30 blur-[120px]" />
              <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-dwp-teal/25 blur-[130px]" />

              <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
                <div>
                  <p className="mb-3 inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/10 backdrop-blur">
                    {locale === 'id' ? 'Butuh bantuan memilih produk?' : 'Need help choosing a product?'}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                    {dictionary?.about?.cta_strip?.title || 'Temukan Solusi Penjaminan & Asuransi Terbaik untuk Bisnis Anda'}
                  </h2>
                  <p className="text-base md:text-lg text-slate-200/90 mb-8 leading-relaxed max-w-xl">
                    {dictionary?.about?.cta_strip?.desc || 'Respon cepat dalam 1x24 jam. Tim ahli kami siap memberikan solusi asuransi yang dipersonalisasi dan disesuaikan dengan kebutuhan bisnis Anda.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-5">
                    <Link
                      href={`/${lang}/contact`}
                      className={`${ctaBase} px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg`}
                    >
                      {dictionary?.about?.cta_strip?.button || 'Hubungi Kami Sekarang'}
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                    <div className="flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
                      </span>
                      Respon 1x24 Jam
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-md">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=960&auto=format&fit=crop"
                      alt={locale === 'id' ? 'Tim konsultan DWP sedang berdiskusi dengan klien bisnis' : 'DWP consultants discussing solutions with a business client'}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1630]/40 via-transparent to-dwp-teal/25 mix-blend-soft-light" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
