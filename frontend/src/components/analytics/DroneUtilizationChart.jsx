import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { Navigation, Gauge } from 'lucide-react'

/**
 * DroneUtilizationChart Component
 * Visualizes drone fleet usage (rental hours & utilization %) using Recharts BarChart.
 */
function DroneUtilizationChart({ data = [], title = "Fleet Drone Utilization", subtitle = "Flight hours & utilization rates across drone models" }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-purple-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis type="number" stroke="#94A3B8" fontSize={11} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={11} width={100} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '14px', fontSize: '12px', border: 'none', padding: '10px 14px' }}
              formatter={(val, name) => [name === 'utilization' ? `${val}%` : `${val} Hrs`, name === 'utilization' ? 'Utilization Rate' : 'Rental Hours']}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
            <Bar dataKey="utilization" name="Utilization Rate (%)" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DroneUtilizationChart
