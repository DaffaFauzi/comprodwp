import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import { Clock, Download, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | PT. Dwi Kusuma Perkasa',
  description: 'Get in touch with PT. Dwi Kusuma Perkasa for insurance consultation',
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dictionary = await getDictionary(locale)

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden section-y-tight">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAFC] via-white to-white" />
        <div className="absolute -top-28 -left-28 w-[520px] h-[520px] bg-[rgba(0,229,255,0.08)] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-28 -right-28 w-[560px] h-[560px] bg-[rgba(244,122,42,0.06)] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />

        <div className="container mx-auto px-[var(--layout-page-px)] relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center rounded-full bg-[#EEF5FF] px-6 py-2 text-sm font-semibold text-dwp-blue">
              {dictionary.contact.subtitle}
            </div>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-slate-900">
              {dictionary.contact.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              {dictionary.contact.form.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-y-tight bg-white">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(47,93,170,0.16)_0%,rgba(44,167,164,0.14)_55%,rgba(244,122,42,0.10)_100%)] p-[1px] shadow-[0_22px_60px_rgba(15,23,42,0.10)]">
            <div className="rounded-[27px] bg-white border border-slate-100/80 px-7 py-7 sm:px-10 sm:py-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <FadeIn direction="right">
                  <div className="space-y-7">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                        <span className="block">{dictionary.contact.page_heading_line1}</span>
                        <span className="block">{dictionary.contact.page_heading_line2}</span>
                      </div>
                      <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {dictionary.contact.cta_strip.title}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="group rounded-2xl border border-slate-200 bg-[#F7FAFC] px-6 py-5 shadow-sm shadow-slate-200/40 transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_100%)] flex items-center justify-center shadow-[0_14px_28px_rgba(15,23,42,0.10)]">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-black text-slate-900 tracking-wider uppercase">{dictionary.contact.address_label}</div>
                            <div className="mt-2 text-sm text-slate-700 leading-relaxed">{dictionary.contact.address}</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="group rounded-2xl border border-slate-200 bg-[#F7FAFC] px-6 py-5 shadow-sm shadow-slate-200/40 transition-all hover:-translate-y-0.5 hover:shadow-md">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#2CA7A4_0%,#F47A2A_100%)] flex items-center justify-center shadow-[0_14px_28px_rgba(15,23,42,0.10)]">
                              <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-black text-slate-900 tracking-wider uppercase">{dictionary.contact.phone_label}</div>
                              <div className="mt-2 text-sm font-semibold text-slate-700">{dictionary.contact.phone}</div>
                            </div>
                          </div>
                        </div>

                        <div className="group rounded-2xl border border-slate-200 bg-[#F7FAFC] px-6 py-5 shadow-sm shadow-slate-200/40 transition-all hover:-translate-y-0.5 hover:shadow-md">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#F47A2A_0%,#4B5CC4_100%)] flex items-center justify-center shadow-[0_14px_28px_rgba(15,23,42,0.10)]">
                              <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-black text-slate-900 tracking-wider uppercase">{dictionary.contact.email_label}</div>
                              <div className="mt-2 text-sm font-semibold text-slate-700">{dictionary.contact.email}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="group rounded-2xl border border-slate-200 bg-[#F7FAFC] px-6 py-5 shadow-sm shadow-slate-200/40 transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#2F5DAA_0%,#F47A2A_100%)] flex items-center justify-center shadow-[0_14px_28px_rgba(15,23,42,0.10)]">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-black text-slate-900 tracking-wider uppercase">{dictionary.contact.operational_hours.label}</div>
                            <div className="mt-2 text-sm text-slate-700 leading-relaxed">{dictionary.contact.operational_hours.time}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                      <div className="text-sm font-black text-slate-900">{dictionary.footer.social_title}</div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {[
                          { label: 'LinkedIn', handle: 'PT. Dwi Kusuma Perkasa', href: 'https://linkedin.com', icon: Linkedin },
                          { label: 'Facebook', handle: 'PT. Dwi Kusuma Perkasa', href: 'https://facebook.com', icon: Facebook },
                          { label: 'Instagram', handle: '@dwikusumaperkasa', href: 'https://instagram.com', icon: Instagram },
                        ].map((s) => {
                          const Icon = s.icon
                          return (
                            <a
                              key={s.label}
                              href={s.href}
                              target="_blank"
                              rel="noreferrer"
                              className="group rounded-2xl border border-slate-200 bg-[#F7FAFC] p-4 text-center shadow-sm shadow-slate-200/50 transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                              <div className="w-12 h-12 mx-auto rounded-2xl bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] flex items-center justify-center shadow-[0_14px_28px_rgba(15,23,42,0.10)]">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="mt-3 text-xs font-black text-slate-900">{s.label}</div>
                              <div className="mt-1 text-xs text-slate-600 truncate">{s.handle}</div>
                            </a>
                          )
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] hover:shadow-[0_22px_46px_rgba(15,23,42,0.24)] transition-shadow"
                    >
                      <Download className="mr-2 h-4 w-4 text-white" />
                      {dictionary.contact.download_company_profile}
                    </button>
                  </div>
                </FadeIn>

                <FadeIn direction="left" delay={0.1}>
                  <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/60">
                    <ContactForm dictionary={dictionary} />
                  </div>
                </FadeIn>
              </div>

              <div className="mt-10 rounded-3xl overflow-hidden border border-slate-200 bg-slate-200 shadow-sm shadow-slate-200/60">
                <div className="w-full h-[320px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.988869131666!2d106.8528653!3d-6.1433722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f59265721111%3A0x6290740625647726!2sThe%20Mansion%20Bougenville!5e0!3m2!1sen!2sid!4v1709628000000!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
