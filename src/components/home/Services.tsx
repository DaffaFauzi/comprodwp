import Link from 'next/link'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { Shield, FileCheck, Truck, Building2, ArrowRight, ArrowUpRight } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

export default async function Services({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  const services = [
    {
      id: 'bank_garansi',
      icon: Shield,
      bg: 'bg-blue-50',
      border: 'group-hover:border-dwp-blue/30',
    },
    {
      id: 'surety_bond',
      icon: FileCheck,
      bg: 'bg-teal-50',
      border: 'group-hover:border-dwp-teal/30',
    },
    {
      id: 'custom_bond',
      icon: Truck,
      bg: 'bg-orange-50',
      border: 'group-hover:border-dwp-orange/30',
    },
    {
      id: 'general_insurance',
      icon: Building2,
      bg: 'bg-indigo-50',
      border: 'group-hover:border-dwp-dark/30',
    },
  ]

  return (
    <section className="bg-[#F7FAFC] section-y relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[720px] h-[720px] bg-dwp-orange/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[720px] h-[720px] bg-dwp-cyan/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-[var(--layout-page-px)] relative z-10">
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="services-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#F47A2A" />
            </linearGradient>
          </defs>
        </svg>
        
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-slate-900">
            {dictionary.home.comprehensive_title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {dictionary.home.comprehensive_subtitle}
          </p>
          <div className="mt-6 h-[3px] w-24 mx-auto rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal" />
        </FadeIn>

        {/* Cards Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const item = dictionary.services.items[service.id as keyof typeof dictionary.services.items]
            const Icon = service.icon

            return (
              <FadeIn key={service.id} delay={index * 0.05} className="relative">
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6 text-transparent" style={{ stroke: 'url(#services-icon-gradient)', fill: 'none' }} />
                  </div>
                  <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#1E3A8A] group-hover:text-dwp-teal transition-colors">
                    {dictionary.services.learn_more}
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <Link
                    href={`/${lang}/products`}
                    className="absolute inset-0 rounded-2xl"
                    aria-label={dictionary.services.aria_view_details.replace('{title}', item.title)}
                  />
                </div>
              </FadeIn>
            )
          })}
        </div>
        
        <FadeIn className="mt-10 text-center" delay={0.2}>
          <Link 
            href={`/${lang}/products`}
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-8 py-4 text-sm sm:text-base font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.22)] transition-all hover:shadow-[0_22px_46px_rgba(47,93,170,0.28)]"
          >
            {dictionary.services.cta}
            <ArrowRight className="ml-2 h-5 w-5 text-white" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
