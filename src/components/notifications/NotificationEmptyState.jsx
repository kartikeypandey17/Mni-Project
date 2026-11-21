import React from 'react'
import { BellOff, CheckCircle2 } from 'lucide-react'

/**
 * NotificationEmptyState Component
 * Displays empty state when no notifications are present.
 */
function NotificationEmptyState({ title = "You're all caught up!", message = "No notifications match your current filter settings." }) {
  return (
    <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-3 shadow-2xs">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
        <BellOff className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-black text-slate-900">{title}</h3>
        <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">{message}</p>
      </div>

      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Inbox Clean & Verified</span>
      </div>
    </div>
  )
}

export default NotificationEmptyState
