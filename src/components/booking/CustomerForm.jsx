import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, User, Mail, Phone, MapPin, Building, Target, Award, AlertCircle } from 'lucide-react'

// Step 3: Customer Form Component
function CustomerForm({ customerInfo, setCustomerInfo, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  // Validate fields before proceeding
  const validateForm = () => {
    const newErrors = {}

    if (!customerInfo.fullName || customerInfo.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full legal name.'
    }

    if (!customerInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!customerInfo.phone || !/^[0-9+\s-]{10,15}$/.test(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.'
    }

    if (!customerInfo.address || customerInfo.address.trim().length < 5) {
      newErrors.address = 'Please enter your full street address.'
    }

    if (!customerInfo.city || customerInfo.city.trim().length < 2) {
      newErrors.city = 'Please enter your city.'
    }

    if (!customerInfo.state || customerInfo.state.trim().length < 2) {
      newErrors.state = 'Please enter your state.'
    }

    if (!customerInfo.pinCode || !/^[0-9]{6}$/.test(customerInfo.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Step 3: Customer Details
        </h2>
        <p className="text-slate-500 text-sm">
          Provide your contact and delivery address details to complete your rental reservation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Personal Details Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Kartikey Sharma"
                value={customerInfo.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={`w-full bg-slate-50 border focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-all ${
                  errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.fullName && <p className="text-xs text-rose-600 font-semibold">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="kartikey@example.com"
                value={customerInfo.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full bg-slate-50 border focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-all ${
                  errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.email && <p className="text-xs text-rose-600 font-semibold">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={customerInfo.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full bg-slate-50 border focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-all ${
                  errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.phone && <p className="text-xs text-rose-600 font-semibold">{errors.phone}</p>}
          </div>

        </div>

        {/* Address Details */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-blue-600">
            Delivery / Pickup Address
          </h3>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Street Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="House / Flat No., Building Name, Street"
                value={customerInfo.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className={`w-full bg-slate-50 border focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-all ${
                  errors.address ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.address && <p className="text-xs text-rose-600 font-semibold">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Bengaluru"
                value={customerInfo.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className={`w-full bg-slate-50 border focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-all ${
                  errors.city ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              {errors.city && <p className="text-xs text-rose-600 font-semibold">{errors.city}</p>}
            </div>

            {/* State */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                State <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Karnataka"
                value={customerInfo.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                className={`w-full bg-slate-50 border focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-all ${
                  errors.state ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              {errors.state && <p className="text-xs text-rose-600 font-semibold">{errors.state}</p>}
            </div>

            {/* PIN Code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                PIN Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="560001"
                maxLength={6}
                value={customerInfo.pinCode || ''}
                onChange={(e) => handleChange('pinCode', e.target.value)}
                className={`w-full bg-slate-50 border focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-all ${
                  errors.pinCode ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              {errors.pinCode && <p className="text-xs text-rose-600 font-semibold">{errors.pinCode}</p>}
            </div>

          </div>
        </div>

        {/* Flight Purpose & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          
          {/* Purpose of Rental */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Purpose of Rental
            </label>
            <select
              value={customerInfo.purpose || 'Aerial Photography'}
              onChange={(e) => handleChange('purpose', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 font-medium transition-all"
            >
              <option value="Aerial Photography">Aerial Photography</option>
              <option value="Cinematography / Event">Cinematography / Event</option>
              <option value="Commercial Real Estate">Commercial Real Estate</option>
              <option value="Land Surveying / Mapping">Land Surveying / Mapping</option>
              <option value="Agricultural Scanning">Agricultural Scanning</option>
              <option value="Personal Practice / Hobby">Personal Practice / Hobby</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Drone Flying Experience
            </label>
            <select
              value={customerInfo.experience || 'Intermediate (10+ hours)'}
              onChange={(e) => handleChange('experience', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 font-medium transition-all"
            >
              <option value="Beginner (< 5 hours)">Beginner (&lt; 5 hours flight)</option>
              <option value="Intermediate (10+ hours)">Intermediate (10+ hours flight)</option>
              <option value="Advanced Commercial Pilot">Advanced Commercial Pilot</option>
              <option value="Certified FAA / DGCA Drone Operator">Certified DGCA / Part 107 Pilot</option>
            </select>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Continue to Documents</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  )
}

export default CustomerForm
