'use client'

import SafeImage from '@/components/SafeImage'

export default function VisionCard({
  chipLabel,
  title,
  text,
  imageSrc = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  imageAlt = 'Office building',
}: {
  chipLabel: string
  title: string
  text: string
  moreLabel?: string
  closeLabel?: string
  imageSrc?: string
  imageAlt?: string
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70 h-full flex flex-col">
      <div className="relative h-48 sm:h-56">
        <SafeImage
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent" />
        <div className="absolute left-6 top-6 flex items-center gap-3">
          <div className="inline-flex items-center self-start rounded-full bg-white/95 border border-white/60 px-4 py-2 text-sm font-black text-slate-900 shadow-sm shadow-black/5">
            {chipLabel}
          </div>
        </div>
      </div>

      <div className="px-7 py-7 sm:px-8 sm:py-8 flex flex-col flex-1">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{title}</div>
        <div className="mt-5 flex-1">
          <p className="text-base leading-relaxed text-slate-600 text-center sm:text-justify whitespace-normal break-words">
            {text}
          </p>
        </div>
        <div className="mt-8 h-[4px] w-20 rounded-full bg-gradient-to-r from-dwp-blue to-dwp-teal shadow-sm shadow-dwp-blue/20" />
      </div>
    </div>
  )
}
