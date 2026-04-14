import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  id: () => import('@/dictionaries/id.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: Locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]()
  }
  // Fallback to default locale (id) if the requested locale is not found
  // This handles cases where static assets might be routed here by mistake
  return dictionaries.id()
}
