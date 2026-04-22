import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import PartnerMarquee from '@/components/partners/PartnerMarquee'

export const metadata = {
  title: 'Our Partners',
  description: 'List of our trusted insurance and bank partners',
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dictionary = await getDictionary(locale)

  const insuranceBumn = [
    { name: 'Askrindo', fileName: 'askrindo' },
    { name: 'BIN AGRIA', fileName: 'binagria' },
    { name: 'BRINS', fileName: 'brins' },
    { name: 'Jamkrindo', fileName: 'jamkrindo' },
    { name: 'Askrindo Syariah', fileName: 'askrindosyariah' },
    { name: 'Jasaraharja', fileName: 'jasaraharja' },
    { name: 'PLN', fileName: 'pln' },
    { name: 'TRIPA', fileName: 'tripa' },
    { name: 'Tugu', fileName: 'tugu' },
  ]
  const insurancePrivate = [
    { name: 'Rama', fileName: 'rama' },
    { name: 'Awasta', fileName: 'awasta' },
    { name: 'Bumida', fileName: 'bumida' },
    { name: 'Arthagraha', fileName: 'arthagraha' },
    { name: 'Sinarmas', fileName: 'sinarmas' },
    { name: 'Ramayana', fileName: 'ramayana' },
    { name: 'Bosowa', fileName: 'bosowa' },
    { name: 'Videi', fileName: 'videi' },
    { name: 'ACA', fileName: 'aca' },
    { name: 'Megapratama', fileName: 'megapratama' },
    { name: 'Sta Comandiri', fileName: 'stacomandiri' },
    { name: 'Bhakti', fileName: 'bhakti' },
    { name: 'Jastan', fileName: 'jastan' },
  ]

  const bankGovernment = [
    { name: 'Bank Mandiri', fileName: 'mandiri' },
    { name: 'Bank BRI', fileName: 'bri' },
    { name: 'Bank BNI', fileName: 'bni' },
    { name: 'Bank BTN', fileName: 'btn' },
  ]
  const bankPrivate = [
    { name: 'Bank BCA', fileName: 'bca' },
    { name: 'CIMB Niaga', fileName: 'cimb' },
    { name: 'Bank Danamon', fileName: 'danamon' },
    { name: 'Bank Permata', fileName: 'permata' },
  ]

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden rounded-b-[44px] md:rounded-b-[56px] shadow-sm shadow-black/5">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B1220_0%,#111827_55%,#0B1220_100%)]" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.07]" />
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[rgba(0,229,255,0.18)] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-28 -right-24 w-[560px] h-[560px] bg-[rgba(244,122,42,0.16)] rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-[var(--layout-page-px)] relative z-10 pt-14 pb-16 md:pt-16 md:pb-20">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/15 px-6 py-2 text-sm font-semibold text-white/90">
              {dictionary.partners.subtitle}
            </div>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white">
              {dictionary.partners.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed">
              {dictionary.partners.desc}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-y-tight bg-white">
        <div className="container mx-auto px-[var(--layout-page-px)] space-y-10">
          <FadeIn>
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] p-[1px] shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
              <div className="rounded-[27px] bg-white px-8 py-10 sm:px-10 sm:py-12 border border-slate-100/80">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-[#E6F0FF] border border-[#C7D2FE] px-6 py-2 text-sm font-semibold text-[#1E3A8A]">
                    {dictionary.partners.issuing_title}
                  </div>
                  <div className="mt-4">
                    <div className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-black shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                      {dictionary.partners.featured_label}
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-center">
                    <div className="relative w-full max-w-3xl">
                      <div className="absolute -inset-8 bg-[radial-gradient(circle_at_50%_30%,rgba(47,93,170,0.18),transparent_55%),radial-gradient(circle_at_30%_80%,rgba(44,167,164,0.16),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(244,122,42,0.14),transparent_55%)] blur-2xl" />
                      <div className="relative rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-[0_26px_70px_rgba(15,23,42,0.14)] transition-transform hover:-translate-y-1">
                        <div className="mx-auto relative h-28 sm:h-32 w-full">
                          <Image
                            src="/logos/askrida.png"
                            alt="ASKRIDA"
                            fill
                            sizes="(min-width: 1024px) 720px, (min-width: 768px) 560px, 90vw"
                            className="object-contain"
                            priority={false}
                          />
                        </div>
                        <div className="mt-6 text-xs sm:text-sm text-slate-600">
                          {dictionary.partners.featured_partner_desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="rounded-[40px] border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_32px_100px_rgba(15,23,42,0.08)]">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{dictionary.partners.categories.insurance}</div>
              <div className="mt-2 text-sm text-slate-600">{dictionary.partners.groups.insurance_bumn}</div>

              <div className="mt-8 space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50">
                  <div className="text-sm font-semibold text-slate-700 mb-4">{dictionary.partners.groups.insurance_bumn}</div>
                  <div className="overflow-hidden rounded-[28px] bg-white p-4">
                    <PartnerMarquee
                      items={insuranceBumn}
                      type="logo"
                    />
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50">
                  <div className="text-sm font-semibold text-slate-700 mb-4">{dictionary.partners.groups.insurance_private}</div>
                  <div className="overflow-hidden rounded-[28px] bg-white p-4">
                    <PartnerMarquee
                      items={insurancePrivate}
                      type="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="rounded-[40px] border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_32px_100px_rgba(15,23,42,0.08)]">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{dictionary.partners.categories.bank}</div>
              <div className="mt-2 text-sm text-slate-600">{dictionary.partners.groups.bank_government}</div>

              <div className="mt-8 space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50">
                  <div className="text-sm font-semibold text-slate-700 mb-4">{dictionary.partners.groups.bank_government}</div>
                  <div className="overflow-hidden rounded-[28px] bg-white p-4">
                    <PartnerMarquee
                      items={bankGovernment}
                      type="logo"
                    />
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50">
                  <div className="text-sm font-semibold text-slate-700 mb-4">{dictionary.partners.groups.bank_private}</div>
                  <div className="overflow-hidden rounded-[28px] bg-white p-4">
                    <PartnerMarquee
                      items={bankPrivate}
                      type="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
