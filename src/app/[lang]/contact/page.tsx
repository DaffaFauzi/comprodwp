import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import { Clock, Download, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'
import SafeImage from '@/components/SafeImage'
import SectionHeader from '@/components/SectionHeader'

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
      <SectionHeader
        badge={dictionary.contact.subtitle}
        title={dictionary.contact.title}
        subtitle={dictionary.contact.form.subtitle}
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-[var(--layout-page-px)]">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(47,93,170,0.16)_0%,rgba(44,167,164,0.14)_55%,rgba(244,122,42,0.10)_100%)] p-[1px] shadow-[0_22px_60px_rgba(15,23,42,0.10)]">
            <div className="rounded-[27px] bg-white border border-slate-100/80 px-7 py-7 sm:px-10 sm:py-10">
              <FadeIn direction="up">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                    <span className="block">{dictionary.contact.page_heading_line1}</span>
                    <span className="block">{dictionary.contact.page_heading_line2}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed max-w-2xl">
                    {dictionary.contact.cta_strip.title}
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <div className="md:col-span-2 lg:col-span-3 flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_rgba(15,23,42,0.14)]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-500">{dictionary.contact.address_label}</div>
                        <div className="mt-2 text-sm text-slate-700 leading-relaxed">{dictionary.contact.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_rgba(15,23,42,0.14)]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-500">{dictionary.contact.phone_label}</div>
                        <div className="mt-2 text-sm font-semibold text-slate-800">{dictionary.contact.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_rgba(15,23,42,0.14)]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-500">{dictionary.contact.email_label}</div>
                        <div className="mt-2 text-sm font-semibold text-slate-800 break-all">{dictionary.contact.email}</div>
                      </div>
                    </div>

                    <div className="md:col-span-2 lg:col-span-1 flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_rgba(15,23,42,0.14)]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-500">{dictionary.contact.operational_hours.label}</div>
                        <div className="mt-2 text-sm text-slate-700 leading-relaxed">{dictionary.contact.operational_hours.time}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                    <div className="text-sm font-bold text-slate-900">{dictionary.footer.social_title}</div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        { label: 'LinkedIn', handle: 'PT. Dwi Kusuma Perkasa', href: 'https://www.linkedin.com/in/dwi-kusuma-perkasa-191543402?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: Linkedin },
                        { label: 'Instagram', handle: '@pt.dwikusumaperkasa', href: 'https://www.instagram.com/pt.dwikusumaperkasa?igsh=MWdwbHVldGVnZWMxZQ==', icon: Instagram },
                      ].map((s) => {
                        const Icon = s.icon
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm shadow-slate-200/40 transition-shadow hover:shadow-md"
                          >
                            <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center shadow-[0_10px_22px_rgba(15,23,42,0.14)]">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="mt-3 text-xs font-bold text-slate-900">{s.label}</div>
                            <div className="mt-1 text-[11px] text-slate-600 truncate">{s.handle}</div>
                          </a>
                        )
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-4 w-full inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] hover:shadow-[0_22px_46px_rgba(15,23,42,0.24)] transition-shadow"
                  >
                    <Download className="mr-2 h-4 w-4 text-white" />
                    {dictionary.contact.download_company_profile}
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="mt-16 rounded-[28px] bg-gradient-to-br from-slate-50 to-white py-12 md:py-16 border border-slate-100/80 shadow-sm shadow-slate-200/50">
            <div className="px-6 sm:px-8">
              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                <FadeIn direction="right">
                  <div className="bg-white rounded-2xl shadow-lg p-7 sm:p-8 border border-slate-200/70 h-full">
                    <ContactForm dictionary={dictionary} />
                  </div>
                </FadeIn>

                <FadeIn direction="left" delay={0.1}>
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm shadow-slate-200/60 h-full min-h-[420px] bg-slate-900">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1100&auto=format&fit=crop"
                      alt={
                        locale === 'id'
                          ? 'Tim DWP berdiskusi dengan klien bisnis di ruang meeting'
                          : 'DWP team discussing with business clients in a meeting room'
                      }
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1630]/75 via-transparent to-dwp-teal/40" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="text-lg md:text-xl font-semibold max-w-md leading-snug">
                        {locale === 'id'
                          ? 'Ceritakan kebutuhan bisnis Anda, kami bantu merancang solusi penjaminan dan asuransi yang tepat.'
                          : 'Share your business needs and we will design the right bonding and insurance solution.'}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-semibold text-white/85">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/15">
                          <span className="h-2 w-2 rounded-full bg-emerald-300" />
                          {locale === 'id' ? 'Respon maksimal 1x24 jam' : 'Response within 1x24 hours'}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/15">
                          <span className="h-2 w-2 rounded-full bg-sky-300" />
                          {locale === 'id' ? 'Data dan dokumen dijaga kerahasiaannya' : 'Confidential data and documents'}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/15">
                          <span className="h-2 w-2 rounded-full bg-amber-300" />
                          {locale === 'id' ? 'Prioritas untuk kebutuhan korporasi' : 'Priority for corporate clients'}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 bg-slate-200 shadow-sm shadow-slate-200/60">
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
      </section>
    </div>
  )
}
