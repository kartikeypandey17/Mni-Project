import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, AlertCircle, ShieldCheck } from 'lucide-react'

import { dronesData } from '../data/drones'
import { getEnrichedDroneDetails } from '../data/droneDetailsHelper'
import droneService from '../services/droneService'
import bookingService from '../services/bookingService'
import authService from '../services/authService'

// Reusable Booking Components
import BookingSteps from '../components/booking/BookingSteps'
import DateSelector from '../components/booking/DateSelector'
import RentalOptions from '../components/booking/RentalOptions'
import CustomerForm from '../components/booking/CustomerForm'
import DocumentUpload from '../components/booking/DocumentUpload'
import BookingSummary from '../components/booking/BookingSummary'
import BookingConfirmation from '../components/booking/BookingConfirmation'

// Booking Steps definitions
const STEPS = [
  { number: 1, title: 'Dates' },
  { number: 2, title: 'Rental Options' },
  { number: 3, title: 'Customer Details' },
  { number: 4, title: 'Documents' },
  { number: 5, title: 'Review' },
  { number: 6, title: 'Confirmation' }
]

// Main Booking UI Page Component
function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // State: backend API fetched drone
  const [apiDrone, setApiDrone] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    let isMounted = true
    droneService
      .getDroneById(id)
      .then((data) => {
        if (isMounted && data) {
          setApiDrone(data)
        }
      })
      .catch((err) => {
        console.warn('Drone lookup via API failed, utilizing local catalog:', err.message)
      })
    return () => {
      isMounted = false
    }
  }, [id])

  // Find target drone
  const rawDrone = useMemo(() => {
    if (apiDrone) {
      return {
        id: apiDrone._id || apiDrone.id,
        _id: apiDrone._id,
        name: apiDrone.name,
        brand: apiDrone.brand,
        model: apiDrone.model,
        rating: apiDrone.rating || 4.8,
        reviewsCount: apiDrone.reviewsCount || 12,
        pricePerHour: apiDrone.pricePerHour,
        pricePerDay: apiDrone.pricePerDay || (apiDrone.pricePerHour ? apiDrone.pricePerHour * 8 : 4500),
        securityDeposit: apiDrone.securityDeposit || 5000,
        image: apiDrone.image,
        category: apiDrone.category || 'Aerial Cinematography',
        status: apiDrone.status || 'available',
        shopName: apiDrone.shopName || (apiDrone.ownerId?.name ? `${apiDrone.ownerId.name}'s Shop` : 'SkyRent Bengaluru')
      }
    }
    return dronesData.find((d) => String(d.id) === String(id) || d._id === id)
  }, [id, apiDrone])

  const drone = useMemo(() => {
    return getEnrichedDroneDetails(rawDrone)
  }, [rawDrone])

  // State 1: Active Step (1 to 6)
  const [currentStep, setCurrentStep] = useState(1)

  // Default dates helper (Tomorrow to 3 days after)
  const defaultDates = useMemo(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const end = new Date(tomorrow)
    end.setDate(end.getDate() + 2) // 3 days default

    return {
      start: tomorrow.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    }
  }, [])

  // State 2: Selected Dates
  const [startDate, setStartDate] = useState(defaultDates.start)
  const [endDate, setEndDate] = useState(defaultDates.end)

  // State 3: Selected Add-ons IDs
  const [selectedAddons, setSelectedAddons] = useState(['addon-battery'])

  // State 4: Customer Details Form State
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    purpose: 'Aerial Photography',
    experience: 'Intermediate (10+ hours)'
  })

  // Pre-fill user profile info if signed in
  useEffect(() => {
    const user = authService.getStoredUser()
    if (user) {
      setCustomerInfo((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }))
    }
  }, [])

  // State 5: Uploaded Documents State
  const [documents, setDocuments] = useState({})

  // State 6: Completed Booking Confirmation Payload
  const [submittedBooking, setSubmittedBooking] = useState(null)

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return 1
    const diffTime = end.getTime() - start.getTime()
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1)
  }, [startDate, endDate])

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  // Handle final booking submission
  const handleSubmitBooking = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    // Generate fallback booking ID (e.g. DRN-8492)
    const randomId = `DRN-${Math.floor(1000 + Math.random() * 9000)}`
    
    // Calculate subtotal for payload
    const baseRentalCost = (drone?.pricePerDay || 0) * rentalDays
    const addonsTotal = selectedAddons.length * 500 // simplified calculation
    const rentalSubtotal = baseRentalCost + addonsTotal

    try {
      // Connect to backend API: POST /api/bookings
      const res = await bookingService.createBooking({
        droneId: drone._id || drone.id,
        startDate,
        endDate,
        selectedAddons,
        customerInfo,
        notes: customerInfo.purpose || ''
      })

      const created = res.data?.booking || res.data || res

      const bookingPayload = {
        bookingId: created.bookingNumber || created.bookingId || randomId,
        droneId: drone.id,
        startDate,
        endDate,
        rentalDays: created.durationDays || rentalDays,
        selectedAddons,
        customerInfo,
        documents,
        rentalSubtotal: created.totalPrice || rentalSubtotal,
        securityDeposit: created.securityDeposit || drone.securityDeposit,
        status: 'Pending Shop Approval',
        submittedAt: created.createdAt || new Date().toISOString()
      }

      setSubmittedBooking(bookingPayload)
      setCurrentStep(6)
    } catch (err) {
      console.warn('Booking API returned error, proceeding with frontend reservation fallback:', err.message)
      const bookingPayload = {
        bookingId: randomId,
        droneId: drone.id,
        startDate,
        endDate,
        rentalDays,
        selectedAddons,
        customerInfo,
        documents,
        rentalSubtotal,
        securityDeposit: drone.securityDeposit,
        status: 'Pending Shop Approval',
        submittedAt: new Date().toISOString(),
        warning: err.message
      }

      setSubmittedBooking(bookingPayload)
      setCurrentStep(6)
    } finally {
      setIsSubmitting(false)
    }
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
            The drone you are trying to book does not exist or is currently unlisted.
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

  return (
    <div className="space-y-8 pb-24 pt-4">
      
      {/* BREADCRUMB HEADER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/drones" className="hover:text-blue-600 transition-colors">
            Drones
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/drones/${drone.id}`} className="hover:text-blue-600 transition-colors">
            {drone.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">
            Booking Reservation
          </span>
        </nav>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* STEPPER PROGRESS INDICATOR */}
        <BookingSteps currentStep={currentStep} steps={STEPS} />

        {/* STEP CONTENT SWITCHER */}
        {currentStep === 1 && (
          <DateSelector
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onNext={() => setCurrentStep(2)}
            drone={drone}
          />
        )}

        {currentStep === 2 && (
          <RentalOptions
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
            rentalDays={rentalDays}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <CustomerForm
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <DocumentUpload
            documents={documents}
            setDocuments={setDocuments}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <BookingSummary
            drone={drone}
            startDate={startDate}
            endDate={endDate}
            rentalDays={rentalDays}
            selectedAddons={selectedAddons}
            customerInfo={customerInfo}
            documents={documents}
            onSubmitBooking={handleSubmitBooking}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && (
          <BookingConfirmation
            bookingData={submittedBooking}
            drone={drone}
          />
        )}

      </div>

    </div>
  )
}

export default BookingPage
