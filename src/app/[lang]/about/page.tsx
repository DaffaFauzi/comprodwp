import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import Link from 'next/link'
import { BadgeCheck, Focus, HeartHandshake, Sparkles, Target } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import VisionCard from '@/components/home/VisionCard'
import SectionHeader from '@/components/SectionHeader'
import OrgStructure from '@/components/OrgStructure'
import BranchesDirectory from '@/components/BranchesDirectory'

export const metadata = {
  title: 'About Us | PT. Dwi Kusuma Perkasa',
  description: 'Company overview, vision, mission, values, and compliance information of PT. Dwi Kusuma Perkasa.',
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dictionary = await getDictionary(locale)

  return (
    <div className="bg-white">
      <SectionHeader
        badge={dictionary.about.page.pill}
        title={dictionary.about.page.title}
        subtitle={dictionary.about.page.lead}
      />

      <section className="section-y-tight bg-white">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <FadeIn direction="right">
              <VisionCard
                chipLabel={locale === 'id' ? 'Visi' : dictionary.about.vision}
                title={dictionary.about.vision}
                text={dictionary.about.vision_desc}
                moreLabel={dictionary.home.about_section.vision_more}
                closeLabel={dictionary.home.about_section.vision_close}
                imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                imageAlt="Corporate building"
              />
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="rounded-[28px] border border-slate-200 bg-white p-7 sm:p-8 shadow-sm shadow-slate-200/60 transition-all hover:shadow-xl hover:shadow-slate-200/70">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF5FF] px-5 py-2 text-sm font-semibold text-dwp-blue">
                  <BadgeCheck className="w-4 h-4" />
                  {locale === 'id' ? 'Misi Perusahaan' : dictionary.about.mission}
                </div>
                <div className="mt-5 text-2xl sm:text-3xl font-black text-slate-900">{dictionary.about.mission}</div>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {dictionary.home.about_section.mission_intro}
                </p>

                <div className="mt-8 divide-y divide-slate-200/70">
                  {(
                    [
                      { key: 'trusted', icon: HeartHandshake, bg: 'bg-[linear-gradient(135deg,#2CA7A4_0%,#F47A2A_100%)]' },
                      { key: 'consistent', icon: BadgeCheck, bg: 'bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_100%)]' },
                      { key: 'commitment', icon: Target, bg: 'bg-[linear-gradient(135deg,#F47A2A_0%,#4B5CC4_100%)]' },
                      { key: 'focus', icon: Focus, bg: 'bg-[linear-gradient(135deg,#2F5DAA_0%,#F47A2A_100%)]' },
                    ] as const
                  ).map((it) => {
                    const Icon = it.icon
                    const item = dictionary.about.mission_items[it.key]
                    return (
                      <div key={it.key} className="py-5 first:pt-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <div className={`h-11 w-11 rounded-2xl ${it.bg} flex items-center justify-center shrink-0 shadow-[0_14px_28px_rgba(15,23,42,0.10)]`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-base font-black text-slate-900">{item.title}</div>
                            <div className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-7 h-[3px] w-24 rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <OrgStructure dict={dictionary} />

      <section className="section-y-tight bg-white">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <FadeIn>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm shadow-slate-200/60">
              <div className="inline-flex items-center justify-center rounded-full bg-[#EEF5FF] px-5 py-2 text-sm font-semibold text-dwp-blue">
                {dictionary.about.page.history_pill}
              </div>
              <div className="mt-6 text-3xl sm:text-4xl font-black text-slate-900">{dictionary.about.timeline.title}</div>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {dictionary.about.page.history_subtitle}
              </p>
              <div className="mt-8 grid gap-5">
                {dictionary.about.timeline.items.map((t: { year: string; title: string; desc: string }) => (
                  <div key={`${t.year}-${t.title}`} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs font-black text-slate-900">
                        {t.year}
                      </div>
                      <div className="min-w-0">
                        <div className="text-base font-black text-slate-900">{t.title}</div>
                        <div className="mt-2 text-sm text-slate-600 leading-relaxed">{t.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y-tight bg-[#F7FAFC]">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <FadeIn>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm shadow-slate-200/60">
              <div className="inline-flex items-center justify-center rounded-full bg-[#EEF5FF] px-5 py-2 text-sm font-semibold text-dwp-blue">
                {dictionary.about.page.branches_pill}
              </div>
              <div className="mt-6 text-3xl sm:text-4xl font-black text-slate-900">{dictionary.about.page.branches_title}</div>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {dictionary.about.page.branches_subtitle}
              </p>

              <BranchesDirectory
                branches={dictionary.about.page.branches_list ?? []}
                phoneLabel={dictionary.contact.phone_label}
                locale={locale}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y-tight bg-[#F7FAFC]">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center rounded-full bg-white border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-slate-200/60">
              {dictionary.about.page.values_pill}
            </div>
            <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-slate-900">
              {dictionary.about.page.values_title}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {dictionary.about.page.values_subtitle}
            </p>
          </FadeIn>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {(
              [
                { key: 'professional', icon: BadgeCheck, bg: 'bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_100%)]' },
                { key: 'technology', icon: Sparkles, bg: 'bg-[linear-gradient(135deg,#2CA7A4_0%,#F47A2A_100%)]' },
                { key: 'client_satisfaction', icon: HeartHandshake, bg: 'bg-[linear-gradient(135deg,#F47A2A_0%,#4B5CC4_100%)]' },
              ] as const
            ).map((it, idx) => {
              const Icon = it.icon
              const item = dictionary.why_choose_us.items[it.key]
              return (
                <FadeIn key={it.key} delay={idx * 0.05} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/60 transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className={`h-12 w-12 rounded-2xl ${it.bg} flex items-center justify-center shadow-[0_14px_28px_rgba(15,23,42,0.10)]`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="mt-6 text-lg font-black text-slate-900">{item.title}</div>
                    <div className="mt-3 text-sm text-slate-600 leading-relaxed">{item.desc}</div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-y-tight bg-white">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] p-[1px] shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
            <div className="rounded-[27px] bg-white px-8 py-10 sm:px-10 sm:py-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <p className="mb-3 inline-flex items-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_26px_rgba(47,93,170,0.20)]">
                    {locale === 'id' ? 'Butuh bantuan memilih produk?' : 'Need help choosing a product?'}
                  </p>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{dictionary.about.page.cta_title}</div>
                  <div className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                    {dictionary.about.page.cta_desc}
                  </div>
                </div>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-8 py-4 text-base font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.22)] hover:shadow-[0_22px_46px_rgba(47,93,170,0.28)] transition-shadow"
                >
                  {dictionary.about.page.cta_button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
