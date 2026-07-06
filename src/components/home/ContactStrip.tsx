import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import { BootstrapData, getCmsSection, getCmsAssetUrl } from '@/lib/cms'
import { Mail, MapPin, Phone } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'
import SafeImage from '@/components/SafeImage'

export default async function ContactStrip({ lang, cmsData }: { lang: Locale, cmsData?: BootstrapData | null }) {
  const dictionary = await getDictionary(lang)
  const contactInfo = cmsData?.settings?.contact || {}
  
  const section = getCmsSection(cmsData?.sections, 'contact_strip')
  const content = (section?.content || {}) as any
  
  const titleLine1 = content.title_lines?.line1 || dictionary.contact.home_strip.title_line1
  const titleLine2 = content.title_lines?.line2 || dictionary.contact.home_strip.title_line2
  const subtitle = content.subtitle || dictionary.contact.home_strip.subtitle
  const phone = contactInfo.phone || dictionary.contact.phone
  const email = contactInfo.email || dictionary.contact.email
  const address = contactInfo.address || dictionary.contact.home_strip.office_value

  return (
    <section className="bg-white section-y">
      <div className="container mx-auto px-[var(--layout-page-px)]">
        <div className="rounded-[2.75rem] bg-[linear-gradient(135deg,rgba(47,93,170,0.10)_0%,rgba(44,167,164,0.12)_55%,rgba(244,122,42,0.10)_100%)] p-[1px] shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
          <div className="rounded-[2.65rem] bg-white overflow-hidden">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                  <SafeImage
                    src={getCmsAssetUrl(section?.assets?.[0]?.path) || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"}
                    alt={
                      lang === 'id'
                        ? 'Tim DWP sedang berdiskusi dengan klien bisnis'
                        : 'DWP team discussing with business clients'
                    }
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1630]/85 via-[#0B1630]/60 to-dwp-teal/60" />
                </div>

                <div className="relative p-10 sm:p-12 lg:p-14 text-white">
                  <FadeIn direction="right">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05]">
                      <span className="block">{titleLine1}</span>
                      <span className="block">{titleLine2}</span>
                    </h2>
                    <p className="mt-5 text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                      {subtitle}
                    </p>

                    <div className="mt-8 grid gap-4 max-w-md">
                      <div className="rounded-2xl bg-white/10 border border-white/15 px-5 py-4 backdrop-blur">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-2xl bg-white/16 border border-white/20 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-white/75 tracking-[0.14em] uppercase">
                              {dictionary.contact.phone_label}
                            </div>
                            <div className="mt-1 text-sm font-bold text-white">{phone}</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/10 border border-white/15 px-5 py-4 backdrop-blur">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-2xl bg-white/16 border border-white/20 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-white/75 tracking-[0.14em] uppercase">
                              {dictionary.contact.email_label}
                            </div>
                            <div className="mt-1 text-sm font-bold text-white">{email}</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/10 border border-white/15 px-5 py-4 backdrop-blur">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-2xl bg-white/16 border border-white/20 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-white/75 tracking-[0.14em] uppercase">
                              {dictionary.contact.home_strip.office_label}
                            </div>
                            <div className="mt-1 text-sm font-bold text-white">
                              {address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>

              <div className="bg-white p-8 sm:p-10 lg:p-12">
                <FadeIn direction="left" delay={0.1}>
                  <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/60">
                    <ContactForm dictionary={dictionary} />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
