import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

/**
 * AnalyticsStatCard Component
 * Reusable KPI Card displaying title, value, percentage change, and trend icon.
 */
function AnalyticsStatCard({
  title = "Metric",
  value = "0",
  change = "+0%",
  isPositive = true,
  icon: Icon,
  colorScheme = "blue", // "blue" | "emerald" | "purple" | "amber" | "rose"
  subtitle
}) {
  const getColorStyles = () => {
    switch (colorScheme) {
      case 'emerald':
        return { cardBg: 'bg-emerald-50/50 border-emerald-100', iconBg: 'bg-emerald-600 text-white', textAccent: 'text-emerald-700' }
      case 'purple':
        return { cardBg: 'bg-purple-50/50 border-purple-100', iconBg: 'bg-purple-600 text-white', textAccent: 'text-purple-700' }
      case 'amber':
        return { cardBg: 'bg-amber-50/50 border-amber-100', iconBg: 'bg-amber-500 text-white', textAccent: 'text-amber-700' }
      case 'rose':
        return { cardBg: 'bg-rose-50/50 border-rose-100', iconBg: 'bg-rose-600 text-white', textAccent: 'text-rose-700' }
      default:
        return { cardBg: 'bg-blue-50/50 border-blue-100', iconBg: 'bg-blue-600 text-white', textAccent: 'text-blue-700' }
    }
  }

  const styles = getColorStyles()
  const isNeutral = change === '0%' || change === '0' || !change

  return (
    <div className={`p-5 rounded-3xl border ${styles.cardBg} bg-white shadow-2xs space-y-3 transition-all hover:shadow-md hover:scale-[1.01]`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-2xl shadow-xs shrink-0 ${styles.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
          {value}
        </div>

        <div className="flex items-center justify-between">
          {change && (
            <span className={`inline-flex items-center gap-1 text-xs font-extrabold ${
              isNeutral
                ? 'text-slate-500'
                : isPositive
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}>
              {isNeutral ? (
                <Minus className="w-3.5 h-3.5" />
              ) : isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>{change}</span>
              <span className="text-[10px] text-slate-400 font-normal">vs prev period</span>
            </span>
          )}

          {subtitle && (
            <span className="text-[10px] text-slate-400 font-medium ml-auto">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsStatCard
