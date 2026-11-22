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
              <h1 className="text-3xl font-black text-white tracking-tight">
                Forgot Your Password?
              </h1>
              <p className="text-slate-500 text-sm">
                Enter your email address and we'll help you reset your password.
              </p>
            </div>

            {/* ERROR DISPLAY */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-900/20 border border-rose-500/30 text-rose-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-950 border border-purple-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-white placeholder-slate-600 font-medium transition-all"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all cursor-pointer flex items-center justify-center gap-2 glow-purple"
              >
                <span>Send Reset Link</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          /* SIMULATED SUCCESS DISPLAY */
          <div className="text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">
                Instructions Sent!
              </h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Password reset instructions have been sent to <span className="font-bold text-white">{email}</span>.
              </p>
            </div>

            {/* Test Helper shortcut to test /auth/reset-password directly */}
            <div className="p-3 bg-purple-900/20 border border-purple-500/20 rounded-xl text-xs text-slate-400 font-medium">
              <span>Frontend Demo Shortcut: </span>
              <Link to="/auth/reset-password" className="font-bold underline text-purple-400 hover:text-cyan-400 transition-colors">
                Click here to test Reset Password UI
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-purple-400 transition-colors"
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
