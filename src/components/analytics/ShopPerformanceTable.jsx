import React from 'react'
import { Store, Award, TrendingUp, Users, Building2 } from 'lucide-react'

/**
 * ShopPerformanceTable Component
 * Super Admin ranking table for partner shops performance.
 */
function ShopPerformanceTable({ data = [], title = "Top Performing Partner Shops", subtitle = "Ranked by gross rental billing and active user volume" }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 font-mono">
          {data.length} Partner Stores
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Rank</th>
              <th className="py-3.5 px-4">Shop Storefront</th>
              <th className="py-3.5 px-4 text-center">Fleet Drones</th>
              <th className="py-3.5 px-4 text-center">Customers</th>
              <th className="py-3.5 px-4 text-center">Total Bookings</th>
              <th className="py-3.5 px-4">Gross Revenue</th>
              <th className="py-3.5 px-4 text-center">Growth</th>
              <th className="py-3.5 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {data.map((shop, idx) => {
              const medalBadge =
                idx === 0 ? '🥇 #1' :
                idx === 1 ? '🥈 #2' :
                idx === 2 ? '🥉 #3' : `#${idx + 1}`

              return (
                <tr key={shop.shopId || idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs ${
                      idx === 0 ? 'bg-amber-100 text-amber-800 font-black' :
                      idx === 1 ? 'bg-slate-200 text-slate-800 font-black' :
                      idx === 2 ? 'bg-amber-200 text-amber-900 font-black' : 'text-slate-500 font-bold'
                    }`}>
                      {medalBadge}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{shop.shopName || shop.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {shop.totalDrones || shop.drones}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                    {shop.customers}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {shop.bookings}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900">
                    ₹{shop.revenue ? shop.revenue.toLocaleString() : "0"}
                  </td>
                  <td className="py-3.5 px-4 text-center font-extrabold text-emerald-600">
                    {shop.growth}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
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

export default ShopPerformanceTable
