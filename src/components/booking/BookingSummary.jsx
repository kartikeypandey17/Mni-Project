import React from 'react'
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Store, Calendar, Clock, FileText, User, Tag, Sparkles } from 'lucide-react'
import { availableAddons } from './RentalOptions'

// Step 5: Review & Price Summary Component
function BookingSummary({ 
  drone, 
  startDate, 
  endDate, 
  rentalDays, 
  selectedAddons, 
  customerInfo, 
  documents, 
  onSubmitBooking, 
  onBack 
}) {
  
  // Base Rental = Daily Price * Days
  const baseRentalCost = (drone?.pricePerDay || 0) * rentalDays

  // Add-ons Total
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addonObj = availableAddons.find((a) => a.id === addonId)
    if (!addonObj) return sum
    const itemCost = addonObj.priceType === 'perDay' ? addonObj.price * rentalDays : addonObj.price
    return sum + itemCost
  }, 0)

  // Rental Subtotal = Base Rental + Add-ons
  const rentalSubtotal = baseRentalCost + addonsTotal

  // Multi-day Discount (10% discount if renting 5+ days)
  const discountAmount = rentalDays >= 5 ? Math.round(baseRentalCost * 0.1) : 0

  // Security Deposit (Refundable)
  const securityDeposit = drone?.securityDeposit || 0

  // Final Total Display = (Rental Subtotal - Discount) + Security Deposit
  const finalTotalAmount = (rentalSubtotal - discountAmount) + securityDeposit

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-8">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Step 5: Review & Price Summary
        </h2>
        <p className="text-slate-500 text-sm">
          Please verify your drone reservation selections and pricing details before submitting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SUMMARY CARDS (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Drone Overview Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4">
            <img
              src={drone?.image}
              alt={drone?.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-100/80 px-2 py-0.5 rounded-md">
                {drone?.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {drone?.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Store className="w-3.5 h-3.5 text-blue-600" />
                  {drone?.shopName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {drone?.location}
                </span>
              </div>
            </div>
          </div>

          {/* Rental Period Card */}
          <div className="p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Rental Schedule & Duration</span>
            </h4>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Start Date</span>
                <span className="font-bold text-slate-900 text-sm">{startDate}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">End Date</span>
                <span className="font-bold text-slate-900 text-sm">{endDate}</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <span className="text-blue-600 block font-medium">Total Duration</span>
                <span className="font-black text-blue-900 text-sm">{rentalDays} Days</span>
              </div>
            </div>
          </div>

          {/* Selected Add-ons List */}
          <div className="p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>Selected Rental Add-ons</span>
            </h4>

            {selectedAddons.length > 0 ? (
              <div className="space-y-2 text-xs">
                {selectedAddons.map((addonId) => {
                  const addonObj = availableAddons.find((a) => a.id === addonId)
                  if (!addonObj) return null
                  const itemCost = addonObj.priceType === 'perDay' ? addonObj.price * rentalDays : addonObj.price

                  return (
                    <div key={addonId} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-medium text-slate-800">{addonObj.name}</span>
                      <span className="font-bold text-slate-900">₹{itemCost.toLocaleString('en-IN')}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No optional add-ons selected.</p>
            )}
          </div>

          {/* Customer Details Summary */}
          <div className="p-5 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Customer Information</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>
                <span className="text-slate-400 block font-medium">Name</span>
                <span className="font-bold">{customerInfo.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Phone</span>
                <span className="font-bold">{customerInfo.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block font-medium">Email</span>
                <span className="font-bold">{customerInfo.email}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block font-medium">Address</span>
                <span className="font-medium">{customerInfo.address}, {customerInfo.city}, {customerInfo.state} - {customerInfo.pinCode}</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ITEMIZED PRICE BREAKDOWN CARD (5 Columns) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl sticky top-24">
          
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>Price Calculation</span>
            </h3>
            <p className="text-xs text-slate-400">
              Transparent itemized breakdown of your rental charges.
            </p>
          </div>

          <div className="space-y-3 text-xs pt-2 border-t border-slate-800">
            
            {/* Base Rental */}
            <div className="flex justify-between items-center text-slate-300">
              <span>Base Rental ({drone?.pricePerDay} × {rentalDays} days)</span>
              <span className="font-bold text-white">₹{baseRentalCost.toLocaleString('en-IN')}</span>
            </div>

            {/* Add-ons */}
            <div className="flex justify-between items-center text-slate-300">
              <span>Add-ons Total</span>
              <span className="font-bold text-white">₹{addonsTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800 font-medium">
              <span>Rental Subtotal</span>
              <span className="font-bold text-white text-sm">₹{rentalSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Discount if applicable */}
            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Multi-day Discount (10%)
                </span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Refundable Security Deposit */}
            <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1 my-2">
              <div className="flex justify-between items-center text-amber-300 font-bold">
                <span>Security Deposit (Refundable)</span>
                <span>₹{securityDeposit.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                * Security deposit is held separately during rental and refunded upon safe return.
              </p>
            </div>

          </div>

          {/* Grand Total */}
          <div className="pt-4 border-t border-slate-800 space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Amount Payable</span>
              <span className="text-3xl font-black text-white">
                ₹{finalTotalAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">
              Includes ₹{securityDeposit.toLocaleString('en-IN')} refundable deposit
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onSubmitBooking}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Booking Request</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>

            <button
              onClick={onBack}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Documents</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default BookingSummary
