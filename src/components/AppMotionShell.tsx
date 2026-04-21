'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ReactNode, useEffect, useMemo, useState } from 'react'

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function AppMotionShell({
  children,
  lang,
}: {
  children: ReactNode
  lang: string
}) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storageKey = 'intro-shown'
    const alreadyShown = window.sessionStorage.getItem(storageKey) === '1'
    if (alreadyShown || reduceMotion) return

    window.sessionStorage.setItem(storageKey, '1')
    queueMicrotask(() => setShowIntro(true))

    const timeout = window.setTimeout(() => setShowIntro(false), 1400)
    return () => window.clearTimeout(timeout)
  }, [reduceMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!showIntro) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [showIntro])

  const pageMotion = useMemo(() => {
    if (reduceMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    }
    return {
      initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: -8, filter: 'blur(6px)' },
      transition: { duration: 0.28, ease: EASING },
    }
  }, [reduceMotion])

  const introCopy =
    lang === 'id'
      ? { title: 'PT. Dwi Kusuma Perkasa', subtitle: 'Insurance & Risk Management Services' }
      : { title: 'PT. Dwi Kusuma Perkasa', subtitle: 'Insurance & Risk Management Services' }

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={pathname ?? 'page'} {...pageMotion} className="flex-1">
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showIntro ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASING }}
            onClick={() => setShowIntro(false)}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B1220_0%,#111827_55%,#0B1220_100%)]" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.10]" />
            <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[rgba(0,229,255,0.18)] rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute -bottom-28 -right-24 w-[560px] h-[560px] bg-[rgba(244,122,42,0.16)] rounded-full blur-[160px] pointer-events-none" />

            <motion.div
              className="relative w-full max-w-md rounded-[36px] border border-white/15 bg-white/10 backdrop-blur-xl p-8 shadow-2xl shadow-black/30"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.32, ease: EASING }}
            >
              <div className="flex items-center justify-center">
                <motion.div
                  className="relative h-20 w-48"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: EASING }}
                >
                  <Image
                    src="/logos/dwp.png"
                    alt="DWP"
                    fill
                    sizes="192px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>

              <div className="mt-6 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">{introCopy.title}</div>
                <div className="mt-2 text-sm text-white/75">{introCopy.subtitle}</div>
                <motion.div
                  className="mt-7 h-[3px] w-full rounded-full bg-white/15 overflow-hidden"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                >
                  <motion.div
                    className="h-full w-full rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] origin-left"
                    initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={reduceMotion ? { scaleX: 1 } : { scaleX: 1 }}
                    transition={{ duration: 1.1, ease: EASING }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
