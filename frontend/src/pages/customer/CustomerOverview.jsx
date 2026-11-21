import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Navigation, Calendar, CheckCircle2, Heart, ArrowRight, Radio, 
  Clock, ShieldCheck, CreditCard, Sparkles, TrendingUp, Loader2 
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/dashboard/StatCard'
import RentalCard from '../../components/dashboard/RentalCard'
import RentalDetailsModal from '../../components/dashboard/RentalDetailsModal'
import DroneCard from '../../components/DroneCard'
import analyticsService from '../../services/analyticsService'
import bookingService from '../../services/bookingService'
import droneService from '../../services/droneService'

// Mock Data imports (Fallback)
import { customerRentals } from '../../data/rentals'
import { customerBookings, monthlyRentalChartData } from '../../data/bookings'
import { dronesData } from '../../data/drones'

function CustomerOverview() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [selectedRentalForModal, setSelectedRentalForModal] = useState(null)
  const [dbStats, setDbStats] = useState(null)
  const [liveBookings, setLiveBookings] = useState([])
  const [liveDrones, setLiveDrones] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    Promise.allSettled([
      analyticsService.getDashboardAnalytics(),
      bookingService.getBookings(),
      droneService.getDrones({ limit: 4 })
    ]).then(([analyticsRes, bookingsRes, dronesRes]) => {
      if (!isMounted) return

      if (analyticsRes.status === 'fulfilled' && analyticsRes.value) {
        setDbStats(analyticsRes.value.data || analyticsRes.value)
      }
      if (bookingsRes.status === 'fulfilled' && bookingsRes.value) {
        const list = bookingsRes.value.data?.bookings || bookingsRes.value.bookings || []
        if (list.length > 0) setLiveBookings(list)
      }
      if (dronesRes.status === 'fulfilled' && dronesRes.value) {
        const dList = dronesRes.value.data?.drones || dronesRes.value.drones || []
        if (dList.length > 0) setLiveDrones(dList)
      }
    }).finally(() => {
      if (isMounted) setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  // Filter active rentals
  const activeRentals = customerRentals.filter((r) => r.status === 'Active')
  const upcomingBookings = customerBookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending')

  // Real Database Metrics Computation
  const activeCount = dbStats?.activeRentalsCount ?? (liveBookings.length > 0 ? liveBookings.filter(b => b.bookingStatus === 'active').length : activeRentals.length)
  const upcomingCount = dbStats?.upcomingBookingsCount ?? (liveBookings.length > 0 ? liveBookings.filter(b => b.bookingStatus === 'approved' || b.bookingStatus === 'pending').length : upcomingBookings.length)
  const completedCount = dbStats?.completedRentalsCount ?? (liveBookings.length > 0 ? liveBookings.filter(b => b.bookingStatus === 'completed').length : 12)

  // Recommended 4 drones (live database first, fallback to static)
  const recommendedDrones = liveDrones.length > 0 ? liveDrones : dronesData.slice(0, 4)

  // Recent Activity Timeline items
  const recentActivities = [
    { id: 1, title: 'Booking Request Confirmed', desc: 'Mavic 3 Pro rental (DRN-8492) confirmed by SkyRent Bengaluru', time: '10 mins ago', type: 'confirmed' },
    { id: 2, title: 'Document Verified', desc: 'Aadhaar Card identity proof verified by compliance team', time: '3 hours ago', type: 'document' },
    { id: 3, title: 'Rental Mission Started', desc: 'Mini 4 Pro rental (DRN-7320) picked up at Mumbai hub', time: 'Yesterday', type: 'started' },
    { id: 4, title: 'Payment Recorded', desc: '₹10,000 payment received for booking DRN-8492', time: '2 days ago', type: 'payment' },
    { id: 5, title: 'Security Deposit Refunded', desc: '₹15,000 deposit refunded for returned Phantom 4 RTK', time: '5 days ago', type: 'refund' }
  ]

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'Confirmed': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-300'
      default: return 'bg-rose-100 text-rose-800 border-rose-300'
    }
  }

  return (
    <div className="space-y-8">
      
      {/* 1. WELCOME BANNER CARD */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-xs font-bold px-3.5 py-1 rounded-full border border-blue-400/30">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Customer Command Center</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Welcome back, {currentUser?.name || 'Kartikey'}!
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Manage your active drone rentals, upcoming bookings, verified documents, and live flight telemetry tracking from one central portal.
          </p>

          <div className="pt-2">
            <Link
              to="/drones"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-lg transition-all cursor-pointer"
            >
              <span>Explore Drones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Background glow graphics */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. STATISTICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Rentals"
          value={String(activeCount)}
          label={`${activeCount} drone${activeCount === 1 ? '' : 's'} currently dispatched`}
          icon={Radio}
          color="emerald"
          trend="Live"
        />
        <StatCard
          title="Upcoming Bookings"
          value={String(upcomingCount)}
          label="Confirmed & Pending reservations"
          icon={Calendar}
          color="blue"
          trend="Scheduled"
        />
        <StatCard
          title="Completed Rentals"
          value={String(completedCount)}
          label="100% successful return rate"
          icon={CheckCircle2}
          color="purple"
          trend="Total"
        />
        <StatCard
          title="Wishlist Items"
          value="8"
          label="Saved for future flights"
          icon={Heart}
          color="rose"
          trend="Booked"
        />
      </div>

      {/* 3. ACTIVE RENTALS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Active Dispatched Rentals
            </h2>
            <p className="text-xs text-slate-500">
              Currently rented equipment ready for immediate flight tracking.
            </p>
          </div>

          <Link to="/user/rentals" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>View All Rentals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {activeRentals.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              onViewDetails={(r) => setSelectedRentalForModal(r)}
              onTrackDrone={(r) => navigate('/user/tracking')}
            />
          ))}
        </div>
      </div>

      {/* 4. TWO-COLUMN LAYOUT: UPCOMING BOOKINGS & RENTAL ACTIVITY CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* UPCOMING BOOKINGS (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Upcoming Bookings
            </h3>
            <Link to="/user/bookings" className="text-xs font-bold text-blue-600 hover:underline">
              View History
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Drone</th>
                  <th className="py-3 px-3">Start Date</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {upcomingBookings.slice(0, 4).map((b) => (
                  <tr key={b.bookingId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-blue-600">{b.bookingId}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{b.droneName}</td>
                    <td className="py-3 px-3 text-slate-600">{b.startDate}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">₹{b.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MONTHLY RENTAL ACTIVITY RECHARTS CHART (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Rental Activity
              </h3>
              <p className="text-xs text-slate-500">Monthly rental missions breakdown</p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRentalChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(val) => [`${val} Rentals`, 'Volume']}
                />
                <Bar dataKey="rentals" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5. RECENT ACTIVITY TIMELINE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Recent Rental Activity Timeline
        </h3>

        <div className="space-y-4 relative pl-4 border-l-2 border-slate-200 ml-2">
          {recentActivities.map((act) => (
            <div key={act.id} className="relative pl-6 space-y-1">
              <span className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 text-sm">{act.title}</span>
                <span className="text-slate-400 font-medium">{act.time}</span>
              </div>
              <p className="text-xs text-slate-600">{act.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. RECOMMENDED DRONES SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Recommended for Your Next Mission
            </h2>
            <p className="text-xs text-slate-500">Handpicked models matching your rental history.</p>
          </div>

          <Link to="/drones" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Explore More Drones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedDrones.map((drone) => (
            <DroneCard key={drone.id} drone={drone} />
          ))}
        </div>
      </div>

      {/* Modal for Details */}
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

export default CustomerOverview
