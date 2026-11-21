import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Navigation, Calendar, Radio, Heart, FileText, 
  CreditCard, Bell, User, Settings, LogOut, X, ShieldCheck, BarChart2
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

// Customer Sidebar Component
function CustomerSidebar({ isOpen, onClose }) {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    if (onClose) onClose()
    navigate('/')
  }

  // Sidebar Menu Structure
  const menuGroups = [
    {
      groupTitle: "OVERVIEW",
      items: [
        { label: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard }
      ]
    },
    {
      groupTitle: "RENTALS & TRACKING",
      items: [
        { label: "My Rentals", path: "/user/rentals", icon: Navigation },
        { label: "My Bookings", path: "/user/bookings", icon: Calendar },
        { label: "Track Drone", path: "/user/tracking", icon: Radio }
      ]
    },
    {
      groupTitle: "INSIGHTS & REPORTS",
      items: [
        { label: "Analytics", path: "/user/analytics", icon: BarChart2 },
        { label: "Reports", path: "/user/reports", icon: FileText }
      ]
    },
    {
      groupTitle: "PERSONAL",
      items: [
        { label: "Wishlist", path: "/user/wishlist", icon: Heart },
        { label: "Documents", path: "/user/documents", icon: FileText },
        { label: "Payments", path: "/user/payments", icon: CreditCard },
        { label: "Notifications", path: "/user/notifications", icon: Bell }
      ]
    },
    {
      groupTitle: "ACCOUNT",
      items: [
        { label: "Profile", path: "/user/profile", icon: User },
        { label: "Settings", path: "/user/settings", icon: Settings }
      ]
    }
  ]

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-slate-900 text-slate-300 w-64 select-none">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pt-2 px-2">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Navigation className="w-5 h-5 transform rotate-45" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              DRONE<span className="text-blue-500">HUB</span>
            </span>
          </Link>

          {/* Close button on mobile drawer */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Info Pill */}
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
            alt={currentUser?.name}
            className="w-9 h-9 rounded-xl object-cover border border-slate-600 shrink-0"
          />
          <div className="space-y-0.5 truncate">
            <div className="text-xs font-bold text-white truncate">{currentUser?.name || 'Customer'}</div>
            <div className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>Customer</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu Groups */}
        <nav className="space-y-5 pt-2">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {group.groupTitle}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const ItemIcon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => onClose && onClose()}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`
                      }
                    >
                      <ItemIcon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Sign Out Button */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-600/20 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  )

  return (
    <>
      {/* Desktop & Tablet Permanent Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Slide-out Sidebar */}
          <div className="relative z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}

export default CustomerSidebar
