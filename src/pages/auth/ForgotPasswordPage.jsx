import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'

/*
  DEVELOPER NOTE:
  This authentication system is a frontend prototype.
  Real authentication, authorization, password hashing,
  sessions/tokens, and backend security must be implemented
  when the backend is connected.
*/

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    // Frontend simulation response
    setIsSubmitted(true)
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Forgot Your Password?
              </h1>
              <p className="text-slate-500 text-sm">
                Enter your email address and we'll help you reset your password.
              </p>
            </div>

            {/* ERROR DISPLAY */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-slate-800 font-medium transition-all"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Send Reset Link</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          /* SIMULATED SUCCESS DISPLAY */
          <div className="text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Instructions Sent!
              </h2>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                Password reset instructions have been sent to <span className="font-bold text-slate-800">{email}</span>.
              </p>
            </div>

            {/* Test Helper shortcut to test /auth/reset-password directly */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-900 font-medium">
              <span>Frontend Demo Shortcut: </span>
              <Link to="/auth/reset-password" className="font-bold underline text-blue-600">
                Click here to test Reset Password UI
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>

      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
