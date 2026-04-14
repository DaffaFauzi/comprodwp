import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import { Mail, MapPin, Phone } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'

export default async function ContactStrip({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return (
    <section className="section-y bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)]">
      <div className="container mx-auto px-[var(--layout-page-px)]">
        <div className="rounded-[2.75rem] bg-white/10 border border-white/15 overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.20)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative p-10 sm:p-12 lg:p-14 text-white">
              <div className="absolute inset-0 opacity-[0.08] bg-[url('/grid-pattern.svg')]" />
              <FadeIn className="relative" direction="right">
                <h2 className="text-4xl sm:text-5xl font-black leading-[1.05]">
                  <span className="block">{dictionary.contact.home_strip.title_line1}</span>
                  <span className="block">{dictionary.contact.home_strip.title_line2}</span>
                </h2>
                <p className="mt-5 text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                  {dictionary.contact.home_strip.subtitle}
                </p>

                <div className="mt-10 grid gap-4 max-w-md">
                  <div className="rounded-2xl bg-white/12 border border-white/15 px-5 py-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-2xl bg-white/16 border border-white/15 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white/80">{dictionary.contact.phone_label}</div>
                        <div className="mt-1 text-sm font-bold text-white">{dictionary.contact.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/12 border border-white/15 px-5 py-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-2xl bg-white/16 border border-white/15 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white/80">{dictionary.contact.email_label}</div>
                        <div className="mt-1 text-sm font-bold text-white">{dictionary.contact.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/12 border border-white/15 px-5 py-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-2xl bg-white/16 border border-white/15 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white/80">{dictionary.contact.home_strip.office_label}</div>
                        <div className="mt-1 text-sm font-bold text-white">{dictionary.contact.home_strip.office_value}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="p-8 sm:p-10 lg:p-12 bg-white">
              <FadeIn direction="left" delay={0.1}>
                <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/60">
                  <ContactForm dictionary={dictionary} />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
