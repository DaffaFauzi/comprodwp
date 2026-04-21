import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { MessageSquare, Search, FileText, CheckCircle2 } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

export default async function Process({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  const steps = [
    {
      id: '1',
      icon: MessageSquare,
      iconBg: 'bg-[#EAF1FF]',
      iconColor: 'text-[#2F5DAA]',
      badgeBg: 'bg-[#2F5DAA]',
      underline: 'after:bg-[#2F5DAA]',
    },
    {
      id: '2',
      icon: Search,
      iconBg: 'bg-[#E6F7F6]',
      iconColor: 'text-[#2CA7A4]',
      badgeBg: 'bg-[#2CA7A4]',
      underline: 'after:bg-[#2CA7A4]',
    },
    {
      id: '3',
      icon: FileText,
      iconBg: 'bg-[#FFF1E9]',
      iconColor: 'text-[#F47A2A]',
      badgeBg: 'bg-[#F47A2A]',
      underline: 'after:bg-[#F47A2A]',
    },
    {
      id: '4',
      icon: CheckCircle2,
      iconBg: 'bg-[#EAF1FF]',
      iconColor: 'text-[#2F5DAA]',
      badgeBg: 'bg-[#2F5DAA]',
      underline: 'after:bg-[#2F5DAA]',
    },
  ]

  return (
    <section className="bg-[#F7FAFC] section-y relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[720px] h-[720px] bg-dwp-blue/4 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[720px] h-[720px] bg-dwp-orange/4 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-[var(--layout-page-px)] relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center rounded-full bg-[#E6F0FF] border border-[#C7D2FE] px-6 py-2 text-sm font-semibold text-[#1E3A8A]">
            {dictionary.home.process_pill}
          </div>
          <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-slate-900">
            {dictionary.home.process_title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {dictionary.home.process_subtitle}
          </p>
          <div className="mt-7 h-[3px] w-24 mx-auto rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal" />
        </FadeIn>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {steps.map((step, index) => {
            const item = dictionary.process.steps[step.id as keyof typeof dictionary.process.steps]
            const Icon = step.icon
            return (
              <FadeIn key={step.id} delay={index * 0.05} className="h-full">
                <div
                  className={`group relative h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 after:absolute after:left-7 after:right-7 after:bottom-0 after:h-[3px] after:rounded-full after:opacity-0 after:transition-opacity group-hover:after:opacity-100 ${step.underline}`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-black text-white shadow-sm ${step.badgeBg}`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`w-12 h-12 rounded-2xl ${step.iconBg} flex items-center justify-center transition-transform group-hover:scale-[1.04]`}>
                      <Icon className={`w-6 h-6 ${step.iconColor}`} />
                    </div>
                  </div>

                  <div className="mt-6 text-left">
                    <div className="text-lg font-black text-slate-900 leading-snug">{item.title}</div>
                    <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

      </div>
    </section>
  )
}
