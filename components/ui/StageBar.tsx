'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StageBarProps {
  icon: LucideIcon
  title: string
  date: string
  stat: string
  statLabel: string
  heightPx: number
  gradient: string
  delay?: number
}

/**
 * The bar-chart-style tier card ("Group Stage" / "Regionals" / "Nationals")
 * used on both the home page and /how-it-works — previously copy-pasted
 * between the two with independently hardcoded dates, which had already
 * drifted out of sync. Both pages now pass in lib/content/season.ts data.
 */
export function StageBar({ icon: Icon, title, date, stat, statLabel, heightPx, gradient, delay = 0 }: StageBarProps) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0, transformOrigin: 'bottom' }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex-1 max-w-xs bg-gradient-to-t ${gradient} rounded-t-3xl shadow-soft relative group`}
      style={{ height: `${heightPx}px` }}
    >
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-28 h-28 bg-paper rounded-3xl shadow-soft-lg flex flex-col items-center justify-center p-2 group-hover:-translate-y-1 group-hover:-translate-x-1/2 transition-transform">
        <Icon className="h-5 w-5 text-redpen-600 mx-auto mb-1" />
        <h3 className="font-bold text-graphite-900 text-center text-xs">
          {title}
        </h3>
        <p className="text-[10px] text-graphite-600 mt-0.5">{date}</p>
      </div>
      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm font-bold text-white">{stat}</p>
        <p className="text-[10px] text-white/80 uppercase tracking-wide">{statLabel}</p>
      </div>
    </motion.div>
  )
}
