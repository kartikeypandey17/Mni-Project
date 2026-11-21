import React, { useState, useMemo, useEffect } from 'react'
import { Navigation, Search, Filter, CheckCircle2, AlertTriangle, Eye, ShieldCheck } from 'lucide-react'
import { initialOwnerDrones } from '../../data/ownerData'
import droneService from '../../services/droneService'

function SuperAdminDrones() {
  const [dronesList, setDronesList] = useState(initialOwnerDrones)
  const [searchTerm, setSearchTerm] = useState('')
  const [shopFilter, setShopFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [toastMessage, setToastMessage] = useState(null)

  // Fetch all drones platform-wide from backend API
  useEffect(() => {
    let isMounted = true
    droneService
      .getDrones({ limit: 100 })
      .then((data) => {
        if (isMounted && data?.drones && data.drones.length > 0) {
          const formatted = data.drones.map((d) => ({
            ...d,
            id: d._id || d.id,
            pricePerDay: d.pricePerDay || (d.pricePerHour ? d.pricePerHour * 8 : 2500),
            status:
              d.availability ||
              (d.status
                ? d.status.charAt(0).toUpperCase() + d.status.slice(1)
                : 'Available')
          }))
          setDronesList(formatted)
        }
      })
      .catch((err) => {
        console.warn('Live API fetch unavailable for admin drones:', err.message)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const filteredDrones = useMemo(() => {
    return dronesList
      .filter((d) => {
        if (!searchTerm.trim()) return true
        const query = searchTerm.toLowerCase()
        return (
          d.name.toLowerCase().includes(query) ||
          d.model?.toLowerCase().includes(query) ||
          d.shopName?.toLowerCase().includes(query)
        )
      })
      .filter((d) => {
        if (shopFilter === 'All') return true
        return d.shopName === shopFilter
      })
      .filter((d) => {
        if (statusFilter === 'All') return true
        return d.status.toLowerCase() === statusFilter.toLowerCase()
      })
  }, [dronesList, searchTerm, shopFilter, statusFilter])

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Available': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'Rented': case 'Currently Rented': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Maintenance': return 'bg-amber-100 text-amber-800 border-amber-300'
      default: return 'bg-rose-100 text-rose-800 border-rose-300'
    }
  }

  const handleToggleAvailability = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Available' ? 'Unavailable' : 'Available'
    setDronesList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: nextStatus } : d))
    )

    try {
      await droneService.updateDrone(id, {
        status: nextStatus === 'Available' ? 'available' : 'maintenance',
        availability: nextStatus
      })
    } catch {
      // Keep local state update
    }

    showToast(`Drone status toggled to '${nextStatus}'.`)
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Global Drone Fleet Audit ({filteredDrones.length})
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Platform-wide inventory inspection across all registered partner storefronts.
        </p>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Search by Drone Name, Model, Shop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-800 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={shopFilter}
            onChange={(e) => setShopFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl py-2 px-3 text-xs font-semibold text-slate-700 cursor-pointer max-w-[160px] truncate"
          >
            <option value="All">All Shops</option>
            <option value="SkyRent Bengaluru">SkyRent Bengaluru</option>
            <option value="AeroTech Mumbai">AeroTech Mumbai</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl py-2 px-3 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* DRONES TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-4">Drone</th>
                <th className="py-4 px-4">Assigned Shop</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price / Day</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Total Rentals</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredDrones.map((drone) => (
                <tr key={drone.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-3">
                    <img
                      src={drone.image}
                      alt={drone.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{drone.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{drone.brand}</div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-purple-700">{drone.shopName}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{drone.category}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">₹{(drone.pricePerDay || drone.dailyRate)?.toLocaleString('en-IN')}/d</td>
                  
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(drone.status)}`}>
                      {drone.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-800">{drone.totalRentalsCount || 14} rentals</td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleToggleAvailability(drone.id, drone.status)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      {drone.status === 'Available' ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default SuperAdminDrones
