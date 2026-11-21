import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, Target, Eye, Users, Store, Shield, CheckCircle2, ArrowRight } from 'lucide-react'
import { roleBenefitsData } from '../data/mockData'

// About Component: Public page highlighting DroneHub mission, vision, and role benefits
function About() {
  return (
    <div className="space-y-20 pb-20 pt-8">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Empowering Aerial Innovation
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About DroneHub
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          DroneHub is designed to connect drone rental businesses with customers looking for specialized drones for photography, videography, agriculture, surveying, industrial inspection, and beyond.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Our Core Mission</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              "Making drone technology more accessible through a simple and connected rental experience."
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              We break down financial barriers by enabling pilots and companies to rent high-performance UAV equipment on demand rather than absorbing high upfront capital expenditures.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 relative overflow-hidden border border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Eye className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Our Future Vision</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              "To build a trusted and scalable digital ecosystem for drone rental and management."
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We envision a future where multi-tenant drone rental shops, fleet monitoring telemetry, and automated compliance come together in one smart unified hub.
            </p>
          </div>

        </div>
      </section>

      {/* Platform Benefits Section for 3 Roles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Every Stakeholder
          </h2>
          <p className="text-slate-600">
            DroneHub bridges the gap between individual renters, certified host shop owners, and platform administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Benefit 1: Customers */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{roleBenefitsData.customers.title}</h3>
              <p className="text-sm text-slate-500">{roleBenefitsData.customers.subtitle}</p>

              <ul className="space-y-3 pt-2">
                {roleBenefitsData.customers.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/drones" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 pt-4">
              <span>Start Renting Drones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Benefit 2: Shop Owners */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{roleBenefitsData.shopOwners.title}</h3>
              <p className="text-sm text-slate-500">{roleBenefitsData.shopOwners.subtitle}</p>

              <ul className="space-y-3 pt-2">
                {roleBenefitsData.shopOwners.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-4">
              <span>Register Your Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Benefit 3: Administrators */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{roleBenefitsData.administrators.title}</h3>
              <p className="text-sm text-slate-500">{roleBenefitsData.administrators.subtitle}</p>

              <ul className="space-y-3 pt-2">
                {roleBenefitsData.administrators.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/how-it-works" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 pt-4">
              <span>Explore Platform Tech</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 p-8 sm:p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Want to join the DroneHub network?</h3>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            Whether you are looking to rent equipment or expand your rental store presence, DroneHub is here to assist.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
