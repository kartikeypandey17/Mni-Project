import React, { useState } from 'react'
import { X, Store, User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Power } from 'lucide-react'

function ShopDetailsModal({ shop, onClose, onUpdateStatus }) {
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [suspendReason, setSuspendReason] = useState('')
  const [showSuspendBox, setShowSuspendBox] = useState(false)

  if (!shop) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <img src={shop.logo} alt={shop.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">{shop.name}</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  ID #{shop.shopId}
                </span>
              </div>
              <div className="text-xs text-slate-500">{shop.location}</div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Owner & Contact */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Shop Host Owner Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700 pt-1">
              <div>
                <span className="text-slate-400 block font-medium text-[11px]">Owner Name</span>
                <span className="font-bold text-slate-900">{shop.ownerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium text-[11px]">Email</span>
                <span className="font-medium">{shop.ownerEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium text-[11px]">Phone</span>
                <span className="font-medium">{shop.phone}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
              <span className="text-purple-700 block font-medium text-[11px]">Fleet Drones</span>
              <span className="text-lg font-black text-purple-900">{shop.dronesCount || 24}</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200">
              <span className="text-blue-700 block font-medium text-[11px]">Active Rentals</span>
              <span className="text-lg font-black text-blue-900">{shop.activeRentalsCount || 5}</span>
            </div>
            <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-200">
              <span className="text-indigo-700 block font-medium text-[11px]">Customers</span>
              <span className="text-lg font-black text-indigo-900">{shop.customersCount || 142}</span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
              <span className="text-emerald-700 block font-medium text-[11px]">Total Revenue</span>
              <span className="text-lg font-black text-emerald-900">₹{((shop.revenue || 1845000)/1000).toFixed(0)}k</span>
            </div>
          </div>

          {/* Reject / Suspend Reason Box */}
          {showRejectBox && (
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
              <label className="block text-xs font-bold text-rose-900">Provide Rejection Reason:</label>
              <input
                type="text"
                placeholder="Reason for rejecting shop application..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full bg-white border border-rose-300 rounded-xl p-2.5 text-xs text-slate-800"
              />
              <button
                onClick={() => { onUpdateStatus(shop.shopId, 'Rejected', 'Rejected', rejectReason); onClose(); }}
                className="bg-rose-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Confirm Rejection
              </button>
            </div>
          )}

          {showSuspendBox && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-900">Provide Suspension Reason:</label>
              <input
                type="text"
                placeholder="Reason for shop suspension..."
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800"
              />
              <button
                onClick={() => { onUpdateStatus(shop.shopId, 'Suspended', shop.verification, suspendReason); onClose(); }}
                className="bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Confirm Suspension
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {shop.verification === 'Pending' && (
              <>
                <button
                  onClick={() => { onUpdateStatus(shop.shopId, 'Active', 'Verified'); onClose(); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Approve Shop
                </button>
                <button
                  onClick={() => setShowRejectBox(true)}
                  className="bg-rose-100 text-rose-700 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Reject Shop
                </button>
              </>
            )}

            {shop.status === 'Active' && shop.verification === 'Verified' && (
              <button
                onClick={() => setShowSuspendBox(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Suspend Shop
              </button>
            )}

            {shop.status === 'Suspended' && (
              <button
                onClick={() => { onUpdateStatus(shop.shopId, 'Active', 'Verified'); onClose(); }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Reactivate Shop
              </button>
            )}
          </div>

          <button onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer ml-auto">
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default ShopDetailsModal
