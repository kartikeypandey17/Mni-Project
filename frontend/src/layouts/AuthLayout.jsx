import React from 'react'
import { Link } from 'react-router-dom'

// AuthLayout: AeroPulse-inspired two-column auth wrapper
function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#0f131c] bg-grid-pattern flex items-center justify-center p-4 sm:p-6 lg:p-8">

      <div className="w-full max-w-5xl bg-[#181c24]/90 border border-[#3b494b]/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">

        {/* LEFT: Branding panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0a0e16] via-[#0f131c] to-[#0a0e16] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border-r border-[#3b494b]/30">

          {/* Top content */}
          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00dbe9] to-[#3e90ff] flex items-center justify-center glow-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[#002022]" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                  flight_takeoff
                </span>
              </div>
              <span className="text-[22px] font-bold text-[#00f0ff] tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                DroneHub
              </span>
            </Link>

            <div className="space-y-2 pt-4">
              <div
                className="inline-flex items-center gap-2 bg-[#1c2028] border border-[#00f0ff]/20 text-[#00f0ff] px-3 py-1 rounded-full text-[11px] font-semibold"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <div className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f0ff]" />
                </div>
                Multi-Tenant UAV Ecosystem
              </div>

              <h2 className="text-[28px] font-bold text-[#dfe2ee] leading-tight text-glow-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Rent. Fly. Track.
              </h2>
              <p className="text-[13px] text-[#849495] leading-relaxed">
                Connect with verified drone shops, access high-spec quadcopters, and manage commercial aerial missions effortlessly.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3 py-8 relative z-10">
            {[
              { icon: 'verified_user', color: '#00f0ff', title: '100% Insured & Verified Fleet', desc: 'Certified rental hosts & pre-calibrated equipment.' },
              { icon: 'bolt', color: '#aac7ff', title: 'Instant Rental Reservation', desc: 'Seamless digital dispatch and transparent deposit rules.' },
              { icon: 'explore', color: '#4ae176', title: 'Role-Based Dashboard Access', desc: 'Tailored portals for Customers, Shop Owners, & Admins.' },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="flex items-start gap-3 bg-[#1c2028] p-3.5 rounded-2xl border border-[#3b494b]/40">
                <span className="material-symbols-outlined shrink-0 mt-0.5" style={{ fontSize: '18px', color, fontVariationSettings: "'FILL' 1" }}>
                  {icon}
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-[#dfe2ee]">{title}</div>
                  <div className="text-[11px] text-[#849495] mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-[11px] text-[#3b494b] relative z-10 pt-4 border-t border-[#3b494b]/20" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            © {new Date().getFullYear()} DroneHub Inc. All rights reserved.
          </div>

          {/* Background glow decorations */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-[#00f0ff]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-56 h-56 bg-[#3e90ff]/6 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* RIGHT: Form content */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-[#0f131c]/40 space-y-6">
          {children}
        </div>

      </div>
    </div>
  )
}

export default AuthLayout
