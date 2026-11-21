import React, { useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { TrendingUp, IndianRupee, Layers } from 'lucide-react'

/**
 * RevenueChart Component
 * Visualizes revenue trends over time using Recharts AreaChart.
 */
function RevenueChart({ data = [], title = "Revenue Performance", subtitle = "Monthly revenue trajectory (in ₹ INR)" }) {
  const [chartType, setChartType] = useState('gross') // 'gross' | 'comparative'

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartType('gross')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              chartType === 'gross'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Gross Revenue
          </button>
          <button
            type="button"
            onClick={() => setChartType('comparative')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              chartType === 'comparative'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            vs Prior Period
          </button>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="priorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '14px', fontSize: '12px', border: 'none', padding: '10px 14px' }}
              formatter={(val, name) => [`₹${val.toLocaleString()}`, name === 'revenue' ? 'Current Period' : 'Prior Period']}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
            
            <Area
              type="monotone"
              dataKey="revenue"
              name="Current Revenue (₹)"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#revenueGrad)"
            />

            {chartType === 'comparative' && (
              <Area
                type="monotone"
                dataKey="previousRevenue"
                name="Prior Period (₹)"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#priorGrad)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart
