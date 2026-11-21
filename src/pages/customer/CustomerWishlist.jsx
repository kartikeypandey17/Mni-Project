import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight, Sparkles, AlertCircle } from 'lucide-react'
import DroneCard from '../../components/DroneCard'
import { dronesData } from '../../data/drones'

function CustomerWishlist() {
  // Wishlisted drone IDs state initialized with sample items
  const [wishlistedIds, setWishlistedIds] = useState([1, 2, 8, 11, 13])

  const wishlistedDrones = dronesData.filter((d) => wishlistedIds.includes(d.id))

  const handleToggleWishlist = (drone) => {
    setWishlistedIds((prev) => prev.filter((id) => id !== drone.id))
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Wishlist ({wishlistedDrones.length})
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Saved drones ready for your upcoming project rentals.
          </p>
        </div>

        {wishlistedDrones.length > 0 && (
          <button
            onClick={() => setWishlistedIds([])}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {/* WISHLIST GRID OR EMPTY STATE */}
      {wishlistedDrones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedDrones.map((drone) => (
            <DroneCard
              key={drone.id}
              drone={drone}
              isWishlisted={true}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      ) : (
        /* EMPTY STATE DISPLAY */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 sm:p-16 text-center space-y-5 max-w-xl mx-auto shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Your Wishlist is Empty
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Save drones you're interested in while browsing the marketplace and they'll appear here for quick booking.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/drones"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Explore Drones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  )
}

export default CustomerWishlist
