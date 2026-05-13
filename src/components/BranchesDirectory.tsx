'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

export type Branch = {
  name: string
  phone: string
  address: string
}

const pageSizeOptions = [6, 9, 12] as const
type PageSize = (typeof pageSizeOptions)[number] | 'all'

function normalize(input: string) {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

export default function BranchesDirectory({
  branches,
  phoneLabel,
  locale,
}: {
  branches: Branch[]
  phoneLabel: string
  locale: 'id' | 'en'
}) {
  const [query, setQuery] = useState('')
  const [pageSize, setPageSize] = useState<PageSize>(9)
  const [visibleCount, setVisibleCount] = useState(9)

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q) return branches
    return branches.filter((b) => {
      const haystack = normalize(`${b.name} ${b.address} ${b.phone}`)
      return haystack.includes(q)
    })
  }, [branches, query])

  const shown = useMemo(() => {
    if (pageSize === 'all') return filtered
    return filtered.slice(0, Math.min(visibleCount, filtered.length))
  }, [filtered, pageSize, visibleCount])

  const canShowMore =
    pageSize !== 'all' && filtered.length > 0 && visibleCount < filtered.length

  const placeholder = locale === 'id' ? 'Cari cabang…' : 'Search branches…'
  const showLabel = locale === 'id' ? 'Tampilkan' : 'Show'
  const allLabel = locale === 'id' ? 'Semua' : 'All'
  const moreLabel = locale === 'id' ? 'Tampilkan lebih banyak' : 'Show more'
  const emptyLabel =
    locale === 'id'
      ? 'Cabang tidak ditemukan. Coba kata kunci lain.'
      : 'No branches found. Try another keyword.'
  const countLabel =
    locale === 'id'
      ? `Menampilkan ${shown.length} dari ${filtered.length}`
      : `Showing ${shown.length} of ${filtered.length}`

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => {
              const next = e.target.value
              setQuery(next)
              setVisibleCount(pageSize === 'all' ? Number.MAX_SAFE_INTEGER : pageSize)
            }}
            className="w-full h-11 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-100/60 outline-none focus:border-dwp-blue focus:ring-4 focus:ring-dwp-blue/10"
            placeholder={placeholder}
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="text-xs font-semibold text-slate-600">{countLabel}</div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              {showLabel}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                const v = e.target.value
                if (v === 'all') {
                  setPageSize('all')
                  setVisibleCount(Number.MAX_SAFE_INTEGER)
                  return
                }
                const n = Number.parseInt(v, 10) as PageSize
                setPageSize(n)
                setVisibleCount(typeof n === 'number' ? n : 9)
              }}
              className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm shadow-slate-100/60 outline-none focus:border-dwp-blue focus:ring-4 focus:ring-dwp-blue/10"
              aria-label={showLabel}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
              <option value="all">{allLabel}</option>
            </select>
          </div>
        </div>
      </div>

      {shown.length > 0 ? (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((b) => (
            <div key={b.name} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-6 py-5">
              <div className="text-base font-black text-slate-900">{b.name}</div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">{b.address}</div>
              <div className="mt-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{phoneLabel}:</span>{' '}
                <span>{b.phone}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-[#F7FAFC] px-6 py-8 text-center text-sm font-semibold text-slate-600">
          {emptyLabel}
        </div>
      )}

      {canShowMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (typeof pageSize !== 'number') return
              setVisibleCount((v) => Math.min(v + pageSize, filtered.length))
            }}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dwp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {moreLabel}
          </button>
        </div>
      ) : null}
    </div>
  )
}
