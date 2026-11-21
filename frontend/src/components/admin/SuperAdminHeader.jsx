import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, User, Settings, LogOut, ShieldCheck, ChevronDown, Activity } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import NotificationBell from '../notifications/NotificationBell'

function SuperAdminHeader({ onMobileMenuToggle }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-600 bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {greeting}, {currentUser?.name?.split(' ')[0] || 'Admin'} 👋
              </h1>
              <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>🟢 All Systems Operational</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              DroneHub Platform Master Control Panel & Analytics.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
          <NotificationBell
            role="super-admin"
            userId={1}
            shopId={null}
            viewAllLink="/admin/notifications"
          />

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 p-1.5 pr-3 rounded-2xl border border-slate-200 transition-all cursor-pointer"
            >
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200"
              />
              <div className="text-left text-xs hidden sm:block">
                <div className="font-extrabold text-slate-900 truncate max-w-[120px]">
                  {currentUser?.name || "Platform Admin"}
                </div>
                <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                  Super Admin
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-slate-100 space-y-0.5">
                  <div className="font-bold text-slate-900">{currentUser?.name || "Platform Admin"}</div>
                  <div className="text-slate-500 text-[11px] truncate">{currentUser?.email || "admin@dronehub.com"}</div>
                </div>

                <Link
                  to="/admin/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-bold transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Admin Profile</span>
                </Link>

                <Link
                  to="/admin/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 font-bold transition-colors"
                >
                  <Settings className="w-4 h-4 text-emerald-600" />
                  <span>Platform Settings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer text-left border-t border-slate-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  )
}

export default SuperAdminHeader
