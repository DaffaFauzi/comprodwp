'use client'

import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BarChart3, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

type Pulse = {
  from: number
  to: number
  t: number
  speed: number
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export default function HeroAiVisual({ lang }: { lang: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [active, setActive] = useState(false)

  const pointerRef = useRef({
    inside: false,
    x: 0,
    y: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    tiltX: 0,
    tiltY: 0,
  })

  const themeRef = useRef({
    dpr: 1,
    w: 0,
    h: 0,
    maxDist: 150,
    particleCount: 42,
  })

  const colors = useMemo(() => {
    return {
      cyan: 'rgba(0, 229, 255, 0.95)',
      blue: 'rgba(47, 93, 170, 0.95)',
      orange: 'rgba(244, 122, 42, 0.95)',
      yellow: 'rgba(255, 193, 7, 0.95)',
      whiteSoft: 'rgba(255, 255, 255, 0.55)',
      whiteThin: 'rgba(255, 255, 255, 0.16)',
    }
  }, [])

  useEffect(() => {
    const root = wrapperRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        const next = entries.some((e) => e.isIntersecting)
        setActive(next)
      },
      { rootMargin: '160px' },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const root = wrapperRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const resize = () => {
      const rect = root.getBoundingClientRect()
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      themeRef.current.dpr = dpr
      themeRef.current.w = Math.max(1, Math.floor(rect.width))
      themeRef.current.h = Math.max(1, Math.floor(rect.height))

      canvas.width = Math.floor(themeRef.current.w * dpr)
      canvas.height = Math.floor(themeRef.current.h * dpr)
      canvas.style.width = `${themeRef.current.w}px`
      canvas.style.height = `${themeRef.current.h}px`

      const base = Math.min(themeRef.current.w, themeRef.current.h)
      themeRef.current.maxDist = clamp(Math.floor(base * 0.34), 120, 190)
      const isSmall = themeRef.current.w < 520
      themeRef.current.particleCount = isSmall ? 26 : 42
    }

    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(root)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const root = wrapperRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      pointerRef.current.inside = true
      pointerRef.current.x = clamp(x, 0, 1)
      pointerRef.current.y = clamp(y, 0, 1)

      pointerRef.current.targetTiltX = (pointerRef.current.x - 0.5) * 10
      pointerRef.current.targetTiltY = (pointerRef.current.y - 0.5) * 10
    }

    const onLeave = () => {
      pointerRef.current.inside = false
      pointerRef.current.targetTiltX = 0
      pointerRef.current.targetTiltY = 0
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) return

    const root = wrapperRef.current
    const canvas = canvasRef.current
    if (!canvas || !root) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const makeNodes = () => {
      const { w, h } = themeRef.current
      const count = themeRef.current.particleCount
      const nodes: Node[] = []
      for (let i = 0; i < count; i += 1) {
        const x = Math.random() * w
        const y = Math.random() * h
        const speed = 0.15 + Math.random() * 0.35
        const angle = Math.random() * Math.PI * 2
        nodes.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.6 + Math.random() * 2.3,
        })
      }
      return nodes
    }

    const nodes = makeNodes()
    const pulses: Pulse[] = []

    const addPulse = () => {
      if (nodes.length < 2) return
      const from = Math.floor(Math.random() * nodes.length)
      let to = Math.floor(Math.random() * nodes.length)
      if (to === from) to = (to + 1) % nodes.length
      pulses.push({
        from,
        to,
        t: 0,
        speed: 0.008 + Math.random() * 0.012,
      })
      if (pulses.length > 18) pulses.shift()
    }

    let lastPulseAt = performance.now()

    const draw = (time: number) => {
      const { dpr, w, h, maxDist } = themeRef.current

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const p = pointerRef.current
      p.tiltX += (p.targetTiltX - p.tiltX) * 0.08
      p.tiltY += (p.targetTiltY - p.tiltY) * 0.08
      root.style.setProperty('--tilt-x', `${p.tiltX.toFixed(2)}deg`)
      root.style.setProperty('--tilt-y', `${p.tiltY.toFixed(2)}deg`)

      if (time - lastPulseAt > 900) {
        addPulse()
        lastPulseAt = time
      }

      const pointerForce = p.inside ? 0.035 : 0
      const pointerX = p.x * w
      const pointerY = p.y * h

      for (const n of nodes) {
        if (pointerForce) {
          const dx = pointerX - n.x
          const dy = pointerY - n.y
          const dist = Math.max(40, Math.hypot(dx, dy))
          const fx = (dx / dist) * pointerForce
          const fy = (dy / dist) * pointerForce
          n.vx += fx
          n.vy += fy
        }

        n.x += n.vx
        n.y += n.vy
        n.vx *= 0.995
        n.vy *= 0.995

        if (n.x < 0) {
          n.x = 0
          n.vx *= -1
        } else if (n.x > w) {
          n.x = w
          n.vx *= -1
        }

        if (n.y < 0) {
          n.y = 0
          n.vy *= -1
        } else if (n.y > h) {
          n.y = h
          n.vy *= -1
        }
      }

      const gradient = ctx.createLinearGradient(0, 0, w, h)
      gradient.addColorStop(0, colors.cyan)
      gradient.addColorStop(0.55, colors.blue)
      gradient.addColorStop(1, colors.orange)

      ctx.lineWidth = 1
      ctx.strokeStyle = gradient

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > maxDist) continue

          const alpha = clamp(1 - dist / maxDist, 0, 1) * 0.42
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      for (const n of nodes) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16)
        glow.addColorStop(0, colors.whiteSoft)
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const pulse of pulses) {
        const a = nodes[pulse.from]
        const b = nodes[pulse.to]
        if (!a || !b) continue

        pulse.t += pulse.speed
        if (pulse.t >= 1) {
          pulse.t = 0
          pulse.from = pulse.to
          pulse.to = Math.floor(Math.random() * nodes.length)
          pulse.speed = 0.008 + Math.random() * 0.012
        }

        const x = a.x + (b.x - a.x) * pulse.t
        const y = a.y + (b.y - a.y) * pulse.t

        const dot = ctx.createRadialGradient(x, y, 0, x, y, 10)
        dot.addColorStop(0, colors.yellow)
        dot.addColorStop(0.6, colors.orange)
        dot.addColorStop(1, 'rgba(244, 122, 42, 0)')

        ctx.fillStyle = dot
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, colors])

  return (
    <div
      ref={wrapperRef}
      className="relative rounded-[2.75rem] p-[1px] bg-gradient-to-br from-dwp-cyan via-dwp-blue to-dwp-orange shadow-2xl shadow-black/20"
      style={{ '--tilt-x': '0deg', '--tilt-y': '0deg' } as unknown as CSSProperties}
    >
      <div className="relative rounded-[2.7rem] overflow-hidden bg-white/10 border border-white/15 backdrop-blur-xl">
        <div className="absolute inset-0">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/14 via-transparent to-white/6" />
          <div className="absolute inset-0 opacity-[0.06] bg-[url('/grid-pattern.svg')]" />
        </div>

        <div
          className="relative aspect-[4/3] p-8 sm:p-10"
          style={{
            transform: 'perspective(900px) rotateX(var(--tilt-y)) rotateY(calc(var(--tilt-x) * -1))',
            transition: 'transform 120ms ease',
          }}
        >
          <div className="w-full max-w-sm mx-auto">
            <div className="rounded-2xl bg-white/12 border border-white/18 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-2 text-xs font-semibold text-white/90">
                  <Sparkles className="w-4 h-4 text-white" />
                    {lang === 'id' ? 'Insight Berbasis AI' : 'AI-Driven Insights'}
                </div>
                <div className="h-2 w-24 bg-white/25 rounded-full" />
              </div>

              <div className="mt-4 rounded-2xl bg-white/10 border border-white/15 p-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dwp-orange/80 to-dwp-yellow/80 flex items-center justify-center text-dwp-dark shadow-lg shadow-black/10">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="h-2 w-28 bg-white/30 rounded-full mb-2 ml-auto" />
                    <div className="h-2 w-16 bg-white/20 rounded-full ml-auto" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 border border-white/15 p-3 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-white" />
                    <div className="flex-1">
                      <div className="h-2 w-16 bg-white/30 rounded-full mb-2" />
                      <div className="h-2 w-10 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 p-3 flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-white" />
                    <div className="flex-1">
                      <div className="h-2 w-16 bg-white/30 rounded-full mb-2" />
                      <div className="h-2 w-10 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  <div className="col-span-2 rounded-xl bg-white/10 border border-white/15 p-3">
                    <div className="h-2 w-full bg-white/18 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-dwp-cyan/80 to-dwp-orange/80 rounded-full" />
                    </div>
                    <div className="mt-2 h-2 w-24 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-6 top-6 hidden sm:flex items-center gap-2 text-xs font-semibold text-white/80">
            <span className="h-2.5 w-2.5 rounded-full bg-dwp-cyan/80 shadow-[0_0_0_6px_rgba(0,229,255,0.12)]" />
            {lang === 'id' ? 'Jaringan Partikel' : 'Particle Network'}
          </div>
        </div>
      </div>
    </div>
  )
}
