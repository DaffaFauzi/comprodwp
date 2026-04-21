import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#0B1220_0%,#111827_55%,#0B1220_100%)] px-6">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.10]" />
      <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-[rgba(0,229,255,0.18)] blur-[160px]" />
      <div className="absolute -bottom-28 -right-24 h-[560px] w-[560px] rounded-full bg-[rgba(244,122,42,0.16)] blur-[160px]" />

      <div className="relative w-full max-w-md rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex items-center justify-center">
          <div className="relative h-20 w-52">
            <Image src="/logos/dwp.png" alt="DWP" fill sizes="208px" className="object-contain" priority />
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-lg sm:text-xl font-black text-white">PT. Dwi Kusuma Perkasa</div>
          <div className="mt-2 text-sm text-white/75">Preparing your experience</div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <div className="text-xs font-semibold text-white/70">Loading...</div>
          </div>

          <div className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-2/3 rounded-full bg-[linear-gradient(90deg,#2F5DAA_0%,#2CA7A4_55%,#F47A2A_100%)] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
