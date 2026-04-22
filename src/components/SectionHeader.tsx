import FadeIn from '@/components/FadeIn'

export default function SectionHeader({
  title,
  subtitle,
  badge,
}: {
  title: string
  subtitle: string
  badge?: string
}) {
  return (
    <section className="relative overflow-hidden rounded-b-[44px] md:rounded-b-[56px]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B1220_0%,#111827_55%,#0B1220_100%)]" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.07]" />
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[rgba(0,229,255,0.18)] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-28 -right-24 w-[560px] h-[560px] bg-[rgba(244,122,42,0.16)] rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-[var(--layout-page-px)] relative z-10 pt-14 pb-16 md:pt-16 md:pb-20">
        <FadeIn className="text-center max-w-3xl mx-auto" direction="up">
          {badge ? (
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/15 px-6 py-2 text-sm font-semibold text-white/90">
              {badge}
            </div>
          ) : null}
          <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
