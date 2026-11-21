import React, { useState } from 'react'
import { ShieldCheck, Save, CheckCircle2, Building2, CreditCard } from 'lucide-react'
import { getSettings, saveSettings } from '../../utils/settingsUtils'

/**
 * PlatformSettings Component
 * Super Admin system configuration editor.
 */
function PlatformSettings() {
  const [formData, setFormData] = useState(() => getSettings('admin'))
  const [toastMsg, setToastMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveSettings('admin', formData)
    setToastMsg('Platform settings updated successfully.')
    setTimeout(() => setToastMsg(''), 3000)
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
      
      {toastMsg && (
        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-600" />
          <span>Global Platform Parameters & Financial Rates</span>
        </h3>
        <p className="text-xs text-slate-400 font-medium">Configure platform name, support contacts, GST tax rate, and shop commission percentage.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Platform Name</label>
            <input
              type="text"
              name="platformName"
              value={formData.platformName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl text-xs font-semibold text-slate-900 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Support Email</label>
            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl text-xs font-semibold text-slate-900 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Support Phone</label>
            <input
              type="text"
              name="supportPhone"
              value={formData.supportPhone || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl text-xs font-semibold text-slate-900 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Currency</label>
            <input
              type="text"
              name="currency"
              value={formData.currency || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl text-xs font-semibold text-slate-900 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">GST Tax Rate (%)</label>
            <input
              type="number"
              name="taxPercentage"
              value={formData.taxPercentage || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl text-xs font-semibold text-slate-900 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Platform Commission Fee (%)</label>
            <input
              type="number"
              name="platformFee"
              value={formData.platformFee || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl text-xs font-semibold text-slate-900 outline-hidden"
            />
          </div>

        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Platform Settings</span>
          </button>
        </div>
      </form>

    </div>
  )
}

export default PlatformSettings
