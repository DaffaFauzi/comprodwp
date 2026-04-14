import { Locale } from '@/i18n-config'
import Hero from '@/components/home/Hero'
import AboutSummary from '@/components/home/AboutSummary'
import Services from '@/components/home/Services'
import Process from '@/components/home/Process'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ContactStrip from '@/components/home/ContactStrip'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  
  return (
    <>
      <Hero lang={locale} />
      <AboutSummary lang={locale} />
      <Services lang={locale} />
      <WhyChooseUs lang={locale} />
      <Process lang={locale} />
      <ContactStrip lang={locale} />
    </>
  )
}
