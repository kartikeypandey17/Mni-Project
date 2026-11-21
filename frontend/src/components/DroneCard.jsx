import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Clock, Star, MapPin, Store, Navigation, Heart, ArrowRight } from 'lucide-react'

// DroneCard Component: Grid View item displaying drone details and rental actions
function DroneCard({ drone, isWishlisted, onToggleWishlist }) {
  const navigate = useNavigate()

  // Format availability badge styles
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

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    if (onToggleWishlist) {
      onToggleWishlist(drone)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Image Container with Badges */}
      <div 
        onClick={() => navigate(`/drones/${drone.id}`)}
        className="relative h-52 bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={drone.image}
          alt={drone.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Brand Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 border border-white/40 shadow-xs">
          {drone.brand}
        </div>

        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs ${getBadgeStyle(drone.availability)}`}>
          {drone.availability}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Add to Wishlist"
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-400 hover:text-rose-500'
            }`}
          />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Category & Model */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
              {drone.category}
            </span>
            <span className="text-slate-400 font-medium truncate max-w-[120px]">
              {drone.model}
            </span>
          </div>

          {/* Drone Name */}
          <h3 
            onClick={() => navigate(`/drones/${drone.id}`)}
            className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer"
          >
            {drone.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1 font-bold text-slate-800">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{drone.rating}</span>
            </div>
            <span className="text-slate-400">({drone.reviews} reviews)</span>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{drone.camera}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{drone.flightTime} mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>GPS {drone.gps ? 'Enabled' : 'No'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{drone.location}</span>
            </div>
          </div>

          {/* Shop Owner Info */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
            <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-medium">{drone.shopName}</span>
          </div>
        </div>

        {/* Pricing & Actions Footer */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-normal">Security Deposit: ₹{drone.securityDeposit ? drone.securityDeposit.toLocaleString('en-IN') : '10,000'}</span>
              <div className="text-xl font-black text-slate-900">
                ₹{drone.pricePerDay ? drone.pricePerDay.toLocaleString('en-IN') : '2,500'} <span className="text-xs font-semibold text-slate-500">/day</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate(`/drones/${drone.id}`)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={() => navigate(`/booking/${drone.id}`)}
              disabled={drone.availability !== 'Available'}
              className={`w-full font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
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

export default DroneCard

