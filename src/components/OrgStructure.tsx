'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  UserCog, 
  Settings, 
  Wrench, 
  BarChart, 
  Megaphone,
  Info,
  Users,
  Shield,
  Briefcase,
  ClipboardList,
  Truck,
  Wallet,
  FileText,
  UserCheck,
  Handshake,
  PenTool,
  Calculator,
  Receipt,
  TrendingUp,
  Star,
  Monitor
} from 'lucide-react'

// --- Types ---
interface OrgManager {
  title: string
  supervisors: string[]
  staff: string[]
}

interface OrgStructureData {
  pill: string
  title: string
  subtitle: string
  bottom_note: string
  levels: {
    pemegang_saham: string
    komisaris: string
    direktur_utama: string
    direktur: string
    managers: {
      ops: OrgManager
      tech: OrgManager
      finance: OrgManager
      marketing: OrgManager
    }
  }
}

// --- Icon mapping for supervisors/staff ---
const supervisorIcons: Record<string, any> = {
  'Supervisor General Affair': ClipboardList,
  'General Affair Supervisor': ClipboardList,
  'Supervisor General Service': Settings,
  'General Service Supervisor': Settings,
  'Supervisor Teknik Gudang': Wrench,
  'Warehouse Technical Supervisor': Wrench,
  'Supervisor Teknik Proyek': Briefcase,
  'Project Technical Supervisor': Briefcase,
  'Supervisor Finance': Calculator,
  'Finance Supervisor': Calculator,
  'Supervisor Accounting': Receipt,
  'Accounting Supervisor': Receipt,
  'Supervisor Relationship Marketing': Handshake,
  'Relationship Marketing Supervisor': Handshake,
  'Supervisor Marketing Officer': PenTool,
  'Marketing Officer Supervisor': PenTool,
}

const staffIcons: Record<string, any> = {
  'Staff Umum': FileText,
  'General Staff': FileText,
  'Staff Bisnis Partner': Handshake,
  'Business Partner Staff': Handshake,
  'Pelaksana Driver': Truck,
  'Driver': Truck,
  'Pelaksana Kasir': Wallet,
  'Cashier': Wallet,
  'Pelaksana OB': UserCheck,
  'Office Boy': UserCheck,
  'Staff 1': FileText,
  'Staff 2': FileText,
  'Staff 3': FileText,
  'Finance Staff': Calculator,
  'AR Staff': Receipt,
  'Accounting Staff': Receipt,
  'Tax Staff': FileText,
  'Staff RM 1': TrendingUp,
  'Staff RM 2': TrendingUp,
  'Staff RM 3': TrendingUp,
  'Staff RM 4': TrendingUp,
  'Staff RM 5': TrendingUp,
  'RM Staff 1': TrendingUp,
  'RM Staff 2': TrendingUp,
  'RM Staff 3': TrendingUp,
  'RM Staff 4': TrendingUp,
  'RM Staff 5': TrendingUp,
  'Freelance Marketing': Monitor,
  'Marketing Officer': Star,
}

function getIcon(name: string, fallback: any) {
  return supervisorIcons[name] || staffIcons[name] || fallback
}

// --- Styles ---
const styles = {
  // Executive pill cards (top hierarchy)
  execCard: `
    relative flex items-center justify-center gap-3
    bg-gradient-to-r from-[#0f4e85] to-[#2aa3de]
    text-white font-extrabold text-sm tracking-wide uppercase
    px-6 sm:px-12 py-4 rounded-2xl
    shadow-[0_12px_40px_rgba(15,78,133,0.18)]
    min-w-[300px] sm:min-w-[360px] max-w-[520px] h-[72px]
  `,
  execIcon: `
    flex items-center justify-center
    w-10 h-10 rounded-xl
    bg-white/20 backdrop-blur-sm
  `,
  // Manager cards and division container
  managerContainer: `
    w-full bg-white border border-[#e8eef6] rounded-2xl
    p-6 sm:p-8 shadow-sm transition-all duration-300
    hover:shadow-md hover:-translate-y-1
  `,
  managerCard: `
    flex flex-col items-center gap-3
    bg-transparent rounded-xl
    w-full
  `,
  managerIcon: `
    flex items-center justify-center
    w-12 h-12 rounded-xl
    bg-white text-[#0f4e85] border-2 border-[#dbeaf9]
    transition-colors duration-300
    group-hover:bg-[#0f4e85] group-hover:text-white
  `,
  // Supervisor cards (medium)
  supervisorCard: `
    flex items-center gap-3
    bg-[#f3f9ff] border border-[#e6f0fb] rounded-xl
    px-4 py-3 w-full
    shadow-sm
    transition-all duration-250
    hover:shadow-md
  `,
  supervisorIcon: `
    flex items-center justify-center shrink-0
    w-9 h-9 rounded-lg
    bg-[#eaf6ff] text-[#0f4e85]
  `,
  // Staff cards (small)
  staffCard: `
    flex items-center gap-3
    bg-white border border-[#f1f6fb] rounded-lg
    px-3 py-2.5 w-full
    transition transform duration-200
    hover:shadow-sm hover:scale-[1.01]
  `,
  staffIcon: `
    flex items-center justify-center shrink-0
    w-7 h-7 rounded-md
    bg-[#f5f9ff] text-[#4b86bf]
  `,
}

// --- Components ---

const ExecCard = ({ title, icon: Icon, delay = 0 }: { title: string; icon: any; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={styles.execCard}>
      <div className={styles.execIcon}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span>{title}</span>
    </div>
  </motion.div>
)

const ManagerCardComponent = ({ title, icon: Icon, delay = 0 }: { title: string; icon: any; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group w-full"
  >
    <div className={styles.managerCard}>
      <div className={styles.managerIcon}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-slate-800 font-bold text-xs sm:text-sm text-center uppercase tracking-wide leading-tight">
        {title}
      </span>
    </div>
  </motion.div>
)

const SupervisorCardComponent = ({ name, delay = 0 }: { name: string; delay?: number }) => {
  const Icon = getIcon(name, ClipboardList)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="w-full"
    >
      <div className={styles.supervisorCard}>
        <div className={styles.supervisorIcon}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-slate-700 font-semibold text-[11px] sm:text-xs uppercase tracking-wide leading-tight">
          {name}
        </span>
      </div>
    </motion.div>
  )
}

const StaffCardComponent = ({ name, delay = 0 }: { name: string; delay?: number }) => {
  const Icon = getIcon(name, FileText)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="w-full"
    >
      <div className={styles.staffCard}>
        <div className={styles.staffIcon}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-slate-600 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wide leading-tight">
          {name}
        </span>
      </div>
    </motion.div>
  )
}

// Vertical connector
const VLine = ({ height = 32, className = '' }: { height?: number; className?: string }) => (
  <div
    className={`mx-auto ${className}`}
    style={{
      width: 1,
      height,
      background: 'linear-gradient(to bottom, rgba(197,213,236,0.9), rgba(220,230,242,0.8))',
      opacity: 0.9,
    }}
  />
)

// Manager icons for each division
const managerIcons: Record<string, any> = {
  ops: Settings,
  tech: Wrench,
  finance: BarChart,
  marketing: Megaphone,
}

export default function OrgStructure({ dict }: { dict: any }) {
  const d = dict?.about?.org_structure as OrgStructureData
  if (!d) return null

  const { levels } = d
  const managerKeys = ['ops', 'tech', 'finance', 'marketing'] as const
  const managers = managerKeys.map((key) => ({
    key,
    icon: managerIcons[key],
    data: levels.managers[key],
  }))

  return (
    <section id="struktur-organisasi" className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">

          {/* Main Container - rounded card with subtle shadow */}
          <div className="bg-[#f8fafd] border border-[#e2eaf5] rounded-[32px] sm:rounded-[40px] shadow-[0_16px_48px_rgba(30,90,170,0.06)] p-6 sm:p-10 lg:p-14 xl:p-16 relative overflow-hidden">

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1e5aaa 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }} />

            {/* Header + Top Hierarchy Layout */}
            <div className="relative z-10">
              
              {/* Top section: Title on left, Executive hierarchy centered/right */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-16 mb-12 sm:mb-16">
                
                {/* Left: Title */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-[280px] xl:w-[320px] shrink-0 mb-8 lg:mb-0 lg:pt-4"
                >
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#eef4fc] border border-[#d5e3f5] text-[#1e5aaa] text-[11px] font-bold uppercase tracking-wider mb-5">
                    <Building2 className="w-3.5 h-3.5 mr-2" />
                    {d.pill}
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#062b4a] tracking-tight leading-[1.02] mb-4">
                    {d.title}
                  </h2>
                  <p className="text-sm sm:text-[15px] text-slate-500 font-medium leading-relaxed max-w-[560px]">
                    {d.subtitle}
                  </p>
                </motion.div>

                {/* Right: Executive hierarchy (4 stacked blue pills) */}
                <div className="flex-1 flex flex-col items-center">
                  <ExecCard title={levels.pemegang_saham} icon={Users} delay={0} />
                  <VLine height={28} />
                  <ExecCard title={levels.komisaris} icon={Shield} delay={0.08} />
                  <VLine height={28} />
                  <ExecCard title={levels.direktur_utama} icon={UserCog} delay={0.16} />
                  <VLine height={28} />
                  <ExecCard title={levels.direktur} icon={Briefcase} delay={0.24} />
                </div>
              </div>

              {/* === DESKTOP: Manager Grid with connector lines === */}
              <div className="hidden lg:block">
                {/* Vertical line from Direktur down */}
                <VLine height={40} />

                {/* Horizontal connector bar (thin) */}
                <div className="relative mx-auto mt-4" style={{ width: '82%' }}>
                  <div className="h-px bg-[#c5d5ec] opacity-40" />
                  {/* 4 vertical drops positioned across the bar */}
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute top-0"
                      style={{
                        left: `calc(${(i / 3) * 100}% )`,
                        width: 1,
                        height: 36,
                        background: 'rgba(197,213,236,0.9)',
                        transform: 'translateX(-0.5px)'
                      }}
                    />
                  ))}
                </div>

                {/* Manager columns (each division wrapped in card container) */}
                <div className="grid grid-cols-4 gap-6 xl:gap-8 mt-8">
                  {managers.map((m, idx) => (
                    <div key={m.key} className="flex flex-col items-stretch">
                      <div className={styles.managerContainer}>
                        <div className={styles.managerCard}>
                          <div className="flex items-center gap-4 w-full justify-center">
                            <div className={styles.managerIcon}>
                              {(() => { const Icon = m.icon; return <Icon className="w-5 h-5" /> })()}
                            </div>
                            <span className="text-[#062b4a] font-semibold text-sm text-center uppercase tracking-wide">
                              {m.data.title}
                            </span>
                          </div>
                        </div>

                        {/* spacing to supervisors */}
                        <div className="mt-6">
                          <div className="grid grid-cols-2 gap-3">
                            {m.data.supervisors.map((s, sIdx) => (
                              <SupervisorCardComponent
                                key={sIdx}
                                name={s}
                                delay={0.5 + idx * 0.05 + sIdx * 0.04}
                              />
                            ))}
                          </div>
                        </div>

                        {/* spacing to staff */}
                        <div className="mt-4">
                          <div className="grid grid-cols-2 gap-3">
                            {m.data.staff.map((s, sIdx) => (
                              <StaffCardComponent
                                key={sIdx}
                                name={s}
                                delay={0.6 + idx * 0.05 + sIdx * 0.03}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* === TABLET: 2-column layout === */}
              <div className="hidden sm:block lg:hidden">
                <VLine height={32} />
                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  {managers.map((m, idx) => (
                    <div key={m.key} className="flex flex-col items-stretch">
                      <div className={styles.managerContainer}>
                        <div className={styles.managerCard}>
                          <div className="flex items-center gap-3 w-full justify-center">
                            <div className={styles.managerIcon}>
                              {(() => { const Icon = m.icon; return <Icon className="w-5 h-5" /> })()}
                            </div>
                            <span className="text-[#062b4a] font-semibold text-sm text-center uppercase tracking-wide">
                              {m.data.title}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5">
                          <div className="grid grid-cols-2 gap-3">
                            {m.data.supervisors.map((s, sIdx) => (
                              <SupervisorCardComponent
                                key={sIdx}
                                name={s}
                                delay={0.5 + idx * 0.05 + sIdx * 0.04}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="grid grid-cols-2 gap-3">
                            {m.data.staff.map((s, sIdx) => (
                              <StaffCardComponent
                                key={sIdx}
                                name={s}
                                delay={0.6 + idx * 0.05 + sIdx * 0.03}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* === MOBILE: 1-column stacked layout === */}
              <div className="block sm:hidden">
                <VLine height={28} />
                <div className="space-y-6">
                  {managers.map((m, idx) => (
                    <div key={m.key} className="flex flex-col items-stretch">
                      <div className={styles.managerContainer}>
                        <div className={styles.managerCard}>
                          <div className="flex items-center gap-3 w-full justify-center">
                            <div className={styles.managerIcon}>
                              {(() => { const Icon = m.icon; return <Icon className="w-5 h-5" /> })()}
                            </div>
                            <span className="text-[#062b4a] font-semibold text-sm text-center uppercase tracking-wide">
                              {m.data.title}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="space-y-3">
                            {m.data.supervisors.map((s, sIdx) => (
                              <SupervisorCardComponent
                                key={sIdx}
                                name={s}
                                delay={0.5 + idx * 0.05 + sIdx * 0.04}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="grid grid-cols-2 gap-3">
                            {m.data.staff.map((s, sIdx) => (
                              <StaffCardComponent
                                key={sIdx}
                                name={s}
                                delay={0.6 + idx * 0.05 + sIdx * 0.03}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Note */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-14 sm:mt-16 pt-8 border-t border-[#e2eaf5] flex flex-col sm:flex-row items-center justify-center gap-3 text-slate-400 text-sm text-center italic"
              >
                <div className="p-2 bg-[#eef4fc] rounded-full text-[#1e5aaa] shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <p>{d.bottom_note}</p>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
