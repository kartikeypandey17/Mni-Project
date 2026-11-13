import React from 'react'
import { X, Calendar, Store, MapPin, ShieldCheck, Clock, FileText, CheckCircle2, Navigation, AlertCircle } from 'lucide-react'

function RentalDetailsModal({ rental, onClose, onTrackClick }) {
  if (!rental) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
              Rental Details #{rental.id}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              {rental.droneName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Drone Showcase */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <img
              src={rental.droneImage}
              alt={rental.droneName}
              className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="space-y-1">
              <div className="font-bold text-slate-900 text-base">{rental.droneName}</div>
              <div className="text-slate-500 font-medium">Brand: {rental.brand} • Category: {rental.category}</div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: {rental.status}</span>
              </div>
            </div>
          </div>

          {/* Rental Period & Shop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-blue-600 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Rental Period</span>
              </div>
              <div className="text-slate-700 font-semibold">
                {rental.startDate} to {rental.endDate}
              </div>
              <div className="text-slate-500 text-xs">
                Duration: {rental.durationDays} Days
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-blue-600 uppercase tracking-wider">
                <Store className="w-4 h-4" />
                <span>Rental Shop Host</span>
              </div>
              <div className="text-slate-700 font-semibold">{rental.shopName}</div>
              <div className="text-slate-500 text-xs flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{rental.shopLocation}</span>
              </div>
            </div>

          </div>

          {/* Payment & Deposit Breakdown */}
          <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">
              Payment & Security Deposit
            </h4>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Daily Rate</span>
                <span className="font-bold text-slate-900">₹{rental.dailyRate?.toLocaleString('en-IN')}/day</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Rental Subtotal</span>
                <span className="font-bold text-slate-900">₹{rental.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
                <span className="text-amber-700 block font-medium">Security Deposit</span>
                <span className="font-bold">₹{rental.securityDeposit?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-blue-800">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Rental Operating Guidelines</span>
            </div>
            <p className="leading-relaxed text-blue-900/90">
              Maintain visual line-of-sight during flight. Charge batteries fully before takeoff using the provided hub. Return gear by 6:00 PM on your end date to avoid late penalty charges.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          {rental.trackingAvailable && onTrackClick ? (
            <button
              onClick={() => { onClose(); onTrackClick(rental); }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Track Drone Live</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default RentalDetailsModal
