import React from 'react'
import { Link } from 'react-router-dom'
import DroneCard from '../components/DroneCard'
import ShopCard from '../components/ShopCard'
import {
  categoriesData,
  stepsData,
  whyChooseData,
  featuredDrones,
  featuredShops,
  statsData,
} from '../data/mockData'

const categoryIcons = {
  Camera: 'photo_camera',
  Video: 'videocam',
  Sprout: 'eco',
  Map: 'map',
  Layers: 'layers',
  ShieldAlert: 'health_and_safety',
}

const featureIcons = {
  Grid: 'grid_view',
  ShieldCheck: 'verified_user',
  Zap: 'bolt',
  DollarSign: 'payments',
  Clock: 'schedule',
  Compass: 'explore',
}

const stepIcons = {
  Search: 'search',
  Sliders: 'tune',
  CalendarCheck: 'event_available',
  Send: 'send',
}

function Home() {
  return (
    <div className="bg-[#0f131c] space-y-20 pb-20 overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-grid-pattern overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/8 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3e90ff]/8 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-4xl mx-auto text-center space-y-7">

            {/* Live status badge */}
            <div
              className="inline-flex items-center gap-2 bg-[#1c2028] border border-[#00f0ff]/20 text-[#00f0ff] px-4 py-2 rounded-full text-[12px] font-semibold"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              </div>
              Next-Gen Multi-Tenant Drone Rental Ecosystem
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="text-[#dfe2ee]">Rent the Right</span>
              <br />
              <span className="text-[#00f0ff] text-glow-primary">Drone. Fly Free.</span>
            </h1>

            <p className="text-[16px] text-[#849495] leading-relaxed max-w-2xl mx-auto">
              Discover professional drones from trusted rental providers. Book with confidence
              and manage your entire drone rental experience from one smart platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/drones"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#00f0ff] text-[#002022] font-bold text-[14px] transition-all hover:bg-[#7df4ff] glow-primary active:scale-95"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
                Explore Drones
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
              <a
                href="#shops"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#1c2028] border border-[#3b494b]/50 hover:border-[#00f0ff]/30 text-[#b9cacb] hover:text-[#dfe2ee] font-semibold text-[14px] transition-all"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>storefront</span>
                Find a Rental Shop
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              {[
                { icon: 'verified_user', label: 'Verified Providers' },
                { icon: 'sensors', label: 'Smart Tracking' },
                { icon: 'wifi', label: 'Real-time Updates' },
                { icon: 'my_location', label: 'GPS Precision' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[12px] text-[#849495]">
                  <span className="material-symbols-outlined text-[#00dbe9]" style={{ fontSize: '15px' }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Browse by Use Case
          </span>
          <h2 className="text-[28px] font-semibold text-[#dfe2ee] mt-2 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Drone Categories
          </h2>
          <p className="text-[13px] text-[#849495] mt-1">Find the perfect drone for your mission.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoriesData.map((cat, i) => (
            <Link
              key={i}
              to="/drones"
              className="group flex flex-col items-center gap-3 p-5 bg-[#181c24] border border-[#3b494b]/40 hover:border-[#00f0ff]/40 rounded-2xl transition-all hover:-translate-y-1 hover:bg-[#1c2028] hover:shadow-[0_4px_20px_rgba(0,240,255,0.06)]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1c2028] border border-[#3b494b]/50 group-hover:border-[#00f0ff]/40 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[#849495] group-hover:text-[#00f0ff] transition-colors" style={{ fontSize: '20px' }}>
                  {categoryIcons[cat.iconName] || 'flight'}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#b9cacb] group-hover:text-[#00f0ff] text-center transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/3 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Simple Process
            </span>
            <h2 className="text-[28px] font-semibold text-[#dfe2ee] mt-2 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-[13px] text-[#849495] mt-1">Get in the air in four easy steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stepsData.map((step, i) => (
              <div
                key={i}
                className="relative p-5 bg-[#181c24] border border-[#3b494b]/40 hover:border-[#00f0ff]/30 rounded-2xl transition-all hover:-translate-y-1 group"
              >
                {/* Step number watermark */}
                <div
                  className="absolute top-4 right-4 font-black text-[36px] text-[#3b494b]/40 leading-none select-none"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#1c2028] border border-[#00f0ff]/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#00f0ff]" style={{ fontSize: '20px' }}>
                    {stepIcons[step.iconName] || 'flight'}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-[#dfe2ee] mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-[12px] text-[#849495] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#4ae176]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Our Edge
          </span>
          <h2 className="text-[28px] font-semibold text-[#dfe2ee] mt-2 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Why Choose DroneHub?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyChooseData.map((item, i) => (
            <div
              key={i}
              className="p-5 bg-[#181c24] border border-[#3b494b]/40 hover:border-[#4ae176]/30 rounded-2xl transition-all hover:-translate-y-1 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1c2028] border border-[#4ae176]/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#4ae176]" style={{ fontSize: '20px' }}>
                  {featureIcons[item.iconName] || 'star'}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-[#dfe2ee] mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.title}
              </h3>
              <p className="text-[12px] text-[#849495] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED DRONES ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Top Rated Fleet
            </span>
            <h2 className="text-[28px] font-semibold text-[#dfe2ee] mt-1 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Featured Drones
            </h2>
            <p className="text-[13px] text-[#849495] mt-0.5">Popular rental drones ready for dispatch.</p>
          </div>
          <Link
            to="/drones"
            className="flex items-center gap-1 text-[13px] text-[#b9cacb] hover:text-[#00f0ff] font-semibold transition-colors whitespace-nowrap"
          >
            View All <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredDrones.map((drone) => (
            <DroneCard key={drone.id} drone={drone} />
          ))}
        </div>
      </section>

      {/* ── FEATURED SHOPS ─────────────────────────────────────── */}
      <section id="shops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#aac7ff]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Certified Hosts
            </span>
            <h2 className="text-[28px] font-semibold text-[#dfe2ee] mt-1 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Featured Rental Shops
            </h2>
            <p className="text-[13px] text-[#849495] mt-0.5">Rent from verified local store owners.</p>
          </div>
          <Link
            to="/drones"
            className="flex items-center gap-1 text-[13px] text-[#b9cacb] hover:text-[#aac7ff] font-semibold transition-colors whitespace-nowrap"
          >
            Explore <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#181c24] border-y border-[#3b494b]/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div
                  className="text-[42px] sm:text-[52px] font-bold text-[#00f0ff] text-glow-primary leading-none"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-[#849495] uppercase tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#181c24] border border-[#3b494b]/40 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#00f0ff]/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#3e90ff]/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <div
              className="inline-flex items-center gap-2 bg-[#1c2028] border border-[#00f0ff]/20 text-[#00f0ff] px-4 py-1.5 rounded-full text-[12px] font-semibold"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Ready to Launch?
            </div>

            <h2
              className="text-[32px] sm:text-[44px] font-bold text-[#dfe2ee] tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Take Your Next{' '}
              <span className="text-[#00f0ff] text-glow-primary">Flight</span> Today
            </h2>

            <p className="text-[15px] text-[#849495] leading-relaxed">
              Join thousands of pilots and businesses discovering top drone technology through DroneHub.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/drones"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#00f0ff] text-[#002022] font-bold text-[14px] transition-all hover:bg-[#7df4ff] glow-primary active:scale-95"
              >
                Explore Drones
              </Link>
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#1c2028] border border-[#3b494b]/50 hover:border-[#00f0ff]/30 text-[#b9cacb] hover:text-[#dfe2ee] font-semibold text-[14px] transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
