import React from 'react'
import { ShieldCheck, MapPin, Star, Clock, Grid, MessageSquare, ExternalLink } from 'lucide-react'

// ShopInfoCard Component: Reusable card showcasing the drone owner rental shop details
function ShopInfoCard({ shopInfo, onContactClick, onViewShopClick }) {
  if (!shopInfo) return null

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
      
      {/* Header: Shop Avatar & Identity */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
          <img
            src={shopInfo.logo}
            alt={shopInfo.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {shopInfo.name}
            </h3>
            {shopInfo.verified && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-100">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Verified Shop
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{shopInfo.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 font-semibold text-slate-700">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{shopInfo.rating}</span>
              <span className="text-slate-400 font-normal">({shopInfo.reviewsCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Specs / Metadata */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
          <div className="text-slate-400 flex items-center gap-1 font-medium">
            <Grid className="w-3.5 h-3.5 text-blue-600" />
            <span>Available Fleet</span>
          </div>
          <div className="text-sm font-bold text-slate-800">
            {shopInfo.dronesCount} Drones Listed
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
          <div className="text-slate-400 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Avg Response</span>
          </div>
          <div className="text-sm font-bold text-slate-800">
            {shopInfo.responseTime}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={onContactClick || (() => alert(`Contacting ${shopInfo.name}\nEmail: ${shopInfo.email}\nPhone: ${shopInfo.phone}`))}
          className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span>Contact Shop</span>
        </button>

        <button
          onClick={onViewShopClick || (() => alert(`Navigating to ${shopInfo.name} storefront page...`))}
          className="inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2.5 px-4 rounded-xl text-xs border border-blue-200 transition-colors cursor-pointer"
        >
          <span>View Shop</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  )
}

export default ShopInfoCard
