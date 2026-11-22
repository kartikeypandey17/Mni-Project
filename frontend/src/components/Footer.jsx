import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const socialIcons = ['public', 'share', 'forum', 'send']

  const links = [
    {
      title: 'Product',
      items: [
        ['Explore Drones', '/drones'],
        ['How It Works', '/how-it-works'],
        ['For Shop Owners', '/how-it-works#roles'],
        ['Rental Fleet', '/drones'],
      ],
    },
    {
      title: 'Company',
      items: [
        ['About Us', '/about'],
        ['Contact', '/contact'],
        ['Careers (Hiring)', null],
        ['Press Kit', null],
      ],
    },
    {
      title: 'Support',
      items: [
        ['FAQ & Answers', '/faq'],
        ['Help Center', '/contact'],
        ['Privacy Policy', null],
        ['Terms & Conditions', null],
      ],
    },
  ]

  return (
    <footer className="bg-[#0a0e16] border-t border-[#3b494b]/30 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-[#3b494b]/20">

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00dbe9] to-[#3e90ff] flex items-center justify-center glow-primary group-hover:scale-105 transition-transform">
                <span
                  className="material-symbols-outlined text-[#002022]"
                  style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}
                >
                  flight_takeoff
                </span>
              </div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="font-bold text-[20px] text-[#00f0ff] tracking-tight">
                DroneHub
              </span>
            </Link>

            <p className="text-[11px] text-[#00f0ff] uppercase tracking-widest font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Rent. Fly. Track.
            </p>

            <p className="text-[13px] text-[#849495] leading-relaxed max-w-sm">
              DroneHub is a next-gen multi-tenant drone rental platform connecting certified providers with pilots, filmmakers, and enterprise teams.
            </p>

            <div className="flex gap-2 pt-1">
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-[#1c2028] border border-[#3b494b]/40 hover:border-[#00f0ff]/40 hover:bg-[#00f0ff]/10 text-[#849495] hover:text-[#00f0ff] flex items-center justify-center transition-all"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {links.map(({ title, items }) => (
            <div key={title} className="space-y-3">
              <h4
                className="text-[11px] font-bold uppercase tracking-widest text-[#00f0ff]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map(([label, path]) => (
                  <li key={label}>
                    {path ? (
                      <Link to={path} className="text-[13px] text-[#849495] hover:text-[#dfe2ee] transition-colors">
                        {label}
                      </Link>
                    ) : (
                      <span className="text-[13px] text-[#3b494b] cursor-not-allowed">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#849495]">
            <span className="material-symbols-outlined text-[#00f0ff]" style={{ fontSize: '14px' }}>verified</span>
            <p>© {new Date().getFullYear()} DroneHub Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-5 text-[11px] text-[#849495]">
            {['Privacy Policy', 'Terms of Use', 'Security'].map((item) => (
              <span key={item} className="hover:text-[#dfe2ee] cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
