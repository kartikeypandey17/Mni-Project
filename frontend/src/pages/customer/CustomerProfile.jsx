import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function CustomerProfile() {
  const { currentUser } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)

  // Profile Form State
  const [profileData, setProfileData] = useState({
    fullName: currentUser?.name || 'Kartikey Sharma',
    email: currentUser?.email || 'user@dronehub.com',
    phone: '+91 98765 43210',
    address: '102 Skyline Residency, Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560034',
    memberSince: 'August 2025'
  })

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value })
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSuccessMsg('Profile updated successfully.')
    setTimeout(() => setSuccessMsg(null), 4000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Profile
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Manage your personal identity, contact details, and default delivery address.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
        >
          <Edit className="w-4 h-4" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
        
        {/* User Banner Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
            alt={profileData.fullName}
            className="w-24 h-24 rounded-3xl object-cover border-2 border-white shadow-md shrink-0"
          />
          
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Customer Account</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900">{profileData.fullName}</h2>
            <p className="text-slate-500 text-xs">{profileData.email}</p>
            <p className="text-xs text-slate-400 font-medium">Member Since: {profileData.memberSince}</p>
          </div>
        </div>

        {/* PROFILE DISPLAY / EDIT FORM */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Legal Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                  required
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 text-sm">
                  {profileData.fullName}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 font-medium text-slate-500 text-sm">
                {profileData.email} (Primary Login)
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                  required
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 text-sm">
                  {profileData.phone}
                </div>
              )}
            </div>

            {/* Street Address */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Street Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                  required
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 text-sm">
                  {profileData.address}
                </div>
              )}
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                  required
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 text-sm">
                  {profileData.city}
                </div>
              )}
            </div>

            {/* State & PIN Code Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  State
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                    required
                  />
                ) : (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 text-sm">
                    {profileData.state}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  PIN Code
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.pinCode}
                    onChange={(e) => handleChange('pinCode', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                    required
                  />
                ) : (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 text-sm">
                    {profileData.pinCode}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Submit Action when editing */}
          {isEditing && (
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}

        </form>

      </div>

    </div>
  )
}

export default CustomerProfile
