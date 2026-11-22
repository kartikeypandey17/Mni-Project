import React from 'react'
import { useNavigate } from 'react-router-dom'

function DroneCard({ drone, isWishlisted, onToggleWishlist }) {
  const navigate = useNavigate()

  const availConfig = {
    'Available': { label: 'Available', icon: 'check_circle', color: '#4ae176', bg: 'rgba(74,225,118,0.12)', border: 'rgba(74,225,118,0.3)' },
    'Currently Rented': { label: 'In Flight', icon: 'flight', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', border: 'rgba(0,240,255,0.3)' },
    'Maintenance': { label: 'Maintenance', icon: 'build', color: '#ffb4ab', bg: 'rgba(255,180,171,0.1)', border: 'rgba(255,180,171,0.3)' },
  }
  const avail = availConfig[drone.availability] || availConfig['Available']

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    if (onToggleWishlist) onToggleWishlist(drone)
  }

  const price = drone.price || drone.pricePerDay || 0
  const rating = drone.rating || 0
  const reviews = drone.reviews || drone.reviewsCount || 0
  const flightTime = drone.flightTime || '—'
  const camera = drone.camera || '—'
  const city = drone.location?.city || drone.location || ''

  return (
    <article
      className="relative flex flex-col bg-[#181c24] border border-[#3b494b]/40 hover:border-[#00f0ff]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_4px_24px_rgba(0,240,255,0.08)] transition-all duration-300 group cursor-pointer"
      onClick={() => navigate(`/drones/${drone.id}`)}
    >
      {/* Image */}
      <div className="relative h-48 bg-[#1c2028] overflow-hidden flex-shrink-0">
        <img
          src={drone.image}
          alt={drone.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80'
          }}
        />

        {/* Brand badge */}
        <div
          className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(10,14,22,0.85)', color: '#dfe2ee', border: '1px solid rgba(59,73,75,0.5)', backdropFilter: 'blur(8px)' }}
        >
          {drone.brand}
        </div>

        {/* Availability badge */}
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: avail.color, background: avail.bg, border: `1px solid ${avail.border}`, backdropFilter: 'blur(8px)' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '11px', fontVariationSettings: "'FILL' 1" }}>{avail.icon}</span>
          {avail.label}
        </div>

        {/* Category badge on image bottom */}
        {drone.badge && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {drone.badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 z-10"
          style={{ background: 'rgba(10,14,22,0.85)', border: '1px solid rgba(59,73,75,0.5)', backdropFilter: 'blur(8px)' }}
          aria-label="Wishlist"
        >
          <span
            className="material-symbols-outlined transition-colors"
            style={{
              fontSize: '16px',
              color: isWishlisted ? '#ffb4ab' : '#849495',
              fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">

        {/* Category + Model */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {drone.category}
          </span>
          <span className="text-[11px] text-[#849495] truncate max-w-[100px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {drone.model}
          </span>
        </div>

        {/* Name + Rating */}
        <div>
          <h3
            className="text-[15px] font-semibold text-[#dfe2ee] group-hover:text-[#00f0ff] transition-colors line-clamp-1 leading-snug"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {drone.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[#aac7ff]" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-[12px] font-semibold text-[#dfe2ee]">{rating}</span>
            <span className="text-[11px] text-[#849495]">({reviews} reviews)</span>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-1.5 py-2.5 border-t border-[#3b494b]/30">
          {[
            { icon: 'photo_camera', label: camera },
            { icon: 'battery_full', label: `${flightTime} min` },
            { icon: 'sensors', label: `GPS ${drone.gps ? 'On' : 'Off'}` },
            { icon: 'location_on', label: city || 'On-site' },
          ].map(({ icon, label }, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#849495]" style={{ fontSize: '13px' }}>{icon}</span>
              <span className="text-[11px] text-[#b9cacb] truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-1 border-t border-[#3b494b]/20">
          <div>
            <span className="text-[20px] font-bold text-[#00f0ff] text-glow-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              ${price}
            </span>
            <span className="text-[11px] text-[#849495]" style={{ fontFamily: 'JetBrains Mono, monospace' }}> /day</span>
          </div>
          <button
            className="flex items-center gap-1 h-8 px-3 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff] border border-[#00f0ff]/30 hover:border-[#00f0ff] text-[#00f0ff] hover:text-[#002022] text-[12px] font-bold transition-all active:scale-95 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); navigate(`/drones/${drone.id}`) }}
          >
            Book
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default DroneCard
