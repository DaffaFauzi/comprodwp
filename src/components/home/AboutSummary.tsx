import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { BadgeCheck, HeartHandshake, Focus, Target } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

export default async function AboutSummary({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return (
    <section className="bg-white section-y">
      <div className="container mx-auto px-[var(--layout-page-px)]">
        <div className="mt-14">
          <FadeIn className="h-full" direction="left" delay={0.15}>
            <div className="h-full flex flex-col">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F0FF] border border-[#C7D2FE] px-5 py-2 text-sm font-semibold text-[#1E3A8A]">
                <BadgeCheck className="w-4 h-4" />
                {dictionary.about.mission}
              </div>
              <div className="mt-5 text-3xl font-black text-slate-900">{dictionary.about.mission}</div>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {dictionary.home.about_section.mission_intro}
              </p>

              <div className="mt-8 grid gap-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-dwp-blue flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-black text-slate-900">{dictionary.about.mission_items.trusted.title}</div>
                      <div className="mt-2 text-sm text-slate-600 leading-relaxed">{dictionary.about.mission_items.trusted.desc}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-dwp-blue flex items-center justify-center shrink-0">
                      <BadgeCheck className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-black text-slate-900">{dictionary.about.mission_items.consistent.title}</div>
                      <div className="mt-2 text-sm text-slate-600 leading-relaxed">{dictionary.about.mission_items.consistent.desc}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-dwp-blue flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-black text-slate-900">{dictionary.about.mission_items.commitment.title}</div>
                      <div className="mt-2 text-sm text-slate-600 leading-relaxed">{dictionary.about.mission_items.commitment.desc}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-dwp-blue flex items-center justify-center shrink-0">
                      <Focus className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-black text-slate-900">{dictionary.about.mission_items.focus.title}</div>
                      <div className="mt-2 text-sm text-slate-600 leading-relaxed">{dictionary.about.mission_items.focus.desc}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}