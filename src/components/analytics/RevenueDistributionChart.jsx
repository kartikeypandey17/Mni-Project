import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { PieChart as PieIcon, Layers } from 'lucide-react'

/**
 * RevenueDistributionChart Component
 * Visualizes revenue distribution by category or shop using Recharts PieChart.
 */
function RevenueDistributionChart({
  data = [],
  title = "Revenue by Drone Category",
  subtitle = "Gross revenue split across drone specifications",
  dataKey = "revenue",
  nameKey = "category"
}) {
  const defaultColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4']

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-blue-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Recharts Pie Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={4}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || defaultColors[index % defaultColors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '14px', fontSize: '12px', border: 'none', padding: '10px 14px' }}
              formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
            />
            <Legend verticalAlign="bottom" height={40} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueDistributionChart
