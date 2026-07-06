import { Locale } from '@/i18n-config'
import Hero from '@/components/home/Hero'
import AboutSummary from '@/components/home/AboutSummary'
import Services from '@/components/home/Services'
import Process from '@/components/home/Process'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ContactStrip from '@/components/home/ContactStrip'
import { getCmsBootstrap } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  const cmsData = await getCmsBootstrap('home', locale)

  return (
    <>
      <Hero lang={locale} cmsData={cmsData} />
      <AboutSummary lang={locale} cmsData={cmsData} />
      <Services lang={locale} cmsData={cmsData} />
      <WhyChooseUs lang={locale} />
      <Process lang={locale} />
      <ContactStrip lang={locale} cmsData={cmsData} />
    </>
  )
}
