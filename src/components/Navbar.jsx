import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navigation, Menu, X, ArrowRight, User, LogOut, LayoutDashboard, ShieldCheck, Store } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Navbar Component: Responsive top navigation bar with active links, auth state, and mobile drawer
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const { currentUser, isAuthenticated, userRole, logout } = useAuth()
  const navigate = useNavigate()

  // Track window scroll position to add sticky background blur & shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation Items Array
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Drones', path: '/drones' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  // Get dashboard path by role
  const getDashboardPath = () => {
    if (userRole === 'super-admin') return '/admin/dashboard'
    if (userRole === 'shop-owner') return '/owner/dashboard'
    return '/user/dashboard'
  }

  // Format user role label
  const getRoleLabel = () => {
    if (userRole === 'super-admin') return 'Super Admin'
    if (userRole === 'shop-owner') return 'Shop Owner'
    return 'Customer'
  }

  const handleLogout = () => {
    logout()
    setIsProfileDropdownOpen(false)
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-200 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Left Side: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-blue-600 hover:text-blue-700 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Navigation className="w-6 h-6 transform rotate-45" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              DRONE<span className="text-blue-600">HUB</span>
            </span>
          </Link>

          {/* Middle: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Side: Action Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 p-1.5 pr-3 rounded-full border border-slate-200 transition-all cursor-pointer"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full object-cover border border-white"
                  />
                  <div className="text-left text-xs leading-tight">
                    <div className="font-extrabold text-slate-900 truncate max-w-[100px]">
                      {currentUser?.name}
                    </div>
                    <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                      {getRoleLabel()}
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-slate-100 space-y-0.5">
                      <div className="font-bold text-slate-900">{currentUser?.name}</div>
                      <div className="text-slate-500 text-[11px] truncate">{currentUser?.email}</div>
                    </div>

                    <Link
                      to={getDashboardPath()}
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-slate-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors"
                >
                  Login
                </Link>
                
                <Link
                  to="/auth/register"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 hover:text-blue-600 p-2 rounded-lg focus:outline-none bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-sm text-slate-900">{currentUser?.name}</div>
                    <div className="text-xs text-blue-600 font-bold uppercase">{getRoleLabel()}</div>
                  </div>
                </div>

                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-xs"
                >
                  My Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-rose-50 text-rose-700 hover:bg-rose-100 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center text-slate-700 hover:bg-slate-100 py-2.5 rounded-xl font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold shadow-xs"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
