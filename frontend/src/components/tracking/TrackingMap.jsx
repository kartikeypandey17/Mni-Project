import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, Minus, RotateCcw, Crosshair, Navigation, Building2, 
  MapPin, ShieldAlert, Radio, Maximize2, Compass, Layers 
} from 'lucide-react'

/**
 * TrackingMap Component
 * Visually striking CSS/SVG map container simulating real-time GPS telemetry.
 * Displays:
 *   - Grid & road-like terrain layout
 *   - Shop Marker (🏪 + Tooltip)
 *   - Pulsing Drone Marker (🚁 + LIVE indicator with Framer Motion)
 *   - Destination Marker (📍 + Tooltip)
 *   - SVG Flight Route path
 *   - Interactive controls (Zoom +, Zoom -, Reset View, Locate Drone)
 */
function TrackingMap({
  selectedDrone,
  allDrones = [],
  onSelectDrone,
  onEmergencyClick
}) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isCentering, setIsCentering] = useState(false)
  const [mapTheme, setMapTheme] = useState('dark') // 'dark' | 'satellite'

  const activeDrone = selectedDrone || allDrones[0]

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))
  const handleResetView = () => {
    setZoomLevel(1)
    setIsCentering(true)
    setTimeout(() => setIsCentering(false), 500)
  }

  // Calculate coordinates or use default map layout
  const shopX = activeDrone?.mapCoords?.shopX ?? 20
  const shopY = activeDrone?.mapCoords?.shopY ?? 30
  const droneX = activeDrone?.mapCoords?.droneX ?? 52
  const droneY = activeDrone?.mapCoords?.droneY ?? 48
  const destX = activeDrone?.mapCoords?.destX ?? 82
  const destY = activeDrone?.mapCoords?.destY ?? 72

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 text-white select-none">
      
      {/* MAP BACKGROUND TERRAIN GRID */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Synthetic Tactical Grid lines */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px, 60px 60px, 60px 60px'
          }}
        />

        {/* Simulated Road & Sector Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
          <path d="M 0,120 Q 200,80 400,200 T 800,250" fill="none" stroke="#60A5FA" strokeWidth="6" strokeDasharray="8,8" />
          <path d="M 100,0 L 500,500" fill="none" stroke="#94A3B8" strokeWidth="4" />
          <path d="M 0,350 Q 300,320 600,420 T 1000,380" fill="none" stroke="#38BDF8" strokeWidth="5" />
          <circle cx="20%" cy="30%" r="80" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="82%" cy="72%" r="60" fill="none" stroke="#E11D48" strokeWidth="1" strokeDasharray="4,4" />
        </svg>

        {/* SVG FLIGHT ROUTE LINE */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Completed Trajectory Path (Shop -> Drone) */}
          <line
            x1={`${shopX}%`}
            y1={`${shopY}%`}
            x2={`${droneX}%`}
            y2={`${droneY}%`}
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeDasharray="6,4"
            className="animate-pulse"
          />

          {/* Projected Trajectory Path (Drone -> Destination) */}
          <line
            x1={`${droneX}%`}
            y1={`${droneY}%`}
            x2={`${destX}%`}
            y2={`${destY}%`}
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="4,4"
            opacity="0.6"
          />
        </svg>

        {/* 🏪 SHOP MARKER */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: `${shopX}%`, top: `${shopY}%` }}
        >
          <div className="relative flex flex-col items-center">
            {/* Tooltip on hover */}
            <div className="opacity-90 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-blue-500/40 whitespace-nowrap mb-1 shadow-lg">
              🏪 {activeDrone?.shopName || "SkyRent Hub"}
            </div>
            
            <div className="w-9 h-9 rounded-2xl bg-blue-600/90 text-white flex items-center justify-center shadow-lg border border-blue-400/50 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>

            <span className="text-[9px] font-mono text-blue-300 font-bold mt-1 bg-slate-950/80 px-1.5 py-0.5 rounded-sm">
              SHOP HUB
            </span>
          </div>
        </div>

        {/* 📍 DESTINATION MARKER */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: `${destX}%`, top: `${destY}%` }}
        >
          <div className="relative flex flex-col items-center">
            <div className="opacity-90 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-rose-500/40 whitespace-nowrap mb-1 shadow-lg">
              📍 {activeDrone?.destination || "Rental Destination"}
            </div>

            <div className="w-9 h-9 rounded-2xl bg-rose-600/90 text-white flex items-center justify-center shadow-lg border border-rose-400/50 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>

            <span className="text-[9px] font-mono text-rose-300 font-bold mt-1 bg-slate-950/80 px-1.5 py-0.5 rounded-sm">
              DESTINATION
            </span>
          </div>
        </div>

        {/* 🚁 DRONE MARKER (PULSING ANIMATION WITH FRAMER MOTION) */}
        {activeDrone && (
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${droneX}%`, top: `${droneY}%` }}
          >
            <div className="relative flex flex-col items-center">
              
              {/* Drone Info Tooltip HUD */}
              <div className="bg-slate-900/95 text-white p-2 rounded-xl border border-emerald-500/50 shadow-2xl mb-1 text-center min-w-[120px]">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-black tracking-wider text-emerald-400 uppercase">
                    {activeDrone.status === 'in-flight' ? 'LIVE TRACKING' : activeDrone.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-black truncate text-white">{activeDrone.droneName}</div>
                <div className="text-[10px] text-slate-300 font-mono">
                  Alt: {activeDrone.altitude}m • Speed: {activeDrone.speed}km/h
                </div>
              </div>

              {/* PULSING CIRCULAR MARKER (FRAMER MOTION) */}
              <div className="relative flex items-center justify-center">
                {/* Outer Ring Pulse 1 */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Outer Ring Pulse 2 */}
                <motion.div
                  className="absolute w-12 h-12 rounded-full bg-cyan-500/30 border border-cyan-400/60"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Center Drone Icon Badge */}
                <motion.div
                  className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg border-2 border-white shadow-emerald-500/50 z-10"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Navigation className="w-6 h-6 transform rotate-45" />
                </motion.div>
              </div>

            </div>
          </div>
        )}

        {/* RENDERING OTHER DRONES ON MAP (IF MULTI-DRONE VIEW) */}
        {allDrones.filter(d => d.id !== activeDrone?.id).map((otherDrone) => {
          const oX = otherDrone.mapCoords?.droneX ?? 40
          const oY = otherDrone.mapCoords?.droneY ?? 40

          return (
            <div
              key={otherDrone.id}
              onClick={() => onSelectDrone && onSelectDrone(otherDrone)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${oX}%`, top: `${oY}%` }}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-cyan-400 hover:bg-cyan-600 hover:text-white flex items-center justify-center shadow-md border border-cyan-500/40 transition-colors">
                <Navigation className="w-4 h-4 transform rotate-45" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap border border-slate-700 shadow-md">
                {otherDrone.droneName}
              </div>
            </div>
          )
        })}

      </div>

      {/* TOP MAP HUD OVERLAY */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
        
        {/* Live Tracking Status Pill */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-lg flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-black text-white tracking-wider uppercase">
            🟢 LIVE TRACKING
          </span>
          <span className="text-slate-500 text-[10px]">|</span>
          <span className="text-[10px] text-slate-300 font-mono">
            {activeDrone?.droneName || "No Drone Selected"}
          </span>
        </div>

        {/* Emergency Alert Action Button */}
        {onEmergencyClick && (
          <button
            onClick={onEmergencyClick}
            className="pointer-events-auto bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-rose-400/50 shadow-lg hover:shadow-rose-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>EMERGENCY ALERT</span>
          </button>
        )}

      </div>

      {/* BOTTOM MAP CONTROLS & COMPASS HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none z-30">
        
        {/* Location & Sector Coordinates HUD */}
        <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs space-y-1 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400 font-bold">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>LAT: {activeDrone?.latitude || 12.9716}° N</span>
            <span>LNG: {activeDrone?.longitude || 77.5946}° E</span>
          </div>
          <div className="text-[10px] text-slate-300 font-semibold">
            Route: <span className="text-white">{activeDrone?.startLocation || "Shop"}</span> → <span className="text-rose-400">{activeDrone?.destination || "Destination"}</span>
          </div>
        </div>

        {/* Map Control Buttons */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            title="Reset View"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className={`w-4 h-4 ${isCentering ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleResetView}
            title="Locate Drone"
            className="p-2 rounded-xl text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  )
}

export default TrackingMap
