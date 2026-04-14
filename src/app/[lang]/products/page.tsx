import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import Link from 'next/link'
import { ArrowRight, Building2, FileCheck, Shield, Truck } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

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

  const sections = [
    {
      key: 'bg' as const,
      icon: Shield,
      accent: 'bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_100%)]',
      chip: 'bg-[#EEF5FF] text-dwp-blue',
    },
    {
      key: 'sb' as const,
      icon: FileCheck,
      accent: 'bg-[linear-gradient(135deg,#2CA7A4_0%,#F47A2A_100%)]',
      chip: 'bg-[#E6F7F6] text-dwp-teal',
    },
    {
      key: 'cb' as const,
      icon: Truck,
      accent: 'bg-[linear-gradient(135deg,#F47A2A_0%,#4B5CC4_100%)]',
      chip: 'bg-[#FFF1E9] text-dwp-orange',
    },
    {
      key: 'general' as const,
      icon: Building2,
      accent: 'bg-[linear-gradient(135deg,#2F5DAA_0%,#F47A2A_100%)]',
      chip: 'bg-[#EEF5FF] text-dwp-blue',
    },
  ]

  return (
    <div className="bg-slate-50">
      <section className="section-y-tight">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-dwp-blue">Detail Layanan</p>
            <h2 className="mt-4 text-4xl font-black text-slate-900">Produk & layanan utama kami</h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Setiap produk dirancang untuk memberikan perlindungan maksimal dan kemudahan operasional bagi bisnis Anda.
            </p>
          </div>

          <div className="mt-12 grid gap-10">
            {sections.map((s, idx) => {
              const item = dictionary.products.items[s.key]
              const Icon = s.icon
              return (
                <FadeIn key={s.key} delay={idx * 0.05} direction="up">
                  <div id={s.key} className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-3 rounded-full bg-[#EEF5FF] px-4 py-2 text-sm font-semibold text-dwp-blue">
                          <Icon className="h-4 w-4" />
                          {item.title}
                        </div>
                        <h3 className="mt-5 text-3xl font-black text-slate-900">{item.title}</h3>
                        <p className="mt-4 max-w-2xl text-base text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className={`flex h-20 w-20 items-center justify-center rounded-[24px] ${s.accent} shadow-[0_18px_40px_rgba(15,23,42,0.12)]`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="mt-10 grid gap-3 md:grid-cols-2">
                      {item.features.map((feature: string) => (
                        <div key={feature} className="rounded-3xl border border-slate-200 bg-[#F8FAFC] px-5 py-4 text-sm text-slate-700">
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm font-semibold text-slate-600">
                        {dictionary.products.consult_cta_prefix}{' '}
                        <span className="font-black text-slate-900">{item.title}</span>
                      </div>
                      <Link
                        href={`/${lang}/contact`}
                        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-7 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.18)] hover:shadow-[0_22px_46px_rgba(47,93,170,0.24)] transition-shadow"
                      >
                        {dictionary.navigation.cta_consult}
                        <ArrowRight className="ml-2 h-4 w-4 text-white" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-y-tight bg-[linear-gradient(135deg,#F8FAFC_0%,#FFFFFF_60%)]">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <FadeIn>
            <div className="rounded-[40px] bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] p-[1px] shadow-[0_24px_80px_rgba(47,83,139,0.18)]">
              <div className="rounded-[39px] bg-white px-8 py-10 sm:px-12 sm:py-12">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-dwp-blue">Bicara dengan tim kami</p>
                    <h2 className="mt-4 text-3xl font-black text-slate-900">Selesaikan kebutuhan penjaminan atau asuransi Anda hari ini.</h2>
                    <p className="mt-4 max-w-2xl text-base text-slate-600 leading-relaxed">
                      Dapatkan rekomendasi produk, estimasi biaya, dan dukungan proses yang cepat dari tim ahli kami.
                    </p>
                  </div>
                  <Link
                    href={`/${lang}/contact`}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-base font-black text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] hover:bg-slate-800 transition"
                  >
                    {dictionary.navigation.cta_consult}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
