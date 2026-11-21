import React from 'react'
import { Battery, BatteryCharging, BatteryWarning, Zap } from 'lucide-react'

/**
 * BatteryIndicator Component
 * Renders battery percentage, visual progress bar, and dynamic status state.
 * Dynamic visual states:
 *   > 50: Normal (Emerald)
 *   20-50: Warning (Amber)
 *   < 20: Critical (Rose)
 */
function BatteryIndicator({ battery = 100, showDetails = true, size = "md" }) {
  // Determine state based on percentage
  const isCritical = battery < 20
  const isWarning = battery >= 20 && battery <= 50
  const isNormal = battery > 50

  const getColorClasses = () => {
    if (isCritical) {
      return {
        text: 'text-rose-600',
        bg: 'bg-rose-500',
        border: 'border-rose-300',
        badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
        statusLabel: 'CRITICAL'
      }
    }
    if (isWarning) {
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-500',
        border: 'border-amber-300',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
        statusLabel: 'WARNING'
      }
    }
    return {
      text: 'text-emerald-600',
      bg: 'bg-emerald-500',
      border: 'border-emerald-300',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      statusLabel: 'HEALTHY'
    }
  }

  const styles = getColorClasses()

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-bold">
          {isCritical ? (
            <BatteryWarning className={`w-4 h-4 ${styles.text} animate-bounce`} />
          ) : (
            <Battery className={`w-4 h-4 ${styles.text}`} />
          )}
          <span className={`text-sm font-extrabold ${styles.text}`}>
            {battery}%
          </span>
        </div>

        {showDetails && (
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${styles.badgeBg}`}>
            {styles.statusLabel}
          </span>
        )}
      </div>

      {/* Battery Gauge Bar */}
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${styles.bg} ${
            isCritical ? 'animate-pulse' : ''
          }`}
          style={{ width: `${Math.max(0, Math.min(100, battery))}%` }}
        />
      </div>
    </div>
  )
}

export default BatteryIndicator
