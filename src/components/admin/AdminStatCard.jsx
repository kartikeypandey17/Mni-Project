import React from 'react'

function AdminStatCard({ title, value, label, icon: Icon, color = 'emerald', trend }) {
  const getColorStyles = (c) => {
    switch (c) {
      case 'emerald':
        return { bg: 'bg-emerald-50', text: 'text-emerald-600' }
      case 'blue':
        return { bg: 'bg-blue-50', text: 'text-blue-600' }
      case 'purple':
        return { bg: 'bg-purple-50', text: 'text-purple-600' }
      case 'indigo':
        return { bg: 'bg-indigo-50', text: 'text-indigo-600' }
      case 'amber':
        return { bg: 'bg-amber-50', text: 'text-amber-600' }
      case 'rose':
        return { bg: 'bg-rose-50', text: 'text-rose-600' }
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-600' }
    }
  }

  const styles = getColorStyles(color)

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-xl ${styles.bg} ${styles.text} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {trend}
          </span>
        )}
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {value}
        </div>
        <div className="text-xs font-bold text-slate-700 mt-0.5">
          {title}
        </div>
        {label && (
          <p className="text-[11px] text-slate-400 mt-1">
            {label}
          </p>
        )}
      </div>
    </div>
  )
}

export default AdminStatCard
