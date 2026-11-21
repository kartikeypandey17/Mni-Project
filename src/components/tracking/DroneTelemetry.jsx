import React from 'react'
import { Zap, Gauge, ArrowUp, Wifi, MapPin, Clock, Timer, ShieldCheck } from 'lucide-react'
import BatteryIndicator from './BatteryIndicator'
import SignalIndicator from './SignalIndicator'

/**
 * DroneTelemetry Component
 * Telemetry Panel showing live drone operational metrics:
 * Battery, Speed, Altitude, Signal, Distance, Flight Time, ETA
 */
function DroneTelemetry({ drone }) {
  if (!drone) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs font-bold">
        Select a drone to inspect telemetry
      </div>
    )
  }

  const metrics = [
    {
      label: "Air Speed",
      value: `${drone.speed} km/h`,
      sub: "Ground Speed",
      icon: Gauge,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      label: "Flight Altitude",
      value: `${drone.altitude} m`,
      sub: "Above Ground Level",
      icon: ArrowUp,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      label: "Distance Remaining",
      value: `${drone.distance} km`,
      sub: "To Destination",
      icon: MapPin,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      label: "Flight Time Elapsed",
      value: `${drone.flightTime} min`,
      sub: "Mission Duration",
      icon: Clock,
      color: "text-teal-600 bg-teal-50 border-teal-100"
    },
    {
      label: "Estimated Arrival (ETA)",
      value: drone.eta || "18 min",
      sub: "Destination ETA",
      icon: Timer,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    }
  ]

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
      
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Telemetry Dashboard — {drone.droneName}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Booking: <strong className="font-mono text-slate-700">{drone.bookingId}</strong>
            {drone.heading !== undefined && (
              <span className="ml-2 text-slate-500 font-mono">
                • Heading: {drone.heading}°
              </span>
            )}
          </p>
        </div>

        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${
          drone.telemetrySource === 'real'
            ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
            : 'text-amber-700 bg-amber-50 border-amber-300'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
            drone.telemetrySource === 'real' ? 'bg-emerald-500' : 'bg-amber-500'
          }`} />
          {drone.telemetrySource === 'real' ? 'Live Hardware Telemetry' : 'Simulated Telemetry Mode'}
        </span>
      </div>

      {/* Gauges Grid: Battery & Signal Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Battery Telemetry Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Battery Telemetry
          </div>
          <BatteryIndicator battery={drone.battery ?? drone.batteryLevel ?? 100} showDetails={true} />
        </div>

        {/* Signal Telemetry Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Signal Transmission
          </div>
          <SignalIndicator signal={drone.signal} showLabel={true} />
        </div>

      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((m, idx) => {
          const Icon = m.icon
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border ${m.color} space-y-1 transition-all hover:scale-102`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {m.label}
                </span>
                <Icon className="w-3.5 h-3.5 opacity-80" />
              </div>
              <div className="text-lg font-black tracking-tight font-mono">
                {m.value}
              </div>
              <div className="text-[9px] text-slate-400 font-medium">
                {m.sub}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default DroneTelemetry
