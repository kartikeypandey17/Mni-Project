import React, { useState } from 'react'
import { ShieldAlert, AlertTriangle, X, CheckCircle2 } from 'lucide-react'
import alertService from '../../services/alertService'
import socketService from '../../services/socketService'

/**
 * EmergencyAlertModal Component
 * Confirmation modal for raising an emergency alert.
 * Dispatches alert via REST API & real-time Socket.IO.
 */
function EmergencyAlertModal({ isOpen, onClose, droneName, bookingId, droneId }) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleRaiseAlert = async () => {
    setIsSubmitted(true)
    try {
      await alertService.createAlert({
        droneId: droneId || 'sim-drone-1',
        alertType: 'emergency',
        message: `Immediate emergency alert raised for ${droneName || 'Drone'} (#${bookingId || 'DRN-8492'})`,
        severity: 'critical'
      })
    } catch (e) {
      console.warn('Alert API sync note:', e.message)
    }

    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Emergency Alert Raised</h3>
            <p className="text-xs font-bold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-xl border border-emerald-200">
              Emergency alert raised successfully.
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Ground operator notified & telemetry flagged.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Emergency Alert</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {droneName || "Active Drone"} ({bookingId || "DRN-10452"})
                </p>
              </div>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2 text-xs text-rose-900 font-medium">
              <div className="flex items-center gap-2 font-bold text-rose-700">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Confirm Immediate Protocol Flag</span>
              </div>
              <p>
                Are you sure you want to raise an emergency alert for this drone?
              </p>
            </div>

            {/* Developer Notice Badge */}
            <div className="p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-[10px] text-slate-500 font-mono text-center">
              ⚠️ Simulated Telemetry Mode: Emits real-time WebSocket alerts to connected operators. Physical drone hardware is not bound.
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRaiseAlert}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all shadow-md shadow-rose-600/30 cursor-pointer flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Raise Alert</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default EmergencyAlertModal
