import React from 'react'
import { ArrowLeft, ArrowRight, ShieldCheck, BatteryCharging, Wrench, Briefcase, HardDrive, Check } from 'lucide-react'

// Available Add-on Packages catalog
export const availableAddons = [
  {
    id: 'addon-battery',
    name: 'Extra Intelligent Flight Battery',
    description: 'Provides 40+ additional minutes of flight time per swap.',
    price: 500,
    priceType: 'perDay',
    icon: 'BatteryCharging'
  },
  {
    id: 'addon-insurance',
    name: 'Full Damage Insurance Protection',
    description: 'Zero deductible coverage for accidental physical damage or crash landings.',
    price: 500,
    priceType: 'perDay',
    icon: 'ShieldCheck'
  },
  {
    id: 'addon-propellers',
    name: 'Backup Propeller Kit (8 Blades)',
    description: 'Spare low-noise quick-release blades in protective casing.',
    price: 300,
    priceType: 'flat',
    icon: 'Wrench'
  },
  {
    id: 'addon-case',
    name: 'Reinforced Travel Hardcase',
    description: 'Waterproof IP67 custom-cut foam case for safe transportation.',
    price: 200,
    priceType: 'flat',
    icon: 'Briefcase'
  },
  {
    id: 'addon-memory',
    name: '128GB High-Speed MicroSD Card',
    description: 'V30 U3 rated card capable of seamless 4K/8K RAW recording.',
    price: 250,
    priceType: 'flat',
    icon: 'HardDrive'
  }
]

// Icon mapper for add-ons
const getAddonIcon = (iconName) => {
  switch (iconName) {
    case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-blue-600" />
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />
    case 'Wrench': return <Wrench className="w-5 h-5 text-amber-600" />
    case 'Briefcase': return <Briefcase className="w-5 h-5 text-purple-600" />
    case 'HardDrive': return <HardDrive className="w-5 h-5 text-cyan-600" />
    default: return <ShieldCheck className="w-5 h-5 text-blue-600" />
  }
}

// Step 2: Rental Options Component
function RentalOptions({ selectedAddons, setSelectedAddons, rentalDays, onNext, onBack }) {
  
  const handleToggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId))
    } else {
      setSelectedAddons([...selectedAddons, addonId])
    }
  }

  // Calculate total addon cost
  const calculateAddonsCost = () => {
    return availableAddons.reduce((sum, addon) => {
      if (selectedAddons.includes(addon.id)) {
        const itemPrice = addon.priceType === 'perDay' ? addon.price * rentalDays : addon.price
        return sum + itemPrice
      }
      return sum
    }, 0)
  }

  const addonsTotal = calculateAddonsCost()

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Step 2: Custom Rental Add-ons
        </h2>
        <p className="text-slate-500 text-sm">
          Enhance your flight setup with additional batteries, protection plans, and memory gear.
        </p>
      </div>

      {/* Add-ons List */}
      <div className="space-y-3">
        {availableAddons.map((addon) => {
          const isSelected = selectedAddons.includes(addon.id)
          const totalPriceForItem = addon.priceType === 'perDay' ? addon.price * rentalDays : addon.price

          return (
            <div
              key={addon.id}
              onClick={() => handleToggleAddon(addon.id)}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              
              <div className="flex items-start gap-4">
                
                {/* Custom Checkbox */}
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getAddonIcon(addon.icon)}
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {addon.name}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                    {addon.description}
                  </p>
                </div>

              </div>

              {/* Pricing Display */}
              <div className="text-right shrink-0">
                <span className="text-base font-black text-slate-900 block">
                  ₹{addon.price.toLocaleString('en-IN')}
                  <span className="text-xs font-medium text-slate-500">
                    {addon.priceType === 'perDay' ? ' /day' : ' flat'}
                  </span>
                </span>
                {addon.priceType === 'perDay' && rentalDays > 1 && (
                  <span className="text-[11px] text-blue-600 font-semibold block">
                    (₹{totalPriceForItem.toLocaleString('en-IN')} for {rentalDays} days)
                  </span>
                )}
              </div>

            </div>
          )
        })}
      </div>

      {/* Selected Add-ons Total Summary Bar */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-sm">
        <span className="text-slate-600 font-medium">
          Selected Add-ons ({selectedAddons.length} item{selectedAddons.length !== 1 ? 's' : ''}):
        </span>
        <span className="font-black text-slate-900 text-base">
          ₹{addonsTotal.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all cursor-pointer"
        >
          <span>Continue to Customer Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}

export default RentalOptions
