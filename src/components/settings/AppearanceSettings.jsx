import React, { useState } from 'react'
import { Sun, Moon, Monitor, Globe, CheckCircle2, Layout } from 'lucide-react'
import { getTheme, saveTheme } from '../../utils/settingsUtils'

/**
 * AppearanceSettings Component
 * Allows user to set application theme, language, and layout density.
 */
function AppearanceSettings() {
  const [theme, setThemeState] = useState(() => getTheme())
  const [language, setLanguage] = useState('English')
  const [compactMode, setCompactMode] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const handleSelectTheme = (selected) => {
    setThemeState(selected)
    saveTheme(selected)
    setToastMsg(`Theme preference set to ${selected.toUpperCase()}`)
    setTimeout(() => setToastMsg(''), 2500)
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
          <Sun className="w-4 h-4 text-amber-500" />
          <span>Appearance & Language Preferences</span>
        </h3>
        <p className="text-xs text-slate-400 font-medium">Customize interface theme, display density, and platform language.</p>
      </div>

      {/* Theme Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Interface Theme</label>
        <div className="grid grid-cols-3 gap-3">
          
          <button
            type="button"
            onClick={() => handleSelectTheme('light')}
            className={`p-4 rounded-2xl border text-center space-y-2 transition-all cursor-pointer ${
              theme === 'light'
                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Sun className="w-6 h-6 mx-auto text-amber-500" />
            <div className="text-xs font-extrabold">Light Mode</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTheme('dark')}
            className={`p-4 rounded-2xl border text-center space-y-2 transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-900 border-blue-500 text-white shadow-2xs ring-2 ring-blue-500/20'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Moon className="w-6 h-6 mx-auto text-blue-400" />
            <div className="text-xs font-extrabold">Dark Mode</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTheme('system')}
            className={`p-4 rounded-2xl border text-center space-y-2 transition-all cursor-pointer ${
              theme === 'system'
                ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-2xs ring-2 ring-purple-500/20'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Monitor className="w-6 h-6 mx-auto text-purple-600" />
            <div className="text-xs font-extrabold">System Match</div>
          </button>

        </div>
      </div>

      {/* Language Selector */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Display Language</label>
        <div className="flex items-center gap-3 max-w-xs">
          <Globe className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value)
              setToastMsg(`Language set to ${e.target.value}`)
              setTimeout(() => setToastMsg(''), 2500)
            }}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
          >
            <option value="English">English (United States)</option>
            <option value="Hindi">Hindi (हिंदी)</option>
          </select>
        </div>
      </div>

    </div>
  )
}

export default AppearanceSettings
