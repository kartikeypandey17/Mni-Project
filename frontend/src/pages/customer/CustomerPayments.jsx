import React from 'react'
import { CreditCard, DollarSign, RefreshCw, ShieldCheck, Download } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import { customerPayments, paymentSummaryStats } from '../../data/payments'

function CustomerPayments() {
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'Refunded': return 'bg-purple-100 text-purple-800 border-purple-300'
      default: return 'bg-slate-100 text-slate-700 border-slate-300'
    }
  }

  const handleDownloadInvoice = (txn) => {
    alert(`Downloading Official Payment Receipt for Transaction ID: ${txn.transactionId}\nBooking ID: ${txn.bookingId}\nAmount Paid: ₹${txn.amount}`)
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Payments & Billing History
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Track rental invoices, pending transactions, security deposit holds, and automated refunds.
        </p>
      </div>

      {/* SUMMARY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Rental Spent"
          value={`₹${paymentSummaryStats.totalSpent.toLocaleString('en-IN')}`}
          label="Lifetime transactions"
          icon={CreditCard}
          color="emerald"
        />
        <StatCard
          title="Pending Payments"
          value={`₹${paymentSummaryStats.pendingPayments.toLocaleString('en-IN')}`}
          label="Awaiting bank settlement"
          icon={DollarSign}
          color="amber"
        />
        <StatCard
          title="Security Deposits Held"
          value={`₹${paymentSummaryStats.securityDepositsHeld.toLocaleString('en-IN')}`}
          label="Active rental holds"
          icon={ShieldCheck}
          color="purple"
        />
        <StatCard
          title="Refunds Processed"
          value={`₹${paymentSummaryStats.refundsProcessed.toLocaleString('en-IN')}`}
          label="Returned deposits"
          icon={RefreshCw}
          color="blue"
        />
      </div>

      {/* PAYMENT TRANSACTION HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Transaction History Logs
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {customerPayments.length} Total Transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Drone</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Invoice</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {customerPayments.map((txn) => (
                <tr key={txn.transactionId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{txn.transactionId}</td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 font-bold">{txn.bookingId}</td>
                  <td className="py-3.5 px-4 text-slate-500">{txn.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{txn.droneName}</td>
                  <td className="py-3.5 px-4 text-slate-600">{txn.paymentMethod}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(txn.status)}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(txn)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
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

export default CustomerPayments
