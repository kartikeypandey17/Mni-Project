import React, { useState } from 'react'
import { Bell, CheckCircle2, Save, ShieldCheck } from 'lucide-react'
import { getNotificationPreferences, saveNotificationPreferences } from '../../utils/settingsUtils'

/**
 * NotificationSettings Component
 * Toggle switches for user notification preferences persisted in localStorage.
 */
function NotificationSettings() {
  const [prefs, setPrefs] = useState(() => getNotificationPreferences())
  const [toastMsg, setToastMsg] = useState('')

  const handleToggle = (key) => {
    setPrefs((prev) => {
      const updated = { ...prev, [key]: !prev[key] }
      saveNotificationPreferences(updated)
      setToastMsg('Notification preferences updated.')
      setTimeout(() => setToastMsg(''), 2500)
      return updated
    })
  }

  const toggles = [
    { key: 'bookingUpdates', label: 'Booking Updates', desc: 'Receive real-time notifications for booking confirmations and status changes.' },
    { key: 'paymentUpdates', label: 'Payment Updates', desc: 'Alerts for successful billing charges, invoices, and refund receipts.' },
    { key: 'rentalUpdates', label: 'Rental Updates', desc: 'Notifications when rentals start, end, or near expiry.' },
    { key: 'trackingAlerts', label: 'Tracking Safety Alerts', desc: 'Critical flight warnings, low battery alerts, and geofence alerts.' },
    { key: 'promotionalNotifications', label: 'Promotional Notifications', desc: 'Seasonal discount codes, festive rental offers, and new drone announcements.' },
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send official PDF invoices and rental summaries to registered email.' },
    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Send SMS alert messages to mobile number for critical flight telemetry.' }
  ]

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
      
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Notification Channel Preferences</span>
        </h3>
        <p className="text-xs text-slate-400 font-medium">Control which notifications you receive across app alerts, email, and SMS.</p>
      </div>

      {/* Toggles List */}
      <div className="divide-y divide-slate-100">
        {toggles.map((t) => {
          const isOn = !!prefs[t.key]
          return (
            <div key={t.key} className="py-3.5 flex items-center justify-between gap-4">
              <div className="space-y-0.5 max-w-lg">
                <h4 className="text-xs font-extrabold text-slate-900">{t.label}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{t.desc}</p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => handleToggle(t.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isOn ? 'bg-blue-600' : 'bg-slate-200'
                }`}
                role="switch"
                aria-checked={isOn}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default NotificationSettings
