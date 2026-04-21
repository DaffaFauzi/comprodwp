import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/dictionaries'
import HeaderClient from '@/components/HeaderClient'

export default async function Header({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return <HeaderClient lang={lang} navigation={dictionary.navigation} />
}
