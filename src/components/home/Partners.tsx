import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import FadeIn from '@/components/FadeIn'
import PartnersTabs from './PartnersTabs'

export default async function Partners({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return (
    <section className="bg-white section-y border-t border-slate-100/50">
      <div className="container mx-auto px-[var(--layout-page-px)]">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-slate-900">
            {dictionary.home.trusted_title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {dictionary.home.trusted_subtitle}
          </p>
          <div className="mt-6 h-[3px] w-24 mx-auto rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal" />
        </FadeIn>

        <PartnersTabs
          insuranceLabel={dictionary.partners.categories.insurance}
          bankLabel={dictionary.partners.categories.bank}
          insurance={dictionary.partners.list.insurance}
          bank={dictionary.partners.list.bank}
        />
      </div>
    </section>
  )
}
