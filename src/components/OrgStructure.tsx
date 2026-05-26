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
  Monitor,
  ChevronDown
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
  'Supervisor Teknik Cabang': Wrench,
  'Warehouse Technical Supervisor': Wrench,
  'Supervisor Teknik Marketing': Briefcase,
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
  'Staff': FileText,
  'Staff 2': FileText,
  'Staff 3': FileText,
  'Finance Staff': Calculator,
  'AR Staff': Receipt,
  'Accounting Staff': Receipt,
  'Tax Staff': FileText,
  'Staff RM': TrendingUp,
  'Staff RM 2': TrendingUp,
  'Staff RM 3': TrendingUp,
  'RM Staff': TrendingUp,
  'RM Staff 2': TrendingUp,
  'RM Staff 3': TrendingUp,
  'Freelance Marketing': Monitor,
  'Marketing Officer': Star,
}

function getIcon(name: string, fallback: any) {
  return supervisorIcons[name] || staffIcons[name] || fallback
}

// --- Animations ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  } as any,
}

// --- Components ---

const ExecCard = ({ title, icon: Icon, delay = 0, variant = 'primary' }: { title: string; icon: any; delay?: number; variant?: 'primary' | 'secondary' }) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    whileInView="whileInView"
    viewport={{ once: true }}
    transition={{ ...fadeInUp.transition, delay }}
    className="relative group w-full max-w-[220px] sm:max-w-[260px]"
  >
    <div className={`relative flex items-center gap-4 p-[1px] rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${variant === 'primary'
      ? 'bg-gradient-to-r from-dwp-blue via-dwp-teal to-dwp-blue'
      : 'bg-gradient-to-r from-slate-400 to-slate-500'
      }`}>
      <div className={`flex items-center justify-center gap-4 w-full px-6 py-4 rounded-[15px] ${variant === 'primary' ? 'bg-[#062b4a]' : 'bg-white'
        }`}>
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${variant === 'primary' ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-slate-100 border border-slate-200'
          }`}>
          <Icon className={`w-5 h-5 ${variant === 'primary' ? 'text-white' : 'text-slate-600'}`} />
        </div>
        <span className={`font-bold text-xs sm:text-sm tracking-wide uppercase ${variant === 'primary' ? 'text-white' : 'text-slate-800'
          }`}>
          {title}
        </span>
      </div>
    </div>
  </motion.div>
)

const ManagerCardComponent = ({ title, icon: Icon, delay = 0 }: { title: string; icon: any; delay?: number }) => (
  <div className="relative flex flex-col items-center w-full">
    {/* Desktop Connector Arrow */}
    <div className="hidden lg:flex flex-col items-center absolute -top-[80px] pointer-events-none w-full">
      <div className="w-[2px] h-[70px] bg-[#062b4a]" />
      <div className="-mt-1">
        <ChevronDown className="w-5 h-5 text-[#062b4a]" />
      </div>
    </div>

    <motion.div
      variants={fadeInUp}
      transition={{ ...fadeInUp.transition, delay }}
      className="group w-full"
    >
      <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl transition-all duration-300 group-hover:bg-white group-hover:border-dwp-blue/20 group-hover:shadow-xl group-hover:shadow-dwp-blue/5">
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 text-dwp-blue shadow-sm transition-all duration-500 group-hover:bg-[#062b4a] group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-dwp-blue font-black text-xs uppercase tracking-widest text-center leading-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  </div>
)

const SupervisorCardComponent = ({ name, delay = 0 }: { name: string; delay?: number }) => {
  const Icon = getIcon(name, ClipboardList)
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ ...fadeInUp.transition, delay }}
      className="w-full"
    >
      <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-2 py-2 shadow-sm hover:border-dwp-blue/30 transition-all duration-300 group">
        <div className="flex items-center justify-center shrink-0 w-7 h-7 rounded-lg bg-[#005596] text-white">
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-slate-800 font-black text-[8px] sm:text-[9px] leading-tight uppercase tracking-tight">
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
      variants={fadeInUp}
      transition={{ ...fadeInUp.transition, delay }}
      className="w-full"
    >
      <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-lg px-2 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-dwp-blue/20 transition-all duration-200">
        <div className="flex items-center justify-center shrink-0 w-5 h-5 rounded bg-slate-50 text-[#005596]">
          <Icon className="w-2.5 h-2.5" />
        </div>
        <span className="text-slate-700 font-bold text-[7.5px] sm:text-[8px] uppercase truncate tracking-tighter">
          {name}
        </span>
      </div>
    </motion.div>
  )
}

function getStaffForSupervisor(managerKey: string, supervisorIdx: number, allStaff: string[]) {
  if (managerKey === 'ops') {
    return supervisorIdx === 0 ? allStaff.slice(0, 2) : allStaff.slice(2)
  }
  if (managerKey === 'tech') {
    return allStaff // Both get the same staff 1,2,3 in reference
  }
  if (managerKey === 'finance') {
    return supervisorIdx === 0 ? allStaff.slice(0, 2) : allStaff.slice(2)
  }
  if (managerKey === 'marketing') {
    return supervisorIdx === 0 ? allStaff.slice(0, 1) : allStaff.slice(1)
  }
  return []
}

// Connector Components
const VerticalConnector = ({ height = 48, active = false }: { height?: number; active?: boolean }) => (
  <div className="relative flex flex-col items-center py-2 z-10">
    <div
      className={`w-[2px] ${active ? 'bg-[#062b4a]' : 'bg-slate-300'}`}
      style={{ height: `${height}px` }}
    />
    <div className="-mt-2">
      <ChevronDown className={`w-5 h-5 ${active ? 'text-[#062b4a]' : 'text-slate-300'}`} />
    </div>
  </div>
)

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
    <section id="struktur-organisasi" className="py-12 sm:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-dwp-blue/5 border border-dwp-blue/10 text-dwp-blue text-[11px] font-bold uppercase tracking-widest mb-6"
            >
              <Building2 className="w-3.5 h-3.5 mr-2" />
              {d.pill}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062b4a] tracking-tight leading-tight mb-6"
            >
              {d.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              {d.subtitle}
            </motion.p>
          </div>

          {/* TREE START */}
          <div className="flex flex-col items-center">

            {/* Top Board: Shareholders & Commissioner */}
            <div className="flex flex-col items-center w-full mb-12">
              <ExecCard title={levels.pemegang_saham} icon={Users} variant="primary" />
              <VerticalConnector height={40} active />
              <ExecCard title={levels.komisaris} icon={Shield} variant="primary" />
              <VerticalConnector height={40} active />

              {/* Executive: Pres Dir & Dir */}
              <div className="relative flex flex-col items-center w-full">
                <ExecCard title={levels.direktur_utama} icon={UserCog} />
                <VerticalConnector height={40} active />
                <ExecCard title={levels.direktur} icon={Briefcase} />
                <VerticalConnector height={60} active />

              </div>
            </div>

            {/* Management Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-10">
              {/* Horizontal line for Desktop - Continuous & Precise */}
              <div className="hidden lg:block absolute -top-[80px] left-[calc(12.5%-12px)] right-[calc(12.5%-12px)] h-[2px] bg-[#062b4a] pointer-events-none" />

              {managers.map((m, idx) => (
                <div key={m.key} className="flex flex-col">
                  {/* Manager Level */}
                  <ManagerCardComponent title={m.data.title} icon={m.icon} delay={idx * 0.1} />

                  {/* Connector to Supervisors */}
                  <div className="flex flex-col items-center my-8">
                    <div className="w-[2px] h-12 bg-slate-300" />
                    <div className="-mt-2">
                      <ChevronDown className="w-5 h-5 text-[#062b4a]/30" />
                    </div>
                  </div>

                  {/* Supervisors & Staff Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {m.data.supervisors.map((s, sIdx) => {
                      const supervisorStaff = getStaffForSupervisor(m.key, sIdx, m.data.staff)
                      return (
                        <div key={sIdx} className="flex flex-col items-center">
                          <SupervisorCardComponent
                            name={s}
                            delay={0.2 + idx * 0.1 + sIdx * 0.1}
                          />

                          {/* Connector Line to Staff */}
                          <div className="w-[1px] h-4 bg-slate-200" />

                          <div className="space-y-1.5 w-full">
                            {supervisorStaff.map((st, stIdx) => (
                              <div key={stIdx} className="flex flex-col items-center w-full">
                                <StaffCardComponent
                                  name={st}
                                  delay={0.3 + idx * 0.1 + sIdx * 0.1 + stIdx * 0.05}
                                />
                                {stIdx < supervisorStaff.length - 1 && (
                                  <div className="w-[1px] h-1.5 bg-slate-100" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER NOTE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-400 text-sm text-center"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400">
              <Info className="w-5 h-5" />
            </div>
            <p className="max-w-2xl italic font-medium">
              {d.bottom_note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
