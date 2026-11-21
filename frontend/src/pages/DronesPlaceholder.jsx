import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, Sparkles, ArrowRight, Grid, Filter, Search } from 'lucide-react'
import DroneCard from '../components/DroneCard'
import { featuredDrones } from '../data/mockData'

// DronesPlaceholder Component: Preview of full drone marketplace launching in Phase 3
function DronesPlaceholder() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl space-y-4 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Marketplace Preview — Full Module Coming in Phase 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Explore Drone Marketplace
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Filter and discover certified aerial drones for photography, surveying, inspection, and commercial flight operations.
        </p>
      </div>

      {/* Mock Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            placeholder="Filter by brand, model, or camera..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
            <Filter className="w-4 h-4" />
            <span>Category: All Drones</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
            <Grid className="w-4 h-4" />
            <span>Showing 6 Featured Models</span>
          </div>
        </div>
      </div>

      {/* Grid of Preview Drones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredDrones.map((drone) => (
          <DroneCard key={drone.id} drone={drone} />
        ))}
      </div>

      {/* Phase 3 Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-lg font-bold text-slate-900">Advanced Filtering & Booking System</h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          The full marketplace module with real-time date selection, rental price calculator, host verification, and booking management will be added in Phase 3.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700">
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  )
}

export default DronesPlaceholder
