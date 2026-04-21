'use client'

import { useRef, useEffect, useCallback } from 'react'
import LogoTile from './LogoTile'

type LogoItem = { name: string; fileName: string }
type PartnerItem = string | LogoItem

interface PartnerMarqueeProps {
  items: PartnerItem[]
  type?: 'logo' | 'text'
  speed?: number
  gradientColor?: string
}

export default function PartnerMarquee({ 
  items, 
  type = 'logo',
  speed = 0.8,
  gradientColor = 'white'
}: PartnerMarqueeProps) {
  // Triple the items for seamless infinite scroll
  const displayList = [...items, ...items, ...items]
  
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const isHovered = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const velocity = useRef(0)
  const lastX = useRef(0)
  const lastTime = useRef(0)
  const autoScrollPaused = useRef(false)
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null)
  const requestRef = useRef<number | null>(null)

  const step = useCallback(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const singleSetWidth = container.scrollWidth / 3

    if (!isDragging.current) {
      if (!autoScrollPaused.current && !isHovered.current) {
        container.scrollLeft += speed
      } else if (Math.abs(velocity.current) > 0.1) {
        container.scrollLeft += velocity.current
        velocity.current *= 0.96
      }

      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += singleSetWidth
      }
    }
  }, [speed])

  useEffect(() => {
    const loop = () => {
      step()
      requestRef.current = requestAnimationFrame(loop)
    }
    requestRef.current = requestAnimationFrame(loop)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    }
  }, [step])

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const timer = setTimeout(() => {
      container.scrollLeft = container.scrollWidth / 3
    }, 50)
    return () => clearTimeout(timer)
  }, [items])

  const handleStart = (pageX: number) => {
    isDragging.current = true
    autoScrollPaused.current = true
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    
    startX.current = pageX - (containerRef.current?.offsetLeft || 0)
    scrollLeftStart.current = containerRef.current?.scrollLeft || 0
    lastX.current = pageX
    lastTime.current = Date.now()
    velocity.current = 0
  }

  const handleMove = (pageX: number) => {
    if (!isDragging.current || !containerRef.current) return
    const x = pageX - containerRef.current.offsetLeft
    const walk = (x - startX.current)
    containerRef.current.scrollLeft = scrollLeftStart.current - walk
    
    const now = Date.now()
    const dt = now - lastTime.current
    if (dt > 0) {
      velocity.current = (lastX.current - pageX) / dt * 16
    }
    lastX.current = pageX
    lastTime.current = now
  }

  const handleEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    resumeTimeout.current = setTimeout(() => {
      autoScrollPaused.current = false
    }, 1500)
  }

  const gradientStyle = {
    '--gradient-from': gradientColor,
    '--gradient-to': `${gradientColor}00`,
  } as React.CSSProperties

  return (
    <div 
      className="relative overflow-hidden group cursor-grab active:cursor-grabbing"
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
      style={gradientStyle}
    >
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden select-none py-4 px-2"
        onMouseDown={(e) => handleStart(e.pageX)}
        onMouseMove={(e) => handleMove(e.pageX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].pageX)}
        onTouchMove={(e) => handleMove(e.touches[0].pageX)}
        onTouchEnd={handleEnd}
      >
        {displayList.map((item, index) => (
          <div key={`${index}`} className="flex-shrink-0">
            {type === 'logo' ? (
              typeof item === 'string' ? (
                <div className="w-40 h-16 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-center px-4 shadow-sm shadow-slate-200/50 transition-all duration-300">
                  <span className="text-xs font-semibold text-slate-700 pointer-events-none">
                    {item}
                  </span>
                </div>
              ) : (
                <LogoTile
                  name={item.name}
                  fileName={item.fileName}
                  className="h-28 min-w-[180px] sm:min-w-[220px]"
                />
              )
            ) : (
              <div
                className="w-40 h-16 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-center px-4 shadow-sm shadow-slate-200/50 transition-all duration-300"
              >
                <span className="text-xs font-semibold text-slate-700 pointer-events-none">
                  {typeof item === 'string' ? item : item.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Gradient Overlays */}
      <div 
        className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10" 
        style={{ background: `linear-gradient(to right, ${gradientColor}, ${gradientColor}cc, transparent)` }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-16 pointer-events-none z-10" 
        style={{ background: `linear-gradient(to left, ${gradientColor}, ${gradientColor}cc, transparent)` }}
      />
    </div>
  )
}
