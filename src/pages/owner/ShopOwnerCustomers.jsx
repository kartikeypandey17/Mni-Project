import React, { useState, useMemo } from 'react'
import { Users, Search, Eye, ShieldCheck, CreditCard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import CustomerDetailsModal from '../../components/owner/CustomerDetailsModal'
import { initialOwnerCustomers } from '../../data/ownerData'

function ShopOwnerCustomers() {
  const { currentUser } = useAuth()
  const shopId = currentUser?.shopId || 101

  // Filter customers belonging to THIS shop
  const shopCustomers = useMemo(() => {
    return initialOwnerCustomers.filter((c) => c.shopId === shopId)
  }, [shopId])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomerModal, setSelectedCustomerModal] = useState(null)

  const filteredCustomers = useMemo(() => {
    return shopCustomers.filter((c) => {
      if (!searchTerm.trim()) return true
      const query = searchTerm.toLowerCase()
      return (
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query)
      )
    })
  }, [shopCustomers, searchTerm])

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Shop Customer Directory ({filteredCustomers.length})
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Customers who have rented equipment or requested bookings from your shop.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search customer by Name, Email, Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 focus:bg-white rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-800 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* CUSTOMERS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Phone</th>
                <th className="py-4 px-4">Total Rentals</th>
                <th className="py-4 px-4">Active Rental</th>
                <th className="py-4 px-4">Total Spent</th>
                <th className="py-4 px-4">Last Rental</th>
                <th className="py-4 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {c.id}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">{c.email}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.phone}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{c.totalRentals} rentals</td>
                    
                    <td className="py-3.5 px-4">
                      {c.activeRental ? (
                        <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-200">
                          {c.activeRental}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">None</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-slate-500">{c.lastRentalDate}</td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomerModal(c)}
                        className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 italic">
                    No customer records found matching search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal */}
      {selectedCustomerModal && (
        <CustomerDetailsModal
          customer={selectedCustomerModal}
          onClose={() => setSelectedCustomerModal(null)}
        />
      )}

    </div>
  )
}

export default ShopOwnerCustomers
