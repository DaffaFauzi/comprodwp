import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { ShieldCheck, Zap, Users, TrendingUp } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import SafeImage from '@/components/SafeImage'

export default async function WhyChooseUs({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  const icons = [ShieldCheck, Zap, Users, TrendingUp]
  const items = Object.values(dictionary.why_choose_us.items)
  const itemImages = [
    'https://images.unsplash.com/photo-1521791136064-7986c29596ad?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=800&auto=format&fit=crop',
  ]
  const iconBg = [
    'bg-dwp-blue',
    'bg-dwp-teal',
    'bg-dwp-orange',
    'bg-dwp-cyan',
  ]

  return (
    <section className="bg-white section-y">
      <div className="container mx-auto px-[var(--layout-page-px)]">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center rounded-full bg-[#E6F0FF] border border-[#C7D2FE] px-6 py-2 text-sm font-semibold text-[#1E3A8A]">
            {dictionary.home.different_pill}
          </div>
          <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-slate-900">
            {dictionary.home.different_title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {dictionary.home.different_subtitle}
          </p>
          <div className="mt-6 h-[3px] w-24 mx-auto rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal" />
        </FadeIn>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length]
            const image = itemImages[i % itemImages.length]
            const iconColor = iconBg[i % iconBg.length]
            return (
              <FadeIn
                key={item.title}
                delay={i * 0.05}
                className="group rounded-[28px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition-all hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-36 w-full">
                  <SafeImage
                    src={image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-slate-900/5 to-transparent" />
                  <div className="absolute left-5 bottom-5 flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl ${iconColor} flex items-center justify-center shadow-[0_14px_28px_rgba(15,23,42,0.18)] ring-4 ring-white/35`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-white font-black text-base drop-shadow-sm">
                      {item.title}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </div>
                  <div className="mt-6 h-[3px] w-full rounded-full bg-slate-100 group-hover:bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] transition-colors" />
                </div>
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
