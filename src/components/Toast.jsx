import React from 'react'
import { CheckCircle2, Heart, X } from 'lucide-react'

// Toast Component: Temporary notification alert for user interactions
function Toast({ message, type = 'info', onClose }) {
  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 animate-in slide-in-from-bottom-5 duration-300 max-w-md">
      {type === 'wishlist' ? (
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      )}
      
      <p className="text-sm font-semibold">{message}</p>
      
      <button
        onClick={onClose}
        className="ml-auto text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Toast
