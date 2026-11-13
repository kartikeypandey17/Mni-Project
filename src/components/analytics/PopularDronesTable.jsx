import React from 'react'
import { Navigation, Star, Award, TrendingUp } from 'lucide-react'

/**
 * PopularDronesTable Component
 * Ranked performance table for top rented drones.
 */
function PopularDronesTable({ data = [], title = "Top Performing Drone Models", subtitle = "Ranked by gross rental revenue and flight utilization" }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-purple-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>
        <span className="text-xs font-bold text-slate-400 font-mono">
          {data.length} Models Tracked
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Drone Model</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-center">Total Rentals</th>
              <th className="py-3 px-4 text-center">Flight Hours</th>
              <th className="py-3 px-4">Gross Revenue</th>
              <th className="py-3 px-4 text-center">Utilization</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {data.map((item, idx) => {
              const rankColor =
                idx === 0 ? 'text-amber-500 font-black text-sm' :
                idx === 1 ? 'text-slate-400 font-black text-sm' :
                idx === 2 ? 'text-amber-700 font-black text-sm' : 'text-slate-600 font-bold'
              
              const badgeIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`

              return (
                <tr key={item.droneId || idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 ${rankColor}`}>
                      {badgeIcon}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.droneName || item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {item.totalRentals || item.rentals}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-600">
                    {item.rentalHours || item.hours || "—"} hrs
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900">
                    ₹{item.revenue ? item.revenue.toLocaleString() : "0"}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${item.utilization}%` }}
                        />
                      </div>
                      <span className="font-mono font-extrabold text-slate-800 text-[11px]">
                        {item.utilization}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      item.status === 'Rented'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PopularDronesTable
