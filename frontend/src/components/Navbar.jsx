import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { currentUser, isAuthenticated, userRole, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Store', path: '/drones', icon: 'storefront' },
    { name: 'How It Works', path: '/how-it-works', icon: 'radar' },
    { name: 'About', path: '/about', icon: 'info' },
    { name: 'Contact', path: '/contact', icon: 'mail' },
  ]

  const getDashboardPath = () => {
    if (userRole === 'super-admin') return '/admin/dashboard'
    if (userRole === 'shop-owner') return '/owner/dashboard'
    return '/user/dashboard'
  }

  const getRoleLabel = () => {
    if (userRole === 'super-admin') return 'Super Admin'
    if (userRole === 'shop-owner') return 'Shop Owner'
    return 'Pilot'
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
          ? 'bg-[#0a0e16]/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.6)] border-b border-[#3b494b]/40'
          : 'bg-[#0a0e16]/70 backdrop-blur-md border-b border-[#3b494b]/20'
      }`}
    >
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00dbe9] to-[#3e90ff] flex items-center justify-center glow-primary group-hover:scale-105 transition-transform">
            <span
              className="material-symbols-outlined text-[#002022]"
              style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}
            >
              flight_takeoff
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5">
              <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="font-bold text-[18px] text-[#00f0ff] tracking-tight">
                DroneHub
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] font-bold uppercase tracking-wide border border-[#00f0ff]/20" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                v2.0
              </span>
            </div>
            <span className="text-[10px] text-[#b9cacb] leading-3 mt-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Rent. Fly. Track.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 font-semibold'
                    : 'text-[#b9cacb] hover:text-[#dfe2ee] hover:bg-[#1c2028]'
                }`
              }
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 bg-[#1c2028] hover:bg-[#262a33] border border-[#3b494b]/50 hover:border-[#00f0ff]/30 p-1.5 pr-3 rounded-full transition-all cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#00f0ff]/30"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#4ae176] rounded-full border-2 border-[#1c2028]" />
                </div>
                <div className="text-left">
                  <div className="text-[12px] font-semibold text-[#dfe2ee] leading-4 max-w-[90px] truncate">{currentUser?.name}</div>
                  <div className="text-[10px] text-[#00f0ff] font-semibold uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{getRoleLabel()}</div>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#1c2028] border border-[#3b494b]/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden py-1 z-50">
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#b9cacb] hover:bg-[#262a33] hover:text-[#00f0ff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#00f0ff]" style={{ fontSize: '16px' }}>dashboard</span>
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors cursor-pointer text-left"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-[13px] text-[#b9cacb] hover:text-[#dfe2ee] px-3 py-2 rounded-xl transition-colors hover:bg-[#1c2028]"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#00f0ff] text-[#002022] text-[13px] font-bold transition-all hover:bg-[#7df4ff] glow-primary active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#1c2028] border border-[#3b494b]/40 text-[#b9cacb] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#3b494b]/30 bg-[#0a0e16]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 font-semibold'
                    : 'text-[#b9cacb] hover:text-[#dfe2ee] hover:bg-[#1c2028]'
                }`
              }
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-[#3b494b]/20 flex flex-col gap-2 mt-2">
            {isAuthenticated ? (
              <>
                <div className="p-3 bg-[#1c2028] rounded-xl flex items-center gap-3 border border-[#3b494b]/30">
                  <img
                    src={currentUser?.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#00f0ff]/30"
                  />
                  <div>
                    <div className="text-[13px] font-semibold text-[#dfe2ee]">{currentUser?.name}</div>
                    <div className="text-[10px] text-[#00f0ff] uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{getRoleLabel()}</div>
                  </div>
                </div>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-[#00f0ff] text-[#002022] py-2.5 rounded-full font-bold text-[13px] glow-primary"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-[#93000a]/20 text-[#ffb4ab] py-2.5 rounded-full font-bold text-[13px] border border-[#ffb4ab]/20 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center text-[#b9cacb] hover:bg-[#1c2028] py-2.5 rounded-full font-medium text-[13px] border border-[#3b494b]/30"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-[#00f0ff] text-[#002022] py-2.5 rounded-full font-bold text-[13px] glow-primary"
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
