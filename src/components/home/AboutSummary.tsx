import Link from 'next/link'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n-config'
import { BadgeCheck, ArrowRight, Target, ShieldCheck, HeartHandshake, Focus } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import SafeImage from '@/components/SafeImage'

export default async function AboutSummary({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang)
  const about = dictionary.home.about_section
  type MissionItem = { title: string; desc: string }

  const missionIcons = {
    trusted: HeartHandshake,
    consistent: ShieldCheck,
    commitment: Target,
    focus: Focus
  }

  return (
    <section className="bg-[var(--surface)] section-y overflow-hidden">
      <div className="container mx-auto px-[var(--layout-page-px)]">
        
        {/* 1. Company Introduction */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-24">
          <div className="order-2 lg:order-1">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 rounded-full bg-dwp-blue/5 border border-dwp-blue/10 px-4 py-2 text-sm font-bold text-dwp-blue mb-5">
                <BadgeCheck className="w-4 h-4" />
                {about.pill}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-5">
                PT. Dwi Kusuma Perkasa
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl text-justify">
                {about.desc}
              </p>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group">
                <SafeImage
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                  alt="PT. Dwi Kusuma Perkasa Corporate Building"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-dwp-blue/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 2 & 3. Vision & Mission Section (2-Column Grid) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: VISION */}
          <FadeIn direction="up">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-dwp-blue rounded-full" />
              {about.vision_title}
            </h3>
            <div className="relative pl-6 border-l-4 border-dwp-blue/20">
              <p className="text-xl font-bold text-slate-800 leading-relaxed italic max-w-lg text-center sm:text-justify">
                &ldquo;{about.vision_text}&rdquo;
              </p>
            </div>
          </FadeIn>

          {/* Right Column: MISSION */}
          <FadeIn direction="up" delay={0.2}>
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-dwp-teal rounded-full" />
              {about.mission_title}
            </h3>
            
            <div className="grid gap-6">
              {Object.entries(about.mission_items as Record<string, MissionItem>).map(([key, item]) => {
                const Icon = missionIcons[key as keyof typeof missionIcons] || BadgeCheck
                return (
                  <div key={key} className="flex gap-4 group">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-dwp-blue group-hover:bg-dwp-blue/10 group-hover:border-dwp-blue/20 transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 mb-1 group-hover:text-dwp-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>

        {/* 4. CTA Button (Centered) */}
        <div className="mt-12 md:mt-16 lg:mt-20 flex justify-center">
          <FadeIn direction="up">
            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] px-8 py-4 text-sm sm:text-base font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.22)] transition-all hover:shadow-[0_22px_46px_rgba(47,93,170,0.28)] group"
            >
              {about?.cta || (lang === 'id' ? 'Pelajari Lebih Lanjut' : 'Learn More')}
              <ArrowRight className="ml-2 h-5 w-5 text-white" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
