import React, { useState, useMemo } from 'react'
import { Store, MapPin, Phone, Mail, Globe, Clock, ShieldCheck, Edit, Save, CheckCircle2, Power } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { shopProfiles } from '../../data/shops'

function ShopOwnerProfile() {
  const { currentUser } = useAuth()
  const shopId = currentUser?.shopId || 101

  const initialShop = useMemo(() => {
    return shopProfiles.find((s) => s.shopId === shopId) || shopProfiles[0]
  }, [shopId])

  const [isEditing, setIsEditing] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)

  // Shop Status Toggle
  const [shopStatus, setShopStatus] = useState(initialShop.status || 'Open')

  // Form State
  const [shopData, setShopData] = useState({
    name: initialShop.name,
    description: initialShop.description,
    phone: initialShop.phone,
    email: initialShop.email,
    address: initialShop.address,
    location: initialShop.location,
    operatingHours: initialShop.operatingHours,
    website: initialShop.website,
    logo: initialShop.logo
  })

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSuccessMsg('Shop profile updated successfully.')
    setTimeout(() => setSuccessMsg(null), 4000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shop Storefront Profile
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Manage your public shop listing details, operating status, and store location.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
        >
          <Edit className="w-4 h-4" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Shop Profile'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* SHOP STATUS TOGGLE CARD */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
            <Power className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">Shop Operating Status</div>
            <div className="text-xs text-slate-500">Toggle whether your shop is accepting new rental bookings.</div>
          </div>
        </div>

        <select
          value={shopStatus}
          onChange={(e) => {
            setShopStatus(e.target.value)
            setSuccessMsg(`Shop status changed to '${e.target.value}'.`)
            setTimeout(() => setSuccessMsg(null), 3000)
          }}
          className={`py-2 px-4 rounded-xl text-xs font-black cursor-pointer border ${
            shopStatus === 'Open'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-rose-50 text-rose-700 border-rose-300'
          }`}
        >
          <option value="Open">🟢 Open for Rentals</option>
          <option value="Closed">🔴 Closed</option>
          <option value="Temporarily Unavailable">🟡 Temporarily Unavailable</option>
        </select>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
        
        {/* Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
          <img
            src={shopData.logo}
            alt={shopData.name}
            className="w-24 h-24 rounded-3xl object-cover border-2 border-white shadow-md shrink-0"
          />
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Verified Storefront (Shop ID: #{shopId})</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{shopData.name}</h2>
            <p className="text-slate-500 text-xs">{shopData.location}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Shop Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={shopData.name}
                  onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                  required
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 text-sm">
                  {shopData.name}
                </div>
              )}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Shop Description
              </label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={shopData.description}
                  onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl p-3 text-xs font-semibold text-slate-800"
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed font-medium">
                  {shopData.description}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={shopData.phone}
                  onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900">
                  {shopData.phone}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 font-medium text-slate-500">
                {shopData.email} (Owner Primary)
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Physical Store Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={shopData.address}
                  onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900">
                  {shopData.address}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Operating Hours
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={shopData.operatingHours}
                  onChange={(e) => setShopData({ ...shopData, operatingHours: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900">
                  {shopData.operatingHours}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Website URL
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={shopData.website}
                  onChange={(e) => setShopData({ ...shopData, website: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800"
                />
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-bold text-purple-600">
                  {shopData.website}
                </div>
              )}
            </div>

          </div>

          {isEditing && (
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Shop Profile</span>
              </button>
            </div>
          )}

        </form>

      </div>

    </div>
  )
}

export default ShopOwnerProfile
