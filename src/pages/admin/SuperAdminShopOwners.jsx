import React, { useState, useMemo } from 'react'
import { UserCheck, Search, ShieldCheck, CheckCircle2, AlertTriangle, Eye } from 'lucide-react'
import { initialAdminShopOwners } from '../../data/adminData'

function SuperAdminShopOwners() {
  const [ownersList, setOwnersList] = useState(initialAdminShopOwners)
  const [searchTerm, setSearchTerm] = useState('')
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const filteredOwners = useMemo(() => {
    return ownersList.filter((o) => {
      if (!searchTerm.trim()) return true
      const query = searchTerm.toLowerCase()
      return (
        o.name.toLowerCase().includes(query) ||
        o.shopName.toLowerCase().includes(query) ||
        o.email.toLowerCase().includes(query)
      )
    })
  }, [ownersList, searchTerm])

  const handleUpdateStatus = (id, newStatus) => {
    setOwnersList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
    showToast(`Owner ID #${id} status updated to '${newStatus}'.`)
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Shop Owner Partner Directory ({filteredOwners.length})
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Platform-wide partner account management and owner credentials audit log.
        </p>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Owner Name, Shop, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-800 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* OWNERS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-4">Shop Owner</th>
                <th className="py-4 px-4">Assigned Storefront</th>
                <th className="py-4 px-4">Contact Phone</th>
                <th className="py-4 px-4">Joined Date</th>
                <th className="py-4 px-4">Total Revenue</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="font-bold text-slate-900 text-sm">{owner.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{owner.email}</div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-purple-700">{owner.shopName}</td>
                  <td className="py-3.5 px-4 text-slate-600">{owner.phone}</td>
                  <td className="py-3.5 px-4 text-slate-500">{owner.joinedDate}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">₹{(owner.totalRevenue/1000).toFixed(0)}k</td>
                  
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      owner.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}>
                      {owner.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-1">
                    {owner.status === 'Active' ? (
                      <button
                        onClick={() => handleUpdateStatus(owner.id, 'Suspended')}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(owner.id, 'Active')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                      >
                        Reactivate
                      </button>
                    )}
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

export default SuperAdminShopOwners
