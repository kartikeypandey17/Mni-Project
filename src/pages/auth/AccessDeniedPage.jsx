import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, LayoutDashboard, Home } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function AccessDeniedPage() {
  const navigate = useNavigate()
  const { currentUser, userRole } = useAuth()

  const handleGoToDashboard = () => {
    if (!userRole) {
      navigate('/auth/login')
      return
    }
    if (userRole === 'super-admin') navigate('/admin/dashboard')
    else if (userRole === 'shop-owner') navigate('/owner/dashboard')
    else navigate('/user/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-xl space-y-6">
        
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            HTTP 403 Forbidden
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Access Denied
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            You don't have permission to access this page. This area requires specific role privileges.
          </p>
        </div>

        {currentUser && (
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 font-medium">
            Currently logged in as <span className="font-bold text-slate-900">{currentUser.name}</span> ({userRole})
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleGoToDashboard}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs shadow-md transition-all cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to My Dashboard</span>
          </button>

          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default AccessDeniedPage
