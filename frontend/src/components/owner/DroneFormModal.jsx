import React, { useState, useEffect } from 'react'
import { X, Save, Camera, Clock, Zap, Weight, Compass, Image, Package } from 'lucide-react'

// Add / Edit Drone Modal Component
function DroneFormModal({ isOpen, onClose, onSave, droneToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'DJI',
    model: '',
    category: 'Photography',
    description: '',
    pricePerDay: 2500,
    securityDeposit: 10000,
    camera: '4K',
    flightTime: 35,
    speed: '75 km/h',
    weight: '958 g',
    gps: true,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
  })

  useEffect(() => {
    if (droneToEdit) {
      setFormData({
        name: droneToEdit.name || '',
        brand: droneToEdit.brand || 'DJI',
        model: droneToEdit.model || '',
        category: droneToEdit.category || 'Photography',
        description: droneToEdit.description || '',
        pricePerDay: droneToEdit.pricePerDay || 2500,
        securityDeposit: droneToEdit.securityDeposit || 10000,
        camera: droneToEdit.camera || '4K',
        flightTime: droneToEdit.flightTime || 35,
        speed: droneToEdit.speed || '75 km/h',
        weight: droneToEdit.weight || '958 g',
        gps: droneToEdit.gps ?? true,
        availability: droneToEdit.availability || 'Available',
        image: droneToEdit.image || 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
      })
    } else {
      setFormData({
        name: '',
        brand: 'DJI',
        model: '',
        category: 'Photography',
        description: '',
        pricePerDay: 2500,
        securityDeposit: 10000,
        camera: '4K',
        flightTime: 35,
        speed: '75 km/h',
        weight: '958 g',
        gps: true,
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
      })
    }
  }, [droneToEdit, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {droneToEdit ? 'Edit Shop Drone Inventory' : 'Add New Drone to Fleet'}
            </h2>
            <p className="text-xs text-slate-500">
              {droneToEdit ? `Updating metadata for ${droneToEdit.name}` : 'Fill in hardware specifications and pricing details.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="space-y-1 sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Drone Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mavic 3 Pro Cine"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 focus:bg-white rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
                required
              />
            </div>

            {/* Brand */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Brand
              </label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
              >
                <option value="DJI">DJI</option>
                <option value="Autel">Autel</option>
                <option value="Parrot">Parrot</option>
                <option value="Skydio">Skydio</option>
              </select>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
              >
                <option value="Photography">Photography</option>
                <option value="Videography">Videography</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Surveying">Surveying</option>
                <option value="Mapping">Mapping</option>
                <option value="Industrial Inspection">Industrial Inspection</option>
                <option value="Beginner">Beginner</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            {/* Model */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Model Number / Specs
              </label>
              <input
                type="text"
                placeholder="e.g. Mavic 3 Pro Hasselblad"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
              />
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Rental Status
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
              >
                <option value="Available">Available</option>
                <option value="Currently Rented">Currently Rented</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Rental Price / Day (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={formData.pricePerDay}
                onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Security Deposit (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={formData.securityDeposit}
                onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
                required
              />
            </div>

            {/* Camera */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Camera Resolution
              </label>
              <select
                value={formData.camera}
                onChange={(e) => setFormData({ ...formData, camera: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
              >
                <option value="4K">4K HDR</option>
                <option value="5.1K">5.1K Hasselblad</option>
                <option value="8K">8K Full-Frame Cinema</option>
              </select>
            </div>

            {/* Flight Time */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Flight Time (Mins)
              </label>
              <input
                type="number"
                value={formData.flightTime}
                onChange={(e) => setFormData({ ...formData, flightTime: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1 sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Image URL (Unsplash or direct image link)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-7 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{droneToEdit ? 'Save Changes' : 'Add Drone to Fleet'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default DroneFormModal
