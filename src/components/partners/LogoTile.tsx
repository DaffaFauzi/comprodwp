'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

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
    <motion.div 
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      }}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 shadow-sm shadow-slate-200/60 transition-all duration-300 ${className}`}
    >
      <div className="h-full w-full flex items-center justify-center">
        {broken ? (
          <div className="text-xs font-black text-slate-700 text-center leading-snug">{name}</div>
        ) : (
          <div className="relative h-full w-full pointer-events-none">
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
    </motion.div>
  )
}
