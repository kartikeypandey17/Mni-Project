import React, { useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Activity, Battery, Gauge } from 'lucide-react'

/**
 * FlightHistoryChart Component
 * Visualizes historical battery decay and flight speed using Recharts Area Charts.
 */
function FlightHistoryChart({ drone }) {
  const [activeTab, setActiveTab] = useState('battery') // 'battery' | 'speed'

  const batteryData = drone?.batteryHistory || [
    { time: "14:00", battery: 100 },
    { time: "14:05", battery: 95 },
    { time: "14:10", battery: 90 },
    { time: "14:15", battery: 85 },
    { time: "14:20", battery: 81 },
    { time: "14:25", battery: drone?.battery || 78 }
  ]

  const speedData = drone?.speedHistory || [
    { time: "14:00", speed: 0 },
    { time: "14:05", speed: 22 },
    { time: "14:10", speed: 34 },
    { time: "14:15", speed: 30 },
    { time: "14:20", speed: 36 },
    { time: "14:25", speed: drone?.speed || 32 }
  ]

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
      
      {/* Header with Switcher Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-600" />
            <span>Flight Telemetry Analytics</span>
          </h4>
          <p className="text-[11px] text-slate-400">Historical performance metrics</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('battery')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'battery'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Battery className="w-3.5 h-3.5" />
            <span>Battery</span>
          </button>

          <button
            onClick={() => setActiveTab('speed')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'speed'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Speed</span>
          </button>
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'battery' ? (
            <AreaChart data={batteryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="batteryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }}
                formatter={(val) => [`${val}%`, 'Battery']}
              />
              <Area type="monotone" dataKey="battery" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#batteryGrad)" />
            </AreaChart>
          ) : (
            <AreaChart data={speedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', fontSize: '11px', border: 'none' }}
                formatter={(val) => [`${val} km/h`, 'Speed']}
              />
              <Area type="monotone" dataKey="speed" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#speedGrad)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default FlightHistoryChart
