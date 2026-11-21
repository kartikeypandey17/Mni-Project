import React from 'react'
import { X, User, Mail, Phone, ShieldCheck, CreditCard, Calendar, Star } from 'lucide-react'

function CustomerDetailsModal({ customer, onClose }) {
  if (!customer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
            <div>
              <h2 className="text-lg font-black text-slate-900">{customer.name}</h2>
              <div className="text-xs text-slate-500 font-mono">ID: {customer.id}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 block font-medium">Email Address</span>
              <span className="font-bold text-slate-900">{customer.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Phone Number</span>
              <span className="font-bold text-slate-900">{customer.phone}</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
              <span className="text-purple-700 block font-medium">Total Rentals</span>
              <span className="text-lg font-black text-purple-900">{customer.totalRentals}</span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
              <span className="text-emerald-700 block font-medium">Total Spent</span>
              <span className="text-lg font-black text-emerald-900">₹{customer.totalSpent?.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200">
              <span className="text-blue-700 block font-medium">Clearance</span>
              <span className="text-xs font-extrabold text-blue-900 uppercase block mt-1">{customer.documentsStatus || 'Verified'}</span>
            </div>
          </div>

          {/* Active Rental */}
          {customer.activeRental && (
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Current Active Rental</div>
              <div className="font-bold text-sm">{customer.activeRental}</div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  )
}

export default CustomerDetailsModal
