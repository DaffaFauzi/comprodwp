import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import { BootstrapData } from '@/lib/cms'
import HeaderClient from '@/components/HeaderClient'

export default async function Header({ lang, cmsData }: { lang: Locale, cmsData?: BootstrapData | null }) {
  const dictionary = await getDictionary(lang)

  return <HeaderClient lang={lang} navigation={dictionary.navigation} cmsData={cmsData} />
}
