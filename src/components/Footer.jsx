import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, Globe, Share2, MessageCircle, Send, Mail, Phone } from 'lucide-react'

// Footer Component: Reusable public site footer
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
              <Navigation className="w-8 h-8 text-blue-500 transform rotate-45" />
              <span className="text-2xl font-bold tracking-tight text-white">
                DRONE<span className="text-blue-500">HUB</span>
              </span>
            </Link>
            
            <p className="text-blue-400 font-semibold text-sm tracking-wide">
              Rent. Fly. Track.
            </p>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              DroneHub is a multi-tenant drone rental & tracking management platform connecting certified rental providers with aerial enthusiasts, cinematic creators, and enterprise teams.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#global" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors" aria-label="Global Community">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#share" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#chat" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors" aria-label="Community Chat">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#send" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors" aria-label="Newsletter">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-white text-base font-bold tracking-wide">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/drones" className="text-slate-400 hover:text-white transition-colors">Explore Drones</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/how-it-works#roles" className="text-slate-400 hover:text-white transition-colors">For Shop Owners</Link>
              </li>
              <li>
                <Link to="/drones" className="text-slate-400 hover:text-white transition-colors">Rental Fleet</Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-white text-base font-bold tracking-wide">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Careers (Hiring)</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Press Kit</span>
              </li>
            </ul>
          </div>

          {/* Support & Legal Links */}
          <div className="space-y-3">
            <h4 className="text-white text-base font-bold tracking-wide">Support & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ & Answers</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} DroneHub Inc. All rights reserved. Built for College Project Foundation.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Use</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Security</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
