import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, MapPin, Store, Calendar, ShieldCheck, ArrowRight, Home, Copy } from 'lucide-react'

// Step 6: Booking Confirmation Screen Component
function BookingConfirmation({ bookingData, drone }) {
  const navigate = useNavigate()

  if (!bookingData) return null

  const copyBookingId = () => {
    navigator.clipboard?.writeText(bookingData.bookingId)
    alert(`Booking ID ${bookingData.bookingId} copied to clipboard!`)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* SUCCESS BANNER CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl text-center space-y-6">
        
        {/* Animated Check Icon Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        {/* Heading & Status Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Status: Pending Shop Approval</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Booking Request Submitted!
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Your booking request has been submitted successfully. The rental shop will review your request and update the booking status.
          </p>
        </div>

        {/* Booking Reference ID Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-flex items-center gap-3">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Booking ID Reference</span>
            <span className="text-xl font-black text-blue-600 tracking-wider">
              {bookingData.bookingId}
            </span>
          </div>
          <button
            onClick={copyBookingId}
            className="p-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Copy Booking ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* DETAILS BREAKDOWN GRID */}
        <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200 text-left space-y-4">
          
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-2">
            Reservation Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Drone Item */}
            <div className="space-y-1">
              <span className="text-slate-400 font-medium block">Rented Drone</span>
              <span className="font-bold text-slate-900 text-sm block">
                {drone?.brand} {drone?.name}
              </span>
              <span className="text-slate-500 font-medium">{drone?.category}</span>
            </div>

            {/* Rental Shop */}
            <div className="space-y-1">
              <span className="text-slate-400 font-medium block">Rental Shop</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-blue-600" />
                {drone?.shopName}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {drone?.location}
              </span>
            </div>

            {/* Dates & Duration */}
            <div className="space-y-1">
              <span className="text-slate-400 font-medium block">Rental Schedule</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {bookingData.startDate} to {bookingData.endDate}
              </span>
              <span className="text-slate-500 font-medium">
                Duration: {bookingData.rentalDays} {bookingData.rentalDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            {/* Financial Amounts */}
            <div className="space-y-1">
              <span className="text-slate-400 font-medium block">Payment Breakdown</span>
              <div className="font-bold text-slate-900 text-sm">
                Rental Amount: ₹{bookingData.rentalSubtotal?.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-amber-700 font-medium">
                Security Deposit (Refundable): ₹{bookingData.securityDeposit?.toLocaleString('en-IN')}
              </div>
            </div>

          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          
          <button
            onClick={() => alert(`Viewing details for Booking ID: ${bookingData.bookingId}\nStatus: Pending Shop Approval\nDrone: ${drone?.name}\nShop: ${drone?.shopName}\nDates: ${bookingData.startDate} to ${bookingData.endDate}`)}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-7 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            View Booking
          </button>

          <Link
            to="/drones"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Back to Drones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </div>

    </div>
  )
}

export default BookingConfirmation
