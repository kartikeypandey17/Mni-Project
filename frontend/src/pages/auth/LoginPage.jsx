import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import { useAuth } from '../../context/AuthContext'

/*
  DEVELOPER NOTE:
  This authentication system is a frontend prototype.
  Real authentication, authorization, password hashing,
  sessions/tokens, and backend security must be implemented
  when the backend is connected.
*/

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('customer')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleQuickFill = (role, demoEmail, demoPassword) => {
    setSelectedRole(role)
    setEmail(demoEmail)
    setPassword(demoPassword)
    setErrorMessage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage(null)
    if (!email || !email.trim()) { setErrorMessage('Please enter your email address.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setErrorMessage('Please enter a valid email address.'); return }
    if (!password || !password.trim()) { setErrorMessage('Please enter your password.'); return }
    setIsLoading(true)
    try {
      const result = await login(email, password, selectedRole)
      setIsLoading(false)
      if (result.success) {
        if (result.user.role === 'super-admin' || result.user.role === 'admin') navigate('/admin/dashboard')
        else if (result.user.role === 'shop-owner' || result.user.role === 'owner') navigate('/owner/dashboard')
        else navigate('/user/dashboard')
      } else {
        setErrorMessage(result.error)
      }
    } catch (err) {
      setIsLoading(false)
      setErrorMessage(err.message || 'Login encountered an unexpected error.')
    }
  }

  const inputClass = "w-full h-11 bg-[#1c2028] border border-[#3b494b]/50 focus:border-[#00f0ff]/60 focus:ring-1 focus:ring-[#00f0ff]/20 focus:outline-none rounded-xl px-4 text-[14px] text-[#dfe2ee] placeholder-[#3b494b] transition-all"
  const labelClass = "block text-[11px] font-bold text-[#b9cacb] uppercase tracking-widest mb-1"

  return (
    <AuthLayout>
      <div className="space-y-5">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-[28px] font-bold text-[#dfe2ee] tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Welcome Back
          </h1>
          <p className="text-[13px] text-[#849495]">Sign in to continue to your DroneHub account.</p>
        </div>

        {/* Role Selector */}
        <div className="space-y-2">
          <label className={labelClass} style={{ fontFamily: 'JetBrains Mono, monospace' }}>Login As</label>
          <div className="grid grid-cols-3 gap-2 bg-[#0a0e16] border border-[#3b494b]/40 p-1.5 rounded-2xl">
            {[
              { role: 'customer', icon: 'person', label: 'Customer' },
              { role: 'shop-owner', icon: 'storefront', label: 'Shop Owner' },
              { role: 'super-admin', icon: 'admin_panel_settings', label: 'Admin' },
            ].map(({ role, icon, label }) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${selectedRole === role
                  ? 'bg-[#00f0ff] text-[#002022] shadow-[0_0_16px_rgba(0,240,255,0.3)]'
                  : 'text-[#849495] hover:text-[#dfe2ee] hover:bg-[#1c2028]'
                  }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '15px', fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="p-3.5 bg-[#93000a]/20 border border-[#ffb4ab]/30 text-[#ffb4ab] rounded-2xl text-[12px] font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className={labelClass} style={{ fontFamily: 'JetBrains Mono, monospace' }}>Email Address</label>
            <div className="relative">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} pr-10`} required />
              <span className="material-symbols-outlined text-[#849495] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ fontSize: '16px' }}>mail</span>
            </div>
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: 'JetBrains Mono, monospace' }}>Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#849495] hover:text-[#00f0ff] cursor-pointer transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px] pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#849495] select-none">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded accent-[#00f0ff] bg-[#1c2028]" />
              <span>Remember me</span>
            </label>
            <Link to="/auth/forgot-password" className="font-semibold text-[#00f0ff] hover:text-[#7df4ff] transition-colors">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-[#00f0ff] text-[#002022] font-bold text-[14px] transition-all hover:bg-[#7df4ff] glow-primary active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span><span>Signing in...</span></>
            ) : (
              <><span>Sign In</span><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span></>
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="p-4 bg-[#1c2028] border border-[#00f0ff]/15 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#b9cacb]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <span className="material-symbols-outlined text-[#00f0ff]" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
            Demo Test Credentials (1-Click Fill)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { role: 'customer', email: 'user@dronehub.com', pass: 'user123', label: 'Customer', sub: 'user@dronehub.com', color: '#00f0ff' },
              { role: 'shop-owner', email: 'owner@dronehub.com', pass: 'owner123', label: 'Owner 101', sub: 'SkyRent (101)', color: '#aac7ff' },
              { role: 'shop-owner', email: 'owner2@dronehub.com', pass: 'owner123', label: 'Owner 102', sub: 'AeroTech (102)', color: '#aac7ff' },
              { role: 'super-admin', email: 'admin@dronehub.com', pass: 'admin123', label: 'Super Admin', sub: 'admin@dronehub.com', color: '#4ae176' },
            ].map(({ role, email: e, pass, label, sub, color }) => (
              <button key={label} type="button" onClick={() => handleQuickFill(role, e, pass)}
                className="p-2 bg-[#262a33] hover:bg-[#31353e] border border-[#3b494b]/40 rounded-xl text-left transition-colors cursor-pointer">
                <div className="text-[11px] font-bold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>{label}</div>
                <div className="text-[10px] text-[#849495] truncate">{sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[12px] text-[#849495] pt-2 border-t border-[#3b494b]/30">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-bold text-[#00f0ff] hover:text-[#7df4ff] transition-colors">Create an Account</Link>
        </div>

      </div>
    </AuthLayout>
  )
}

export default LoginPage
