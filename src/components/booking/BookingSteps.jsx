import React from 'react'
import { Check } from 'lucide-react'

// Stepper Progress Indicator Component for the Multi-Step Booking UI
function BookingSteps({ currentStep, steps }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
      
      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:flex items-center justify-between relative">
        
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
        
        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep
          const isCurrent = step.number === currentStep

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center group">
              
              {/* Step Circle Badge */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-100'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md shadow-blue-500/25 scale-110'
                    : 'bg-white text-slate-400 border-2 border-slate-300'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : step.number}
              </div>

              {/* Step Title Label */}
              <span
                className={`mt-2 text-xs font-bold transition-colors text-center ${
                  isCurrent
                    ? 'text-blue-600 font-extrabold'
                    : isCompleted
                    ? 'text-emerald-700'
                    : 'text-slate-400'
                }`}
              >
                {step.title}
              </span>

            </div>
          )
        })}
      </div>

      {/* Mobile Compact Progress Bar */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-blue-600">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
          </span>
          <span className="text-slate-400">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </span>
        </div>

        {/* Progress Fill Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

    </div>
  )
}

export default BookingSteps
