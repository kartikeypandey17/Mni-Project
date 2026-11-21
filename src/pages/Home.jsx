import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Navigation, ArrowRight, ShieldCheck, Compass, Radio, Search, Sliders, 
  CalendarCheck, Send, Grid, Zap, DollarSign, Clock, Store, Users, CheckCircle2,
  Camera, Video, Sprout, Map, Layers, ShieldAlert, Sparkles, ChevronRight
} from 'lucide-react'

import DroneCard from '../components/DroneCard'
import ShopCard from '../components/ShopCard'
import { 
  categoriesData, stepsData, whyChooseData, featuredDrones, 
  featuredShops, statsData 
} from '../data/mockData'

// Helper function to dynamically map category icon strings to Lucide Components
const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Camera': return <Camera className="w-6 h-6" />
    case 'Video': return <Video className="w-6 h-6" />
    case 'Sprout': return <Sprout className="w-6 h-6" />
    case 'Map': return <Map className="w-6 h-6" />
    case 'Layers': return <Layers className="w-6 h-6" />
    case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />
    default: return <Navigation className="w-6 h-6" />
  }
}

// Helper function to map Why Choose icon strings
const getFeatureIcon = (iconName) => {
  switch (iconName) {
    case 'Grid': return <Grid className="w-6 h-6" />
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />
    case 'Zap': return <Zap className="w-6 h-6" />
    case 'DollarSign': return <DollarSign className="w-6 h-6" />
    case 'Clock': return <Clock className="w-6 h-6" />
    case 'Compass': return <Compass className="w-6 h-6" />
    default: return <Radio className="w-6 h-6" />
  }
}

// Helper function to map Step icons
const getStepIcon = (iconName) => {
  switch (iconName) {
    case 'Search': return <Search className="w-6 h-6" />
    case 'Sliders': return <Sliders className="w-6 h-6" />
    case 'CalendarCheck': return <CalendarCheck className="w-6 h-6" />
    case 'Send': return <Send className="w-6 h-6" />
    default: return <Navigation className="w-6 h-6" />
  }
}

// Home Component: Complete Public Landing Page
function Home() {
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-blue-200 shadow-2xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Next-Gen Multi-Tenant Drone Rental Ecosystem</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Rent the Right Drone. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Fly Without Limits.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover professional drones from trusted rental providers. Book with confidence and manage your drone rental experience from one smart platform.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/drones"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Explore Drones</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#shops"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-3.5 rounded-xl border border-slate-300 shadow-2xs transition-all hover:border-slate-400 cursor-pointer"
                >
                  <Store className="w-5 h-5 text-blue-600" />
                  <span>Find a Rental Shop</span>
                </a>
              </div>

              {/* Floating Stat Badges Row */}
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xl font-extrabold text-blue-600">500+</div>
                  <div className="text-xs text-slate-500 font-medium">Drones Available</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xl font-extrabold text-blue-600">50+</div>
                  <div className="text-xs text-slate-500 font-medium">Trusted Shops</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xl font-extrabold text-blue-600">2,500+</div>
                  <div className="text-xs text-slate-500 font-medium">Happy Customers</div>
                </div>
              </div>

            </div>

            {/* Right Graphic Preview Area */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Hero Showcase Card */}
                <div className="relative z-10 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-2xl">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80"
                      alt="Drone Hero"
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live Ready
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Enterprise Class</span>
                      <h3 className="text-lg font-bold text-white">Mavic 3 Thermal RTK</h3>
                      <p className="text-xs text-slate-300 mt-0.5">Dual Optical + Thermal Sensor Rig</p>
                    </div>
                  </div>

                  {/* Quick Card Floating Detail */}
                  <div className="mt-4 flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Daily Rental</div>
                      <div className="text-lg font-extrabold text-slate-900">$120 <span className="text-xs font-normal text-slate-500">/ day</span></div>
                    </div>
                    <Link to="/drones" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Decorative Blur Effect */}
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DRONE CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find the Perfect Drone for Every Mission
          </h2>
          <p className="text-base text-slate-600">
            Tailored UAV equipment categorized for specialized industry requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.bgGradient} ${cat.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {getCategoryIcon(cat.iconName)}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{cat.droneCount}</span>
                <Link to="/drones" className="text-slate-500 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                  <span>Browse</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW DRONEHUB WORKS SECTION */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Simple & Fast Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How DroneHub Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Renting a drone is seamless. Follow 4 simple steps from browsing to takeoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stepsData.map((step) => (
              <div key={step.stepNumber} className="relative bg-slate-800/80 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-blue-500/40 group-hover:text-blue-400 transition-colors">
                    {step.stepNumber}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    {getStepIcon(step.iconName)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mt-4">{step.title}</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Learn Complete Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE DRONEHUB SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose DroneHub
          </h2>
          <p className="text-base text-slate-600">
            Engineered to make drone discovery, host trust, and fleet rental effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {whyChooseData.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                {getFeatureIcon(item.iconName)}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED DRONES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Top Rated Fleet</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Drones Preview
            </h2>
            <p className="text-sm text-slate-600 mt-1">Explore some of our most popular rental drones ready for dispatch.</p>
          </div>

          <Link
            to="/drones"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm"
          >
            <span>View All Drones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredDrones.map((drone) => (
            <DroneCard key={drone.id} drone={drone} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED RENTAL SHOPS */}
      <section id="shops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Certified Hosts</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Rental Shops
            </h2>
            <p className="text-sm text-slate-600 mt-1">Rent from verified local store owners with inspect-tested hardware.</p>
          </div>

          <Link
            to="/drones"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm"
          >
            <span>Explore Shops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </section>

      {/* 7. STATISTICS SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-400/30">
            {statsData.map((stat, idx) => (
              <div key={idx} className="pt-4 md:pt-0 space-y-1">
                <div className="text-4xl sm:text-5xl font-black tracking-tight">{stat.value}</div>
                <div className="text-sm font-medium text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-slate-900 rounded-3xl p-8 sm:p-14 text-center text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Take Your Next Flight?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Join thousands of pilots, photographers, and businesses discovering top drone technology through DroneHub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/drones"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Explore Drones
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3.5 rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

    </div>
  )
}

export default Home
