'use client'

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
    <div className={`logo-card ${className}`}>
      {broken ? (
        <div className="logo-card__fallback">{name}</div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={name}
          className="logo-card__img"
          onError={() => setBroken(true)}
          loading="lazy"
        />
      )}
    </div>
  )
}
