import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff, Store, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import { useAuth } from '../../context/AuthContext'

/*
  DEVELOPER NOTE:
  This authentication system is a frontend prototype.
  Real authentication, authorization, password hashing,
  sessions/tokens, and backend security must be implemented
  when the backend is connected.
*/

function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  // Form State
  const [role, setRole] = useState('customer') // 'customer' | 'shop-owner'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  // Password Strength Calculation Helper
  const passwordStrength = useMemo(() => {
    if (!password) return { label: '', color: 'bg-slate-200', score: 0 }
    let score = 0
    if (password.length >= 8) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++

    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/3' }
    if (score === 3) return { label: 'Medium', color: 'bg-amber-500', width: 'w-2/3' }
    return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' }
  }, [password])

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!fullName || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full legal name.')
      return
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (!phone || !/^[0-9+\s-]{10,15}$/.test(phone.trim())) {
      setErrorMessage('Please enter a valid phone number.')
      return
    }

    if (!password || password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms & Conditions to register.')
      return
    }

    try {
      // Call backend registration handler
      const result = await register({ fullName, email, phone, password, role })

      if (result.success) {
        setIsSuccess(true)
      } else {
        setErrorMessage(result.error)
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.')
    }
  }

  // SUCCESSFUL REGISTRATION SCREEN
  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Account Created Successfully!
            </h1>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Your DroneHub account has been created. You can now sign in using your credentials.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/auth/login"
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Create Your DroneHub Account
          </h1>
          <p className="text-slate-500 text-sm">
            Join thousands of pilots and drone rental hosts.
          </p>
        </div>

        {/* ACCOUNT TYPE SELECTOR CARDS */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                role === 'customer'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                <User className="w-4 h-4 text-blue-600" />
                <span>Customer</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                Rent drones for your projects & missions.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole('shop-owner')}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                role === 'shop-owner'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                <Store className="w-4 h-4 text-purple-600" />
                <span>Shop Owner</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                List & manage your rental fleet business.
              </p>
            </button>

          </div>
        </div>

        {/* ERROR DISPLAY */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Kartikey Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Password Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 chars"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                  required
                />
              </div>
            </div>

          </div>

          {/* Password Strength Meter */}
          {password && (
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold text-slate-600">
                <span>Password Strength:</span>
                <span className={passwordStrength.label === 'Strong' ? 'text-emerald-600' : passwordStrength.label === 'Medium' ? 'text-amber-600' : 'text-rose-600'}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-300`} />
              </div>
            </div>
          )}

          {/* Terms & Conditions Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 font-medium select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-0.5"
              />
              <span>
                I agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); alert("DroneHub Rental Terms & Safety Policy"); }} className="text-blue-600 underline font-bold">Terms & Conditions</a> and Drone Operating Safety Guidelines.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 pt-2 border-t border-slate-100">
          Already have a DroneHub account?{' '}
          <Link to="/auth/login" className="font-bold text-blue-600 hover:text-blue-700">
            Sign In
          </Link>
        </div>

      </div>
    </AuthLayout>
  )
}

export default RegisterPage
