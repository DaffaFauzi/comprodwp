import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { ShieldCheck, Zap, Users, TrendingUp } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

export default async function WhyChooseUs({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  const icons = [ShieldCheck, Zap, Users, TrendingUp]
  const items = Object.values(dictionary.why_choose_us.items)
  const iconBg = [
    'bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_100%)]',
    'bg-[linear-gradient(135deg,#2CA7A4_0%,#F47A2A_100%)]',
    'bg-[linear-gradient(135deg,#F47A2A_0%,#4B5CC4_100%)]',
    'bg-[linear-gradient(135deg,#2CA7A4_0%,#F47A2A_100%)]',
  ]

  return (
    <section className="bg-white section-y">
      <div className="container mx-auto px-[var(--layout-page-px)]">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center rounded-full bg-[#E6F0FF] border border-[#C7D2FE] px-6 py-2 text-sm font-semibold text-[#1E3A8A]">
            {dictionary.home.different_pill}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-slate-900">
            {dictionary.home.different_title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {dictionary.home.different_subtitle}
          </p>
          <div className="mt-6 h-[3px] w-24 mx-auto rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal" />
        </FadeIn>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <FadeIn
                key={item.title}
                delay={i * 0.05}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/60 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl ${iconBg[i % iconBg.length]} flex items-center justify-center shrink-0 shadow-[0_14px_28px_rgba(15,23,42,0.10)]`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-black text-slate-900">{item.title}</div>
                    <div className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
                <div className="mt-6 h-[3px] w-full rounded-full bg-transparent group-hover:bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] transition-colors" />
              </FadeIn>
            )
          })}
        </div>

        <FadeIn
          className="mt-12 rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,rgba(47,93,170,0.06)_0%,rgba(44,167,164,0.06)_40%,rgba(244,122,42,0.06)_100%)] p-6 sm:p-8 shadow-sm shadow-slate-200/60"
          delay={0.1}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(dictionary.home.stats).map((s, idx) => (
              <div key={s.label} className="text-center">
                <div
                  className={`text-2xl sm:text-3xl font-black ${
                    idx === 0
                      ? 'text-dwp-blue'
                      : idx === 1
                        ? 'text-dwp-teal'
                        : idx === 2
                          ? 'text-dwp-orange'
                          : 'text-dwp-cyan'
                  }`}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
