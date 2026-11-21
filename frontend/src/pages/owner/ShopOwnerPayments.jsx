import React, { useMemo } from 'react'
import { CreditCard, DollarSign, RefreshCw, ShieldCheck, Download } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import OwnerStatCard from '../../components/owner/OwnerStatCard'
import { initialOwnerPayments } from '../../data/ownerData'

function ShopOwnerPayments() {
  const { currentUser } = useAuth()
  const shopId = currentUser?.shopId || 101

  // Filter payments for THIS shop
  const shopPayments = useMemo(() => {
    return initialOwnerPayments.filter((p) => p.shopId === shopId)
  }, [shopId])

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-300'
      default: return 'bg-purple-100 text-purple-800 border-purple-300'
    }
  }

  const handleDownloadReceipt = (txn) => {
    alert(`Downloading Official Payment Statement for Transaction ID: ${txn.transactionId}\nCustomer: ${txn.customerName}\nAmount: ₹${txn.amount}`)
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Shop Revenue & Payment Invoices
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Overview of customer transactions, pending bank payouts, and security deposit returns.
        </p>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <OwnerStatCard
          title="Total Revenue"
          value="₹1,84,500"
          label="Lifetime earnings"
          icon={CreditCard}
          color="emerald"
        />
        <OwnerStatCard
          title="This Month"
          value="₹42,500"
          label="August payout"
          icon={DollarSign}
          color="purple"
        />
        <OwnerStatCard
          title="Pending Payments"
          value="₹11,400"
          label="Awaiting clearing"
          icon={RefreshCw}
          color="amber"
        />
        <OwnerStatCard
          title="Refunds"
          value="₹15,000"
          label="Processed deposits"
          icon={RefreshCw}
          color="blue"
        />
        <OwnerStatCard
          title="Security Deposits"
          value="₹20,000"
          label="Currently held"
          icon={ShieldCheck}
          color="indigo"
        />
      </div>

      {/* PAYMENTS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4 p-6">
        <h2 className="text-lg font-bold text-slate-900">
          Payment Transactions Log
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Drone</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {shopPayments.map((p) => (
                <tr key={p.transactionId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{p.transactionId}</td>
                  <td className="py-3.5 px-4 font-mono text-purple-600 font-bold">{p.bookingId}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{p.customerName}</td>
                  <td className="py-3.5 px-4 text-slate-800">{p.droneName}</td>
                  <td className="py-3.5 px-4 text-slate-500">{p.date}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.paymentMethod}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDownloadReceipt(p)}
                      className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                      title="Download Invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default ShopOwnerPayments
