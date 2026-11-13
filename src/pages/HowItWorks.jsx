import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Store, ShieldCheck, CheckCircle2, ArrowRight, Layers } from 'lucide-react'

// HowItWorks Component: Visual step-by-step workflow guide for Customers, Shop Owners & Admins
function HowItWorks() {
  const [activeTab, setActiveTab] = useState('customers')

  const customerSteps = [
    { num: '01', title: 'Browse Drones', desc: 'Filter catalog by payload specs, flight time, camera resolution, and location.' },
    { num: '02', title: 'Compare Options', desc: 'Evaluate daily pricing, verified shop ratings, included batteries, and accessories.' },
    { num: '03', title: 'Select Rental Dates', desc: 'Choose precise pickup and return slots using instant store availability calendars.' },
    { num: '04', title: 'Submit Booking Request', desc: 'Confirm request details with transparent daily rate calculations.' },
    { num: '05', title: 'Receive Confirmation', desc: 'Get digital approval from the verified shop host along with dispatch code.' },
    { num: '06', title: 'Manage Rental Dashboard', desc: 'Track active rental timers, request extension windows, and download compliance invoices.' }
  ]

  const shopOwnerSteps = [
    { num: '01', title: 'Register Shop', desc: 'Apply with commercial credentials and set up your store profile location.' },
    { num: '02', title: 'Add Drones', desc: 'Upload fleet specs, serial numbers, camera sensor details, and custom daily rates.' },
    { num: '03', title: 'Manage Bookings', desc: 'Accept or decline customer rental requests with automated schedule conflict checks.' },
    { num: '04', title: 'Manage Customers', desc: 'Verify renter identity compliance, check-in equipment, and track check-out logs.' },
    { num: '05', title: 'Monitor Rental Activity', desc: 'Access revenue reports, fleet utilization stats, and scheduled maintenance alerts.' }
  ]

  const adminSteps = [
    { num: '01', title: 'Manage Rental Shops', desc: 'Review, verify, and approve new drone rental store onboarding applications.' },
    { num: '02', title: 'Monitor Users', desc: 'Enforce platform flight safety policies, identity verification, and dispute resolution.' },
    { num: '03', title: 'View Platform Analytics', desc: 'Track nationwide rental volume, active fleet distribution, and commission revenues.' },
    { num: '04', title: 'Manage Operations', desc: 'Maintain platform uptime, update global categories, and supervise compliance logs.' }
  ]

  return (
    <div className="space-y-16 pb-20 pt-8">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Transparent Operational Blueprint
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How DroneHub Works
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Learn how our three-role ecosystem coordinates renters, certified shop owners, and system administrators smoothly.
        </p>
      </section>

      {/* Role Selection Tabs */}
      <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-wrap gap-2 max-w-2xl w-full justify-center">
            
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>For Customers</span>
            </button>

            <button
              onClick={() => setActiveTab('shopOwners')}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'shopOwners'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>For Shop Owners</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>For Admins</span>
            </button>

          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-12">
          
          {/* CUSTOMER WORKFLOW */}
          {activeTab === 'customers' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Customer & Pilot Workflow</h3>
                  <p className="text-sm text-slate-600">6 simple steps to rent top-rated drones for your creative or industrial project.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customerSteps.map((step) => (
                  <div key={step.num} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-blue-600">{step.num}</span>
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHOP OWNER WORKFLOW */}
          {activeTab === 'shopOwners' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Shop Owner & Host Workflow</h3>
                  <p className="text-sm text-slate-600">Monetize your drone fleet with store management tools.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopOwnerSteps.map((step) => (
                  <div key={step.num} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-indigo-600">{step.num}</span>
                      <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN WORKFLOW */}
          {activeTab === 'admin' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Super Admin Workflow</h3>
                  <p className="text-sm text-slate-600">Full operational oversight, shop verification, and system telemetry.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminSteps.map((step) => (
                  <div key={step.num} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-purple-600">{step.num}</span>
                      <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to explore available rental drones?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Browse verified listings or reach out to our support team for specialized enterprise fleet requests.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/drones" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all">
              Browse Marketplace
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 transition-all">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HowItWorks
