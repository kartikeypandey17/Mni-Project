import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Navigation, CheckCircle2, ArrowRight } from 'lucide-react'

// ShopCard Component: Reusable card for displaying rental shops
function ShopCard({ shop }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Shop Banner Image */}
      <div className="relative h-40 bg-slate-100 overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {shop.verified && (
          <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Shop</span>
          </div>
        )}
      </div>

      {/* Shop Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {shop.name}
            </h3>
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-800 shrink-0">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{shop.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{shop.location}</span>
          </div>

          <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
            {shop.description}
          </p>
        </div>

        {/* Footer Details & Explore Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
            <Navigation className="w-3.5 h-3.5" />
            <span>{shop.availableDrones} Drones Available</span>
          </div>

          <Link
            to="/drones"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ShopCard
