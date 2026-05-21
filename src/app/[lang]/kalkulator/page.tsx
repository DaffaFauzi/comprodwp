import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import SectionHeader from '@/components/SectionHeader'
import KalkulatorClient from './KalkulatorClient'

export default async function KalkulatorPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dictionary = await getDictionary(locale)

  return (
    <div className="bg-white min-h-screen">
      <SectionHeader
        badge={dictionary.navigation.kalkulator}
        title={dictionary.calculatorPage.title}
        subtitle={dictionary.calculatorPage.description}
      />

      <section className="py-16 md:py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-[var(--layout-page-px)]">
          <KalkulatorClient lang={lang} dictionary={dictionary} />
        </div>
      </section>
    </div>
  )
}
