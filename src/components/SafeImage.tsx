'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'

export default function SafeImage({ 
  src, 
  alt, 
  fallbackSrc = DEFAULT_FALLBACK, 
  className,
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={`${className} ${hasError ? 'opacity-80' : ''}`}
      onError={() => {
        if (!hasError) {
          setImgSrc(fallbackSrc)
          setHasError(true)
        }
      }}
    />
  )
}
