import React, { useState } from 'react'
import { ShieldCheck, Lock, Laptop, Smartphone, Key, CheckCircle2, AlertCircle, LogOut } from 'lucide-react'

/**
 * SecuritySettings Component
 * Password change form and active login sessions management UI.
 */
function SecuritySettings() {
  const [passData, setPassData] = useState({ current: '', newPass: '', confirmPass: '' })
  const [errors, setErrors] = useState({})
  const [toastMsg, setToastMsg] = useState('')
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on macOS", location: "Bengaluru, KA, India", status: "Active now", isCurrent: true },
    { id: 2, device: "Safari on iPhone 15 Pro", location: "Bengaluru, KA, India", status: "2 hours ago", isCurrent: false }
  ])

  const handlePassChange = (e) => {
    const { name, value } = e.target
    setPassData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validatePassword = () => {
    const errs = {}
    if (!passData.current) errs.current = 'Current password is required.'
    if (!passData.newPass) errs.newPass = 'New password is required.'
    else if (passData.newPass.length < 8) errs.newPass = 'Password must be at least 8 characters long.'
    
    if (!passData.confirmPass) errs.confirmPass = 'Please confirm your new password.'
    else if (passData.newPass !== passData.confirmPass) errs.confirmPass = 'Passwords do not match.'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  /*
    DEVELOPER NOTE:
    Frontend demonstration only.
    No real passwords stored in localStorage or transmitted.
  */
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (!validatePassword()) return

    setPassData({ current: '', newPass: '', confirmPass: '' })
    setErrors({})
    setToastMsg('Password changed successfully.')
    setTimeout(() => setToastMsg(''), 3000)
  }

  const handleRevokeSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    setToastMsg('Session logged out successfully.')
    setTimeout(() => setToastMsg(''), 2500)
  }

  const handleRevokeAllOthers = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent))
    setToastMsg('Logged out of all other active sessions.')
    setTimeout(() => setToastMsg(''), 2500)
  }

  return (
    <div className="space-y-6">
      
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* CHANGE PASSWORD FORM */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-600" />
            <span>Change Account Password</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">Update your account password regularly to keep your rental profile secure.</p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          {/* Current Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Current Password</label>
            <input
              type="password"
              name="current"
              value={passData.current}
              onChange={handlePassChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 transition-all outline-hidden ${
                errors.current ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-600'
              }`}
            />
            {errors.current && <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.current}</p>}
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">New Password</label>
            <input
              type="password"
              name="newPass"
              value={passData.newPass}
              onChange={handlePassChange}
              placeholder="Min. 8 characters"
              className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 transition-all outline-hidden ${
                errors.newPass ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-600'
              }`}
            />
            {errors.newPass && <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.newPass}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPass"
              value={passData.confirmPass}
              onChange={handlePassChange}
              placeholder="Re-enter new password"
              className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 transition-all outline-hidden ${
                errors.confirmPass ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-600'
              }`}
            />
            {errors.confirmPass && <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPass}</p>}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-500 font-mono">
            ⚠️ Frontend demonstration only. Passwords are not stored in localStorage.
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4" />
            <span>Update Password</span>
          </button>
        </form>
      </div>

      {/* ACTIVE SESSIONS UI */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-purple-600" />
              <span>Active Login Sessions</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">Manage devices currently logged into your DroneHub account.</p>
          </div>

          {sessions.length > 1 && (
            <button
              type="button"
              onClick={handleRevokeAllOthers}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              Log Out All Other Sessions
            </button>
          )}
        </div>

        <div className="space-y-3">
          {sessions.map((sess) => (
            <div key={sess.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-200 text-slate-700 rounded-xl shrink-0">
                  {sess.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-slate-900">{sess.device}</h4>
                    {sess.isCurrent && (
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Active Now
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">{sess.location} • {sess.status}</p>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  type="button"
                  onClick={() => handleRevokeSession(sess.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  Log Out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SecuritySettings
