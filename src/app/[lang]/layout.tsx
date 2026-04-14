import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '@/app/globals.css'
import { i18n, type Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ClientEnhancements } from '@/components/ClientEnhancements'
import AppMotionShell from '@/components/AppMotionShell'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | PT. Dwi Kusuma Perkasa',
    default: 'PT. Dwi Kusuma Perkasa - Insurance & Risk Management Services',
  },
  description: 'Professional insurance and risk management solutions tailored for contractors, businesses, and partners.',
  metadataBase: new URL('https://kusumaperkasa.id'),
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  
  return (
    <html lang={lang} className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <Header lang={lang as Locale} />
        <main className="flex-1">
          <AppMotionShell lang={lang}>{children}</AppMotionShell>
        </main>
        <ClientEnhancements lang={lang} />
        <Footer lang={lang as Locale} />
      </body>
    </html>
  )
}
