import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation, ArrowLeft, Home, LayoutDashboard, Compass } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/**
 * NotFound Component (404 Page)
 * Custom role-aware 404 page for invalid URL paths.
 */
function NotFound() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const getDashboardPath = () => {
    if (!currentUser) return '/'
    if (currentUser.role === 'super-admin') return '/admin/dashboard'
    if (currentUser.role === 'shop-owner') return '/owner/dashboard'
    return '/user/dashboard'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full space-y-6">
        
        {/* Brand Icon Badge */}
        <div className="w-16 h-16 rounded-3xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        {/* Big 404 Text */}
        <div className="space-y-2">
          <div className="text-7xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300">
            404
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Page Off-Course!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
            The flight path or page you are looking for does not exist or has been relocated to another sector.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-300 font-bold text-xs hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to={getDashboardPath()}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>

        {/* Footer Brand Label */}
        <div className="pt-6 border-t border-slate-900 text-[11px] text-slate-600 font-mono">
          DRONEHUB PLATFORM SECURITY AUDIT • SECTOR 404
        </div>

      </div>
    </div>
  )
}

export default NotFound
