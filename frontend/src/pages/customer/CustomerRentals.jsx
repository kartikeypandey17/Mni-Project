import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigation, Calendar, Filter, Download, Eye, Radio, Sparkles, Loader2 } from 'lucide-react'
import RentalCard from '../../components/dashboard/RentalCard'
import RentalDetailsModal from '../../components/dashboard/RentalDetailsModal'
import { customerRentals } from '../../data/rentals'
import bookingService from '../../services/bookingService'

function CustomerRentals() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All') // All, Active, Upcoming, Completed, Cancelled
  const [selectedRentalForModal, setSelectedRentalForModal] = useState(null)
  const [liveRentals, setLiveRentals] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    bookingService
      .getBookings()
      .then((res) => {
        if (!isMounted) return
        const list = res.data?.bookings || res.bookings || []
        if (list && list.length > 0) {
          const mapped = list.map((b) => ({
            id: b._id || b.id,
            bookingId: b.bookingNumber || b.bookingId || `DRN-${b._id?.slice(-4)}`,
            droneName: b.droneName || b.droneId?.name || 'Commercial Drone',
            droneModel: b.droneId?.model || 'Enterprise Quadcopter',
            droneImage: b.droneId?.image || 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
            shopName: b.shopName || (b.ownerId?.name ? `${b.ownerId.name}'s Shop` : 'SkyRent Bengaluru'),
            startDate: typeof b.startDate === 'string' ? b.startDate.split('T')[0] : new Date(b.startDate).toISOString().split('T')[0],
            endDate: typeof b.endDate === 'string' ? b.endDate.split('T')[0] : new Date(b.endDate).toISOString().split('T')[0],
            totalAmount: b.totalPrice || b.amount || 0,
            status:
              b.bookingStatus === 'active'
                ? 'Active'
                : b.bookingStatus === 'completed'
                ? 'Completed'
                : b.bookingStatus === 'approved' || b.bookingStatus === 'pending'
                ? 'Upcoming'
                : 'Cancelled',
            batteryLevel: b.droneId?.batteryLevel || 85
          }))
          setLiveRentals(mapped)
        }
      })
      .catch((err) => {
        console.warn('Rentals API fallback active:', err.message)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const tabs = ['All', 'Active', 'Upcoming', 'Completed', 'Cancelled']

  const allRentals = useMemo(() => {
    if (liveRentals.length > 0) {
      const liveIds = new Set(liveRentals.map((r) => r.bookingId))
      const extraDemo = customerRentals.filter((r) => !liveIds.has(r.bookingId))
      return [...liveRentals, ...extraDemo]
    }
    return customerRentals
  }, [liveRentals])

  const filteredRentals = useMemo(() => {
    if (activeTab === 'All') return allRentals
    return allRentals.filter((r) => r.status.toLowerCase() === activeTab.toLowerCase())
  }, [activeTab, allRentals])

  const handleDownloadReceipt = (rental) => {
    alert(`Downloading Official Tax Invoice & Receipt for Booking ID: ${rental.bookingId}\nAmount: ₹${rental.totalAmount}\nShop: ${rental.shopName}`)
  }

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Rentals
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Manage your ongoing active flights, scheduled dispatches, and completed mission history.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-bold">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab} Rentals {tab === 'All' ? `(${customerRentals.length})` : `(${customerRentals.filter(r => r.status.toLowerCase() === tab.toLowerCase()).length})`}
          </button>
        ))}
      </div>

      {/* Rental Cards List */}
      {filteredRentals.length > 0 ? (
        <div className="space-y-4">
          {filteredRentals.map((rental) => (
            <div key={rental.id} className="relative">
              <RentalCard
                rental={rental}
                onViewDetails={(r) => setSelectedRentalForModal(r)}
                onTrackDrone={() => navigate('/user/tracking')}
              />

              {/* Extra Download Receipt Bar Action */}
              <div className="absolute top-4 right-4 hidden md:block">
                <button
                  onClick={() => handleDownloadReceipt(rental)}
                  className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  title="Download Receipt"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Navigation className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No {activeTab} Rentals Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any {activeTab.toLowerCase()} rentals in your account at the moment.
          </p>
        </div>
      )}

      {/* Details Modal */}
      {selectedRentalForModal && (
        <RentalDetailsModal
          rental={selectedRentalForModal}
          onClose={() => setSelectedRentalForModal(null)}
          onTrackClick={() => navigate('/user/tracking')}
        />
      )}

    </div>
  )
}

export default CustomerRentals
