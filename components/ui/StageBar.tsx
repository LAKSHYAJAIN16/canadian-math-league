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
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex-1 max-w-xs bg-gradient-to-t ${gradient} rounded-t-lg shadow-md relative group hover:shadow-lg transition-all`}
      style={{ height: `${heightPx}px` }}
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-lg p-2">
        <Icon className="h-6 w-6 text-red-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
        <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-center text-sm">
          {title}
        </h3>
        <p className="text-xs font-medium text-red-600 mt-0.5">{date}</p>
      </div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-red-600">{stat}</p>
        <p className="text-xs text-gray-500">{statLabel}</p>
      </div>
    </motion.div>
  )
}
