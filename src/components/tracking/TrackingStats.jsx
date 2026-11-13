import React from 'react'
import { Radio, Navigation, BatteryWarning, WifiOff } from 'lucide-react'

/**
 * TrackingStats Component
 * Displays summary cards for admin platform view.
 * Shows counts for: Total Active Drones, In Flight, Low Battery, Offline
 */
function TrackingStats({ drones = [] }) {
  const totalActive = drones.length
  const inFlightCount = drones.filter(d => d.status === 'in-flight').length
  const lowBatteryCount = drones.filter(d => d.battery < 20).length
  const offlineCount = drones.filter(d => d.status === 'offline').length

  const cards = [
    {
      title: "Active Drones",
      count: totalActive,
      icon: Radio,
      bgColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconBg: "bg-blue-600 text-white"
    },
    {
      title: "In Flight",
      count: inFlightCount,
      icon: Navigation,
      bgColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconBg: "bg-emerald-600 text-white"
    },
    {
      title: "Low Battery",
      count: lowBatteryCount,
      icon: BatteryWarning,
      bgColor: "bg-amber-50 text-amber-800 border-amber-200",
      iconBg: "bg-amber-500 text-white"
    },
    {
      title: "Offline",
      count: offlineCount,
      icon: WifiOff,
      bgColor: "bg-rose-50 text-rose-700 border-rose-200",
      iconBg: "bg-rose-600 text-white"
    }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl border ${card.bgColor} shadow-2xs flex items-center justify-between transition-all hover:shadow-md`}
          >
            <div>
              <span className="text-xs font-semibold block text-slate-500">{card.title}</span>
              <span className="text-2xl font-black tracking-tight font-mono">{card.count}</span>
            </div>
            <div className={`p-2.5 rounded-xl shadow-xs ${card.iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TrackingStats
