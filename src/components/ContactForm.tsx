'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

type ContactDictionary = {
  contact: {
    phone: string
    email: string
    phone_label: string
    email_label: string
    form: {
      title?: string
      subtitle?: string
      name: string
      phone: string
      email: string
      subject: string
      message: string
      submit: string
      sending?: string
      success_title?: string
      success_desc?: string
      send_another?: string
    }
    home_strip?: {
      form_title?: string
      service_label?: string
      service_placeholder?: string
      whatsapp_cta?: string
    }
  }
  services?: {
    items?: Record<string, { title: string }>
  }
}

export default function ContactForm({ dictionary }: { dictionary: ContactDictionary }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const form = dictionary.contact.form

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 flex flex-col items-center justify-center h-full"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold font-heading text-dwp-dark mb-4">
          {form.success_title ?? 'Message sent'}
        </h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          {form.success_desc ?? 'Thank you for reaching out. Our team will contact you soon.'}
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-8 py-3 text-base font-bold text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900"
        >
          {form.send_another ?? 'Send another message'}
        </button>
      </motion.div>
    )
  }

  const serviceOptions = Object.values(dictionary.services?.items ?? {}).map((s) => s.title)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-1">
        <h3 className="text-lg font-black text-slate-900">
          {dictionary.contact.home_strip?.form_title ?? form.title ?? 'Send us a message'}
        </h3>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">{form.name}</div>
        <input
          name="name"
          type="text"
          required
          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 outline-none focus:bg-white focus:border-[#2F5DAA] focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
          placeholder={form.name}
        />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">{form.email}</div>
        <input
          name="email"
          type="email"
          required
          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 outline-none focus:bg-white focus:border-[#2F5DAA] focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
          placeholder={form.email}
        />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">{form.phone}</div>
        <input
          name="phone"
          type="tel"
          required
          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 outline-none focus:bg-white focus:border-[#2F5DAA] focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
          placeholder={form.phone}
        />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">{dictionary.contact.home_strip?.service_label ?? form.subject}</div>
        <div className="relative">
          <select
            name="subject"
            required
            defaultValue=""
            className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 outline-none focus:bg-white focus:border-[#2F5DAA] focus:ring-4 focus:ring-blue-500/10 appearance-none"
          >
            <option value="" disabled>
              {dictionary.contact.home_strip?.service_placeholder ?? form.subject}
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">{form.message}</div>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 outline-none resize-none focus:bg-white focus:border-[#2F5DAA] focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
          placeholder={form.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_100%)] text-sm font-black text-white shadow-[0_18px_40px_rgba(47,93,170,0.20)] hover:shadow-[0_22px_46px_rgba(47,93,170,0.26)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {form.sending ?? 'Sending...'}
          </>
        ) : (
          <>
            {form.submit}
            <Send className="ml-2 h-4 w-4 text-white" />
          </>
        )}
      </button>

      <a
        href="https://wa.me/6281288893223"
        target="_blank"
        rel="noreferrer"
        className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-[#22c55e] text-sm font-black text-white shadow-[0_18px_40px_rgba(34,197,94,0.20)] hover:shadow-[0_22px_46px_rgba(34,197,94,0.26)] transition-shadow"
      >
        <MessageCircle className="mr-2 h-4 w-4 text-white" />
        {dictionary.contact.home_strip?.whatsapp_cta ?? 'WhatsApp'}
      </a>
    </form>
  )
}
