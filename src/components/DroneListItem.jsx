import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Clock, Star, MapPin, Store, Navigation, Heart, ArrowRight } from 'lucide-react'

// DroneListItem Component: Horizontal List View item layout
function DroneListItem({ drone, isWishlisted, onToggleWishlist }) {
  const navigate = useNavigate()
  
  const getBadgeStyle = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-emerald-500/90 text-white'
      case 'Currently Rented':
        return 'bg-amber-500/90 text-white'
      case 'Maintenance':
        return 'bg-rose-500/90 text-white'
      default:
        return 'bg-slate-700 text-white'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row group">
      
      {/* Image Container */}
      <div 
        onClick={() => navigate(`/drones/${drone.id}`)}
        className="relative md:w-72 h-52 md:h-auto bg-slate-100 shrink-0 overflow-hidden cursor-pointer"
      >
        <img
          src={drone.image}
          alt={drone.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 border border-white/40 shadow-xs">
          {drone.brand}
        </div>

        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs ${getBadgeStyle(drone.availability)}`}>
          {drone.availability}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-600 text-xs uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                {drone.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">Model: {drone.model}</span>
            </div>

            <button
              onClick={() => onToggleWishlist && onToggleWishlist(drone)}
              aria-label="Add to Wishlist"
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-400 hover:text-rose-500'
                }`}
              />
            </button>
          </div>

          {/* Title & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 
              onClick={() => navigate(`/drones/${drone.id}`)}
              className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
            >
              {drone.name}
            </h3>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-900">{drone.rating}</span>
              <span className="text-slate-400">({drone.reviews} reviews)</span>
            </div>
          </div>

          {/* Specifications Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Camera className="w-4 h-4 text-slate-400" />
              <span>Camera: {drone.camera}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Flight Time: {drone.flightTime} mins</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Navigation className="w-4 h-4 text-slate-400" />
              <span>GPS: {drone.gps ? 'Enabled' : 'No'}</span>
            </div>
          </div>

          {/* Shop Information */}
          <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium text-slate-700">{drone.shopName}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{drone.location}</span>
            </div>
          </div>
        </div>

        {/* Footer Pricing & Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Deposit: ₹{drone.securityDeposit ? drone.securityDeposit.toLocaleString('en-IN') : '10,000'}</span>
            <div className="text-2xl font-black text-slate-900">
              ₹{drone.pricePerDay ? drone.pricePerDay.toLocaleString('en-IN') : '2,500'} <span className="text-xs font-semibold text-slate-500">/day</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/drones/${drone.id}`)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={() => navigate(`/booking/${drone.id}`)}
              disabled={drone.availability !== 'Available'}
              className={`font-bold px-6 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer ${
                drone.availability === 'Available'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Rent Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DroneListItem

