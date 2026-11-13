import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Store, ShieldCheck, ArrowRight, KeyRound, AlertCircle, Sparkles } from 'lucide-react'
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

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('customer') // 'customer' | 'shop-owner' | 'super-admin'
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // Demo Credentials helper to quickly fill credentials for college evaluator testing
  const handleQuickFill = (role, demoEmail, demoPassword) => {
    setSelectedRole(role)
    setEmail(demoEmail)
    setPassword(demoPassword)
    setErrorMessage(null)
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage(null)

    // Basic email format check
    if (!email || !email.trim()) {
      setErrorMessage('Please enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }
    if (!password || !password.trim()) {
      setErrorMessage('Please enter your password.')
      return
    }

    setIsLoading(true)

    try {
      const result = await login(email, password, selectedRole)
      setIsLoading(false)

      if (result.success) {
        // Role-based redirection logic
        if (result.user.role === 'super-admin' || result.user.role === 'admin') {
          navigate('/admin/dashboard')
        } else if (result.user.role === 'shop-owner' || result.user.role === 'owner') {
          navigate('/owner/dashboard')
        } else {
          navigate('/user/dashboard')
        }
      } else {
        setErrorMessage(result.error)
      }
    } catch (err) {
      setIsLoading(false)
      setErrorMessage(err.message || 'Login encountered an unexpected error.')
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-sm">
            Sign in to continue to your DroneHub account.
          </p>
        </div>

        {/* ROLE SELECTION SEGMENTED CONTROL */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Login As
          </label>
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            
            {/* Customer Option */}
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'customer'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Customer</span>
            </button>

            {/* Shop Owner Option */}
            <button
              type="button"
              onClick={() => setSelectedRole('shop-owner')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'shop-owner'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Shop Owner</span>
            </button>

            {/* Super Admin Option */}
            <button
              type="button"
              onClick={() => setSelectedRole('super-admin')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'super-admin'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Super Admin</span>
            </button>

          </div>
        </div>

        {/* ERROR MESSAGE DISPLAY */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                aria-label={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>Remember me</span>
            </label>

            <Link
              to="/auth/forgot-password"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Signing you in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* DEMO CREDENTIALS HELPER BOX FOR COLLEGE EVALUATOR */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Demo Test Credentials (1-Click Fill)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickFill('customer', 'user@dronehub.com', 'user123')}
              className="p-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-blue-600">Customer</div>
              <div className="text-slate-500 text-[10px] truncate">user@dronehub.com</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('shop-owner', 'owner@dronehub.com', 'owner123')}
              className="p-2 bg-white hover:bg-purple-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-purple-600">Owner 101</div>
              <div className="text-slate-500 text-[10px] truncate">SkyRent (101)</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('shop-owner', 'owner2@dronehub.com', 'owner123')}
              className="p-2 bg-white hover:bg-purple-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-purple-600">Owner 102</div>
              <div className="text-slate-500 text-[10px] truncate">AeroTech (102)</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('super-admin', 'admin@dronehub.com', 'admin123')}
              className="p-2 bg-white hover:bg-emerald-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-emerald-600">Super Admin</div>
              <div className="text-slate-500 text-[10px] truncate">admin@dronehub.com</div>
            </button>
          </div>
        </div>

        {/* Bottom Footer: Register Link */}
        <div className="text-center text-xs text-slate-600 pt-2 border-t border-slate-100">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-bold text-blue-600 hover:text-blue-700">
            Create an Account
          </Link>
        </div>

      </div>
    </AuthLayout>
  )
}

export default LoginPage
