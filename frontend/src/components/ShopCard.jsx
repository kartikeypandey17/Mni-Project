import React from 'react'
import { Link } from 'react-router-dom'

function ShopCard({ shop }) {
  const coverImage =
    shop.coverImage ||
    shop.image ||
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'

  return (
    <article className="flex flex-col bg-[#181c24] border border-[#3b494b]/40 hover:border-[#00f0ff]/30 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_4px_20px_rgba(0,240,255,0.06)] transition-all duration-300 group">

      {/* Cover image */}
      <div className="relative h-32 bg-[#1c2028] overflow-hidden">
        <img
          src={coverImage}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181c24] via-transparent to-transparent" />

        {/* Rating */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold"
          style={{ background: 'rgba(10,14,22,0.85)', color: '#aac7ff', border: '1px solid rgba(170,199,255,0.2)', backdropFilter: 'blur(8px)' }}
        >
          <span className="material-symbols-outlined text-[#aac7ff]" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>star</span>
          {shop.rating}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3
            className="text-[14px] font-semibold text-[#dfe2ee] group-hover:text-[#00f0ff] transition-colors line-clamp-1"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {shop.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[#849495]" style={{ fontSize: '13px' }}>location_on</span>
            <span className="text-[11px] text-[#849495]">{shop.location}</span>
          </div>
        </div>

        <p className="text-[12px] text-[#849495] line-clamp-2 leading-relaxed">{shop.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-[#3b494b]/20">
          <span
            className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>flight_takeoff</span>
            {shop.availableDrones} Drones
          </span>
          <Link
            to="/drones"
            className="flex items-center gap-1 text-[12px] text-[#b9cacb] hover:text-[#00f0ff] transition-colors font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            Explore
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ShopCard
