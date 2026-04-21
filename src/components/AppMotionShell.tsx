'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ReactNode, useEffect, useMemo } from 'react'

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

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo(0, 0)
  }, [pathname])

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

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={`${lang}-${pathname ?? 'page'}`} {...pageMotion} className="flex-1">
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
