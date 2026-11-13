import React from 'react'

/**
 * ReportSummary Component
 * Summary cards grid for report document previews.
 */
function ReportSummary({ cards = [] }) {
  if (!cards || !cards.length) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map((card, idx) => (
        <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">
            {card.label}
          </span>
          <div className="text-lg font-black text-slate-900 font-mono tracking-tight">
            {card.value}
          </div>
          {card.sub && (
            <div className="text-[10px] text-slate-500 font-medium">
              {card.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ReportSummary
