import React, { useMemo } from 'react'
import { Calendar, Clock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

// Step 1: Date Selector Component
function DateSelector({ startDate, setStartDate, endDate, setEndDate, onNext, drone }) {
  
  // Calculate rental duration in days
  const calculation = useMemo(() => {
    if (!startDate || !endDate) {
      return { days: 0, error: 'Please select both start and end dates.' }
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { days: 0, error: 'Invalid date format selected.' }
    }

    if (end < start) {
      return { days: 0, error: 'End date cannot be before start date.' }
    }

    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // Inclusive count of rental days

    if (diffDays < 1) {
      return { days: 0, error: 'Rental duration must be at least 1 day.' }
    }

    return { days: diffDays, error: null }
  }, [startDate, endDate])

  const isValid = calculation.days >= 1 && !calculation.error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      onNext()
    }
  }

  // Get current date string for min date attribute YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Step 1: Select Rental Dates
        </h2>
        <p className="text-slate-500 text-sm">
          Choose your pickup start date and scheduled return end date for {drone?.name}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Date Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Start Date Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Start Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                min={todayStr}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 transition-all"
                required
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* End Date Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              End Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                min={startDate || todayStr}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 transition-all"
                required
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Validation Alert / Duration Result Display */}
        {calculation.error ? (
          <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{calculation.error}</span>
          </div>
        ) : (
          <div className="p-5 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Calculated Rental Duration</span>
                <span className="text-lg font-black text-slate-900">
                  {calculation.days} {calculation.days === 1 ? 'Day' : 'Days'}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">Base Rental Rate</span>
              <span className="text-lg font-black text-blue-600">
                ₹{(drone?.pricePerDay * calculation.days).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* Submit & Next Action */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={!isValid}
            className={`inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm transition-all cursor-pointer ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Continue to Options</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  )
}

export default DateSelector
