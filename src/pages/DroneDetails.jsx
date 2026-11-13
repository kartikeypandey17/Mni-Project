import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ChevronRight, Heart, Star, Camera, Clock, Zap, Weight, Compass, Radio, 
  Battery, Package, CheckCircle2, ShieldAlert, ArrowRight, ChevronLeft, 
  Calendar, FileText, AlertCircle, Info, Store, MapPin, Sparkles
} from 'lucide-react'

import { dronesData } from '../data/drones'
import droneService from '../services/droneService'
import { getEnrichedDroneDetails } from '../data/droneDetailsHelper'
import DroneCard from '../components/DroneCard'
import ShopInfoCard from '../components/ShopInfoCard'
import Toast from '../components/Toast'

// Icon mapper for specifications
const getSpecIcon = (iconName) => {
  switch (iconName) {
    case 'Camera': return <Camera className="w-5 h-5 text-blue-600" />
    case 'Clock': return <Clock className="w-5 h-5 text-indigo-600" />
    case 'Zap': return <Zap className="w-5 h-5 text-amber-600" />
    case 'Weight': return <Weight className="w-5 h-5 text-purple-600" />
    case 'Compass': return <Compass className="w-5 h-5 text-emerald-600" />
    case 'Radio': return <Radio className="w-5 h-5 text-cyan-600" />
    case 'Battery': return <Battery className="w-5 h-5 text-rose-600" />
    case 'Package': return <Package className="w-5 h-5 text-teal-600" />
    default: return <Info className="w-5 h-5 text-blue-600" />
  }
}

// Drone Details Page Component
function DroneDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // State: API fetched drone document
  const [apiDrone, setApiDrone] = useState(null)
  const [isLoadingApi, setIsLoadingApi] = useState(false)

  // Fetch drone from backend API
  useEffect(() => {
    let isMounted = true
    setIsLoadingApi(true)

    droneService
      .getDroneById(id)
      .then((data) => {
        if (isMounted && data) {
          setApiDrone(data)
        }
      })
      .catch((err) => {
        console.warn('API fetch failed, utilizing enriched catalog specification:', err.message)
      })
      .finally(() => {
        if (isMounted) setIsLoadingApi(false)
      })

    return () => {
      isMounted = false
    }
  }, [id])

  // 1. Fetch raw drone by route parameter ID (API first, fallback to mock dataset)
  const rawDrone = useMemo(() => {
    if (apiDrone) {
      return {
        id: apiDrone._id || apiDrone.id,
        name: apiDrone.name,
        brand: apiDrone.brand,
        model: apiDrone.model,
        category: apiDrone.category || 'Photography',
        pricePerDay: apiDrone.pricePerDay || (apiDrone.pricePerHour ? apiDrone.pricePerHour * 8 : 2500),
        pricePerHour: apiDrone.pricePerHour,
        securityDeposit: apiDrone.securityDeposit || 10000,
        rating: apiDrone.rating || 4.9,
        reviews: apiDrone.reviews || 0,
        camera: apiDrone.specifications?.camera || apiDrone.camera || '4K',
        flightTime: Number(apiDrone.specifications?.flightTime || apiDrone.flightTime || 35),
        gps: apiDrone.specifications?.gps ?? apiDrone.gps ?? true,
        availability:
          apiDrone.availability ||
          (apiDrone.status
            ? apiDrone.status.charAt(0).toUpperCase() + apiDrone.status.slice(1)
            : 'Available'),
        status: apiDrone.status || 'available',
        shopName: apiDrone.shopName || 'SkyRent Bengaluru',
        location: apiDrone.location || 'Bengaluru',
        image: apiDrone.image,
        popular: apiDrone.popular ?? true,
        recommended: apiDrone.recommended ?? true
      }
    }

    // Fallback: match by numeric ID or model
    return (
      dronesData.find((d) => String(d.id) === String(id)) ||
      dronesData.find((d) => d.model?.toLowerCase() === String(id).toLowerCase()) ||
      dronesData[0]
    )
  }, [id, apiDrone])

  // 2. Enrich drone data with extended specs, gallery, policies, reviews
  const drone = useMemo(() => {
    return getEnrichedDroneDetails(rawDrone)
  }, [rawDrone])

  // State: Active gallery image index
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // State: Wishlisted state
  const [isWishlisted, setIsWishlisted] = useState(false)

  // State: Toast notification message
  const [toastMessage, setToastMessage] = useState(null)

  // State: Show all reviews toggle
  const [showAllReviews, setShowAllReviews] = useState(false)

  // Get 4 related drones (excluding current drone)
  const relatedDrones = useMemo(() => {
    if (!drone) return []
    const categoryMatches = dronesData.filter(
      (d) => d.id !== drone.id && d.category === drone.category
    )
    if (categoryMatches.length >= 4) {
      return categoryMatches.slice(0, 4)
    }
    // Fallback: pick any 4 drones
    const remaining = dronesData.filter((d) => d.id !== drone.id)
    return remaining.slice(0, 4)
  }, [drone])

  // Wishlist handler
  const handleToggleWishlist = () => {
    if (isWishlisted) {
      setIsWishlisted(false)
      setToastMessage({ text: `${drone.name} removed from wishlist`, type: 'info' })
    } else {
      setIsWishlisted(true)
      setToastMessage({ text: `${drone.name} added to your wishlist!`, type: 'wishlist' })
    }
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Previous image handler
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? drone.galleryImages.length - 1 : prev - 1))
  }

  // Next image handler
  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === drone.galleryImages.length - 1 ? 0 : prev + 1))
  }

  // NOT FOUND STATE
  if (!drone) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-white p-10 sm:p-14 rounded-3xl border border-slate-200 shadow-xl space-y-5">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900">
            Drone Not Found
          </h2>

          <p className="text-slate-600 max-w-md mx-auto text-base">
            The drone you're looking for may no longer be available or the rental link might be outdated.
          </p>

          <div className="pt-2">
            <Link
              to="/drones"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-xl transition-all shadow-md cursor-pointer text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Drones</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Availability badge styling helper
  const getBadgeStyle = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-emerald-500 text-white'
      case 'Currently Rented':
        return 'bg-amber-500 text-white'
      case 'Maintenance':
        return 'bg-rose-500 text-white'
      default:
        return 'bg-slate-700 text-white'
    }
  }

  const displayedReviews = showAllReviews ? drone.reviewsList : drone.reviewsList.slice(0, 3)

  return (
    <div className="space-y-12 pb-24 pt-4">
      
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/drones" className="hover:text-blue-600 transition-colors">
            Drones
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none">
            {drone.brand} {drone.name}
          </span>
        </nav>
      </div>

      {/* 2. MAIN DRONE HERO: GALLERY + DRONE INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: IMAGE GALLERY (7 Columns on Desktop) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Showcase Image Container */}
            <div className="relative h-80 sm:h-96 md:h-[450px] bg-slate-900 rounded-3xl overflow-hidden group shadow-lg border border-slate-200">
              <img
                src={drone.galleryImages[activeImageIndex]}
                alt={drone.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-xs border border-white/40">
                  {drone.brand}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs ${getBadgeStyle(drone.availability)}`}>
                  {drone.availability}
                </span>
              </div>

              {/* Prev / Next Controls */}
              <button
                onClick={handlePrevImage}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur-xs shadow-md transition-all cursor-pointer opacity-90 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextImage}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur-xs shadow-md transition-all cursor-pointer opacity-90 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter Indicator */}
              <div className="absolute bottom-4 right-4 bg-slate-950/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                {activeImageIndex + 1} / {drone.galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Selection Bar */}
            <div className="grid grid-cols-5 gap-3">
              {drone.galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-100 ${
                    activeImageIndex === idx
                      ? 'border-blue-600 ring-2 ring-blue-600/30 scale-95 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: DRONE INFORMATION & ACTION CARD (5 Columns on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Category & Model */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-blue-600 uppercase text-xs tracking-wider bg-blue-50 px-3 py-1 rounded-lg">
                  {drone.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Model: {drone.model}
                </span>
              </div>

              {/* Drone Title */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {drone.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-slate-600 pt-1">
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{drone.rating}</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="font-medium text-slate-600">{drone.reviews} Verified Reviews</span>
                </div>
              </div>

              {/* Price & Security Deposit Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500 font-medium">Rental Price</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Instant Approval
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{drone.pricePerDay.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ day</span>
                </div>

                <div className="pt-2 text-xs text-slate-600 font-medium flex items-center justify-between border-t border-slate-200/60 mt-2">
                  <span>Security Deposit:</span>
                  <span className="font-bold text-slate-800">
                    ₹{drone.securityDeposit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Shop & Location Quick Info */}
              <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Store className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{drone.shopName}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{drone.location}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate(`/booking/${drone.id}`)}
                  disabled={drone.availability !== 'Available'}
                  className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    drone.availability === 'Available'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Rent This Drone</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Calibrated Gear</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified Shop Host</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. DRONE SPECIFICATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Technical Specifications
            </h2>
            <p className="text-sm text-slate-500">
              Comprehensive hardware capabilities and flight specs for {drone.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {drone.specifications.map((spec, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white shadow-2xs shrink-0">
                  {getSpecIcon(spec.icon)}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-500 font-medium">{spec.label}</div>
                  <div className="text-sm font-bold text-slate-900">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DESCRIPTION & USE CASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Drone Overview & Description
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {drone.description}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Recommended Use Cases
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
                {drone.useCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. WHAT'S INCLUDED IN THE KIT */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">
                What's Included in Kit
              </h2>
              <p className="text-xs text-slate-500">
                Standard equipment delivered with your rental request.
              </p>
            </div>

            <div className="space-y-3">
              {drone.whatsIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="text-slate-500 text-[11px]">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. RENTAL INFORMATION & POLICIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Rental Rules & Terms
            </h2>
            <p className="text-sm text-slate-500">
              Important policies regarding security deposits, cancellations, and damage coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Security Deposit</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {drone.rentalPolicies.securityDeposit}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Cancellation Policy</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {drone.rentalPolicies.cancellationPolicy}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Late Return & Minimum</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {drone.rentalPolicies.lateReturnPolicy} Min duration: {drone.rentalPolicies.minRentalPeriod}.
              </p>
            </div>

          </div>

          {/* Operating Rules */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Rental Operating Guidelines</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-amber-800/90 pl-1">
              {drone.rentalPolicies.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. RENTAL SHOP INFORMATION & REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Shop Card (4 Columns) */}
          <div className="lg:col-span-4">
            <ShopInfoCard shopInfo={drone.shopInfo} />
          </div>

          {/* Reviews List (8 Columns) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Customer Reviews
                </h2>
                <p className="text-xs text-slate-500">
                  Verified feedback from recent renters of {drone.name}.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-800">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{drone.rating} / 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {displayedReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{rev.name}</div>
                        <div className="text-[11px] text-slate-400">{rev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>

            {drone.reviewsList.length > 3 && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  {showAllReviews ? 'Show Fewer Reviews' : `See All Reviews (${drone.reviewsList.length})`}
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 8. RELATED DRONES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Related Drones
            </h2>
            <p className="text-sm text-slate-500">
              Explore similar models in the {drone.category} category.
            </p>
          </div>

          <Link
            to="/drones"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedDrones.map((item) => (
            <DroneCard
              key={item.id}
              drone={item}
              isWishlisted={false}
              onToggleWishlist={() => setToastMessage({ text: `${item.name} added to wishlist!`, type: 'wishlist' })}
            />
          ))}
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  )
}

export default DroneDetails
