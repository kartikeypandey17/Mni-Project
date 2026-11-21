import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, User, Settings, LogOut, ShieldCheck, ChevronDown, Store } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { shopProfiles } from '../../data/shops'
import NotificationBell from '../notifications/NotificationBell'

function ShopOwnerHeader({ onMobileMenuToggle }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const shopId = currentUser?.shopId || 101
  const shop = shopProfiles.find((s) => s.shopId === shopId) || shopProfiles[0]

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
        
        {/* Left Side: Mobile Menu Trigger & Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-purple-600 bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {greeting}, {currentUser?.name?.split(' ')[0] || 'Owner'} 👋
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-purple-200">
                <ShieldCheck className="w-3 h-3 text-purple-600" />
                <span>{shop.name}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Manage your fleet inventory, rental bookings, and shop performance.
            </p>
          </div>
        </div>

        {/* Right Side: Notifications & Profile Dropdown */}
        <div className="flex items-center gap-3">
          
          <NotificationBell
            role="shop-owner"
            userId={currentUser?.id || 2}
            shopId={shopId}
            viewAllLink="/owner/notifications"
          />

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 p-1.5 pr-3 rounded-2xl border border-slate-200 transition-all cursor-pointer"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200"
              />
              <div className="text-left text-xs hidden sm:block">
                <div className="font-extrabold text-slate-900 truncate max-w-[120px]">
                  {currentUser?.name}
                </div>
                <div className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">
                  Shop Owner
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-slate-100 space-y-0.5">
                  <div className="font-bold text-slate-900">{currentUser?.name}</div>
                  <div className="text-slate-500 text-[11px] truncate">{currentUser?.email}</div>
                  <div className="text-[10px] text-purple-600 font-bold">Shop ID: #{shopId}</div>
                </div>

                <Link
                  to="/owner/shop-profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors"
                >
                  <Store className="w-4 h-4 text-purple-600" />
                  <span>Shop Storefront</span>
                </Link>

                <Link
                  to="/owner/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors"
                >
                  <Settings className="w-4 h-4 text-purple-600" />
                  <span>Shop Settings</span>
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

export default ShopOwnerHeader
