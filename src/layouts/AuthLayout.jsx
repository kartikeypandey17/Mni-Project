import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, ShieldCheck, Compass, Zap, Sparkles } from 'lucide-react'

// AuthLayout Component: Professional 2-column desktop / 1-column mobile authentication wrapper
function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* LEFT COLUMN: BRANDING & PLATFORM BENEFITS (Hidden on small mobile, 5 cols on lg) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Top Logo & Title */}
          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Navigation className="w-6 h-6 transform rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                DRONE<span className="text-blue-400">HUB</span>
              </span>
            </Link>

            <div className="space-y-2 pt-4">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Multi-Tenant UAV Ecosystem</span>
              </div>
              
              <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
                Rent. Fly. Track.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connect with verified drone shops, access high-spec quadcopters, and manage commercial aerial missions effortlessly.
              </p>
            </div>
          </div>

          {/* Key Platform Benefits List */}
          <div className="space-y-4 py-8 relative z-10 text-xs">
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">100% Insured & Verified Fleet</div>
                <div className="text-slate-300 text-[11px]">Certified rental hosts & pre-calibrated equipment.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Instant Rental Reservation</div>
                <div className="text-slate-300 text-[11px]">Seamless digital dispatch and transparent deposit rules.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <Compass className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Role-Based Dashboard Access</div>
                <div className="text-slate-300 text-[11px]">Tailored portals for Customers, Shop Owners, & Admins.</div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-[11px] text-slate-400 relative z-10 pt-4 border-t border-slate-700/60">
            © {new Date().getFullYear()} DroneHub Inc. All rights reserved.
          </div>

          {/* Decorative background glow shapes */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

        </div>

        {/* RIGHT COLUMN: DYNAMIC AUTHENTICATION FORM CONTENT (7 cols on lg) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white space-y-6">
          {children}
        </div>

      </div>

    </div>
  )
}

export default AuthLayout
