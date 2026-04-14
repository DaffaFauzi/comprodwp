'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function LogoTile({
  name,
  fileName,
  folder = '/logos',
  extension = 'png',
  className = '',
}: {
  name: string
  fileName?: string
  folder?: string
  extension?: string
  className?: string
}) {
  const [broken, setBroken] = useState(false)
  const src = useMemo(
    () => `${folder}/${fileName ?? slugify(name)}.${extension}`,
    [folder, extension, fileName, name]
  )

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 shadow-sm shadow-slate-200/60 transition-all hover:-translate-y-0.5 hover:shadow-lg ${className}`}>
      <div className="absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-transparent transition-colors group-hover:bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)]" />
      <div className="h-full w-full flex items-center justify-center">
        {broken ? (
          <div className="text-xs font-black text-slate-700 text-center leading-snug">{name}</div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={name}
              fill
              sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 160px"
              className="object-contain"
              onError={() => setBroken(true)}
              priority={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}

