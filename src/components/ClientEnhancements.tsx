'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { BootstrapData } from '@/lib/cms'
import {
  MessageCircle,
  X,
  Sparkles,
  Mic,
  MicOff,
  Send,
} from 'lucide-react'

type SpeechRecognitionAlternativeLike = { transcript: string }
type SpeechRecognitionResultLike = { 0?: SpeechRecognitionAlternativeLike }
type SpeechRecognitionEventLike = { results: ArrayLike<SpeechRecognitionResultLike> }
type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  continuous: boolean
  start: () => void
  stop: () => void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onend: (() => void) | null
  onerror: ((event: unknown) => void) | null
}
type SpeechRecognitionConstructorLike = new () => SpeechRecognitionLike

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: 'sending'
}

function useIdPrefix(prefix: string) {
  const ref = useRef(0)
  return () => {
    ref.current += 1
    return `${prefix}-${Date.now()}-${ref.current}`
  }
}

function getAssistantReply(input: string, pathname: string, lang: string) {
  const q = input.toLowerCase()
  const isID = lang === 'id'

  if (q.includes('produk') || q.includes('layanan') || q.includes('services') || q.includes('product')) {
    return isID
      ? 'Saya bisa bantu rekomendasikan produk yang sesuai. Anda ingin Bank Garansi, Surety Bond, Custom Bond, atau Asuransi Umum?'
      : 'I can recommend the right product. Are you looking for Bank Guarantee, Surety Bond, Custom Bond, or General Insurance?'
  }
  if (q.includes('harga') || q.includes('biaya') || q.includes('premi') || q.includes('price') || q.includes('cost')) {
    return isID
      ? 'Untuk estimasi biaya, saya butuh jenis produk, nilai proyek, dan jangka waktu. Anda bisa tulis detail singkatnya.'
      : 'For a quick estimate, I need the product type, project value, and duration. Share a short summary and I will guide you.'
  }
  if (q.includes('kontak') || q.includes('whatsapp') || q.includes('hubungi') || q.includes('contact')) {
    return isID
      ? 'Silakan klik tombol WhatsApp di kanan bawah atau buka halaman Kontak untuk konsultasi.'
      : 'Please use the WhatsApp button on the bottom-right or open the Contact page for a consultation.'
  }
  if (q.includes('mitra') || q.includes('partner')) {
    return isID
      ? 'Kami bekerja sama dengan berbagai mitra asuransi dan bank. Anda bisa cek daftar lengkap di halaman Mitra Kami.'
      : 'We work with trusted insurance and bank partners. You can see the full list on the Partners page.'
  }
  if (pathname.includes('/products')) {
    return isID
      ? 'Kalau Anda mau, saya bisa jelaskan perbedaan tiap produk dan dokumen yang biasanya dibutuhkan.'
      : 'If you want, I can explain the differences between products and the typical required documents.'
  }
  if (pathname.includes('/contact')) {
    return isID
      ? 'Tulis kebutuhan Anda, lalu saya bantu rangkum agar mudah disampaikan ke tim konsultan.'
      : 'Describe what you need and I will help summarize it for the consultant team.'
  }
  return isID
    ? 'Saya siap bantu. Anda sedang mencari produk apa atau ingin konsultasi kebutuhan bisnis Anda?'
    : 'I can help. What product are you looking for, or would you like a consultation for your business needs?'
}

async function getAssistantReplyFromApi(input: string, pathname: string, lang: string) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input, pathname, lang }),
  })
  if (!res.ok) throw new Error('Request failed')
  const data = (await res.json()) as { reply?: unknown }
  if (typeof data.reply !== 'string') throw new Error('Invalid response')
  return data.reply
}

export function ClientEnhancements({ lang, cmsData }: { lang: string, cmsData?: BootstrapData | null }) {
  const pathname = usePathname() ?? `/${lang}`

  const whatsappNumber = useMemo(() => {
    let raw = cmsData?.settings?.contact?.whatsapp || '6281288893223'
    raw = raw.replace(/\D/g, '')
    if (raw.startsWith('0')) raw = '62' + raw.substring(1)
    return raw
  }, [cmsData])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storageKey = 'ab-variant'
    const params = new URLSearchParams(window.location.search)
    const forced = params.get('ab')
    const isForced = forced === 'a' || forced === 'b'
    const stored = window.localStorage.getItem(storageKey)
    const variant =
      (isForced ? forced : null) ??
      (stored === 'a' || stored === 'b' ? stored : null) ??
      (Math.random() < 0.5 ? 'a' : 'b')

    window.localStorage.setItem(storageKey, variant)

    const metricsKey = `ab-metrics:${variant}`
    const startedAt = Date.now()

    const readMetrics = () => {
      try {
        return JSON.parse(window.localStorage.getItem(metricsKey) ?? '{}') as Record<string, number>
      } catch {
        return {}
      }
    }

    const writeMetrics = (next: Record<string, number>) => {
      try {
        window.localStorage.setItem(metricsKey, JSON.stringify(next))
      } catch {}
    }

    const inc = (key: string, by = 1) => {
      const current = readMetrics()
      current[key] = (current[key] ?? 0) + by
      writeMetrics(current)
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const trackEl = target?.closest?.('[data-track]') as HTMLElement | null
      const track = trackEl?.dataset?.track
      if (!track) return
      inc(`click:${track}`, 1)
    }

    const onUnload = () => {
      const seconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000))
      inc('dwell_seconds', seconds)
    }

    window.addEventListener('click', onClick, true)
    window.addEventListener('beforeunload', onUnload)

    return () => {
      onUnload()
      window.removeEventListener('click', onClick, true)
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const attrs = [
      document.documentElement?.getAttribute('inmaintabuse'),
      document.body?.getAttribute('inmaintabuse'),
    ]
    if (attrs.some((v) => v != null)) {
      console.warn(
        '[hydration] Unexpected attribute detected: inmaintabuse. This is typically injected by a browser extension or external script, not React.'
      )
    }
  }, [])

  useEffect(() => {
    try {
      const key = `recent-paths:${lang}`
      const existing = JSON.parse(window.localStorage.getItem(key) ?? '[]') as string[]
      const next = [pathname, ...existing.filter((p) => p !== pathname)].slice(0, 6)
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch {}
  }, [pathname, lang])

  const [open, setOpen] = useState(false)
  const nextId = useIdPrefix('msg')
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'seed',
      role: 'assistant',
      content:
        lang === 'id'
          ? 'Halo! Saya asisten DWP. Mau konsultasi produk atau butuh rekomendasi layanan?'
          : 'Hi! I am the DWP assistant. Want a quick recommendation or product info?',
    },
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const SpeechRecognitionImpl =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructorLike }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructorLike }).webkitSpeechRecognition
    if (!SpeechRecognitionImpl) return
    const recognition = new SpeechRecognitionImpl()
    recognition.lang = lang === 'id' ? 'id-ID' : 'en-US'
    recognition.interimResults = true
    recognition.continuous = false
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0]?.transcript ?? '')
        .join('')
        .trim()
      setInput(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognitionRef.current = recognition
  }, [lang])

  const recommendations = useMemo(() => {
    const list: { href: string; label: string }[] = [
      { href: `/${lang}/products`, label: lang === 'id' ? 'Lihat Produk & Layanan' : 'View Products & Services' },
      { href: `/${lang}/partners`, label: lang === 'id' ? 'Daftar Mitra Kami' : 'Our Partners' },
      { href: `/${lang}/contact`, label: lang === 'id' ? 'Konsultasi (Kontak)' : 'Consultation (Contact)' },
    ]
    if (pathname.includes('/contact')) {
      return [list[0], list[1]]
    }
    if (pathname.includes('/products')) {
      return [list[2], list[1]]
    }
    return list
  }, [lang, pathname])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')

    const userMsg: Message = { id: nextId(), role: 'user', content: text }
    const assistantId = nextId()
    const pending: Message = { id: assistantId, role: 'assistant', content: '', status: 'sending' }
    setMessages((m) => [...m, userMsg, pending])

    let reply = ''
    try {
      reply = await getAssistantReplyFromApi(text, pathname, lang)
    } catch {
      await new Promise((r) => setTimeout(r, 220))
      reply = getAssistantReply(text, pathname, lang)
    }
    setMessages((m) =>
      m.map((x) => (x.id === assistantId ? { ...x, content: reply, status: undefined } : x)),
    )

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utter = new SpeechSynthesisUtterance(reply)
        utter.lang = lang === 'id' ? 'id-ID' : 'en-US'
        utter.rate = 1
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utter)
      } catch {}
    }
  }

  const toggleListening = () => {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (isListening) {
      recognition.stop()
      setIsListening(false)
      return
    }
    setIsListening(true)
    recognition.start()
  }

  return (
    <>
      <div className="app-particles" />

      <AnimatePresence>
        <motion.div
          key={`route-${pathname}`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed left-0 top-0 h-[3px] w-full origin-left z-[60] bg-gradient-to-r from-dwp-cyan via-dwp-blue to-dwp-orange"
        />
      </AnimatePresence>

      <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open ? null : (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-dwp-orange to-dwp-yellow text-dwp-dark shadow-xl shadow-black/15 flex items-center justify-center"
              aria-label={lang === 'id' ? 'Buka asisten' : 'Open assistant'}
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          className="h-12 w-12 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/15 flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label={lang === 'id' ? 'Tutup' : 'Close'}
            />

            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120) setOpen(false)
              }}
              initial={{ y: 32, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 32, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-md rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-black/20 overflow-hidden"
              style={{ background: 'var(--surface)' }}
            >
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-black text-slate-900">{lang === 'id' ? 'Asisten DWP' : 'DWP Assistant'}</div>
                  <div className="text-xs text-slate-600">{lang === 'id' ? 'Tarik ke bawah untuk menutup' : 'Drag down to close'}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-900 shadow-sm shadow-slate-200/50 flex items-center justify-center"
                  aria-label={lang === 'id' ? 'Tutup' : 'Close'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 py-4 space-y-3 max-h-[52vh] overflow-auto">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                      m.role === 'user'
                        ? 'ml-10 bg-slate-900 text-white border-slate-900'
                        : 'mr-10 bg-white text-slate-800 border-slate-200'
                    }`}
                  >
                    {m.status === 'sending' ? (
                      <span className="inline-flex items-center gap-2 text-slate-500">
                        <span className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
                        <span className="h-2 w-2 rounded-full bg-slate-300 animate-pulse [animation-delay:120ms]" />
                        <span className="h-2 w-2 rounded-full bg-slate-300 animate-pulse [animation-delay:240ms]" />
                      </span>
                    ) : (
                      m.content
                    )}
                  </div>
                ))}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs font-black text-slate-900">{lang === 'id' ? 'Rekomendasi cepat' : 'Quick recommendations'}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recommendations.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-dwp-cyan transition-colors"
                      >
                        {r.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="text-xs font-black text-slate-900">{lang === 'id' ? 'Visualisasi real-time' : 'Real-time visualization'}</div>
                  <div className="mt-2">
                    <svg viewBox="0 0 240 56" className="w-full h-14">
                      <defs>
                        <linearGradient id="viz-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00E5FF" />
                          <stop offset="100%" stopColor="#F47A2A" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M4 44 C 28 18, 52 40, 76 26 S 124 8, 148 22 S 196 44, 236 14"
                        fill="none"
                        stroke="url(#viz-grad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.1, ease: 'easeInOut' }}
                      />
                      <motion.circle
                        cx="236"
                        cy="14"
                        r="5"
                        fill="#F47A2A"
                        initial={{ scale: 0.6, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`h-11 w-11 rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm shadow-slate-200/50 transition-colors ${
                      isListening ? 'bg-dwp-cyan/10 text-dwp-dark' : 'bg-white text-slate-700 hover:text-slate-900'
                    }`}
                    aria-label={lang === 'id' ? 'Input suara' : 'Voice input'}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') send()
                    }}
                    className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-dwp-cyan focus:ring-4 focus:ring-dwp-cyan/10"
                    placeholder={lang === 'id' ? 'Tulis kebutuhan Anda…' : 'Type what you need…'}
                  />
                  <button
                    type="button"
                    onClick={send}
                    className="h-11 w-11 rounded-2xl bg-gradient-to-r from-dwp-orange to-dwp-yellow text-dwp-dark shadow-lg shadow-black/10 flex items-center justify-center hover:shadow-xl transition-shadow"
                    aria-label={lang === 'id' ? 'Kirim' : 'Send'}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
