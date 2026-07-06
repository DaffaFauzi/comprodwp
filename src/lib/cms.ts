import { Locale } from '@/i18n-config'

export interface CmsResponse<T> {
  data: T
  meta?: Record<string, unknown>
}

export interface CmsCompany {
  id: number
  name: string
  slug: string
}

export interface CmsSection {
  id: number
  key: string
  title: string
  sort_order: number
  content: Record<string, unknown> | null
  assets: Array<{ path: string }> | null
}

export interface CmsPage {
  id: number
  title: string
  slug: string
  meta_title: string
  meta_description: string
  published_at: string | null
}

export interface CmsSettings {
  branding: Record<string, unknown> | null
  contact: Record<string, string> | null
  social: Record<string, string> | null
  seo: Record<string, unknown> | null
  footer: Array<unknown> | null
}

export interface CmsMenus {
  header: Array<{ url: string; label: string }> | null
  footer: Array<{ url: string; label: string }> | null
}

export interface BootstrapData {
  company: CmsCompany
  settings: CmsSettings
  menus: CmsMenus
  page: CmsPage
  sections: CmsSection[]
}

const API_BASE_URL = process.env.CMS_API_BASE_URL || 'http://127.0.0.1:8000/api'
const COMPANY_SLUG = process.env.CMS_COMPANY_SLUG || 'dwp'

export async function getCmsBootstrap(pageSlug: string = 'home', locale: Locale = 'id'): Promise<BootstrapData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/sites/${COMPANY_SLUG}/bootstrap?page=${pageSlug}&locale=${locale}`, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!res.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`CMS API returned ${res.status} for ${pageSlug}`)
      }
      return null
    }

    const json = await res.json()
    return json.data as BootstrapData
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to fetch CMS data:', error)
    }
    return null
  }
}

export function getCmsSection(sections: CmsSection[] | undefined, key: string): CmsSection | null {
  if (!sections) return null
  return sections.find((s) => s.key === key) || null
}

export function getCmsAssetUrl(path: string | undefined | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  const baseUrl = process.env.CMS_API_BASE_URL ? process.env.CMS_API_BASE_URL.replace('/api', '') : 'http://127.0.0.1:8000'
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`
}
