import React from 'react'
import { FileText, MapPin, Navigation, User, Building2, Calendar, Clock, ShieldCheck } from 'lucide-react'

/**
 * FlightDetails Component
 * Displays flight information and booking specs.
 */
function FlightDetails({ drone }) {
  if (!drone) return null

  const details = [
    { label: "Booking ID", value: drone.bookingId, isMono: true },
    { label: "Customer", value: drone.customerName || "N/A" },
    { label: "Drone Model", value: drone.droneName },
    { label: "Fulfilling Shop", value: drone.shopName },
    { label: "Flight Started", value: "02:15 PM" },
    { label: "Duration Elapsed", value: `${drone.flightTime} min` },
    { label: "Live Heading", value: `${drone.heading !== undefined ? drone.heading : 90}°` },
    { label: "Telemetry Feed", value: drone.isSimulated ? "Simulated Mode" : "Hardware Active" },
    { label: "Target Destination", value: drone.destination }
  ]

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Flight Mission Details</span>
        </h4>
        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
          {drone.bookingId}
        </span>
      </div>

      {/* Flight Route Cards Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        
        {/* Departure Hub */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Origin Hub</span>
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{drone.startLocation}</span>
          </div>
        </div>

        {/* Destination */}
        <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-1">
          <span className="text-[10px] font-bold uppercase text-rose-500 block">Destination</span>
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>{drone.destination}</span>
          </div>
        </div>

      </div>

      {/* Metadata Specification Table */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 divide-y divide-slate-200/60 text-xs">
        {details.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-2.5 px-4">
            <span className="text-slate-500 font-medium">{item.label}</span>
            <span className={`font-bold text-slate-800 ${item.isMono ? 'font-mono text-blue-600' : ''}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default FlightDetails
