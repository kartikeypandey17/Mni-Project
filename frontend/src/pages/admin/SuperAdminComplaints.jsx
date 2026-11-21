import React, { useState, useMemo } from 'react'
import { AlertCircle, Search, CheckCircle2, ShieldAlert, Eye } from 'lucide-react'
import ComplaintDetailsModal from '../../components/admin/ComplaintDetailsModal'
import { initialAdminComplaints } from '../../data/adminData'

function SuperAdminComplaints() {
  const [complaintsList, setComplaintsList] = useState(initialAdminComplaints)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedComplaintModal, setSelectedComplaintModal] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const filteredComplaints = useMemo(() => {
    return complaintsList
      .filter((c) => {
        if (!searchTerm.trim()) return true
        const query = searchTerm.toLowerCase()
        return (
          c.id.toLowerCase().includes(query) ||
          c.customerName.toLowerCase().includes(query) ||
          c.shopName.toLowerCase().includes(query) ||
          c.subject.toLowerCase().includes(query)
        )
      })
      .filter((c) => {
        if (statusFilter === 'All') return true
        return c.status.toLowerCase() === statusFilter.toLowerCase()
      })
  }, [complaintsList, searchTerm, statusFilter])

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-rose-100 text-rose-800 border-rose-300 font-black animate-pulse'
      case 'High': return 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-300 font-semibold'
      default: return 'bg-slate-100 text-slate-700 border-slate-300 font-medium'
    }
  }

  const handleResolveComplaint = (id, note) => {
    setComplaintsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Resolved' } : c))
    )
    showToast(`Complaint #${id} marked as Resolved. Admin note saved.`)
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Platform Customer Complaints Desk ({filteredComplaints.length})
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Resolve escalated dispute tickets, equipment issues, and deposit refund claims.
        </p>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Search by Ticket ID, Customer, Shop, Subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-800 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl py-2 px-3 text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <option value="All">All Ticket Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* COMPLAINTS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-4">Ticket ID</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Shop</th>
                <th className="py-4 px-4">Subject</th>
                <th className="py-4 px-4">Priority</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-600">{c.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{c.customerName}</td>
                  <td className="py-3.5 px-4 font-bold text-purple-700">{c.shopName}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-semibold">{c.subject}</td>
                  
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${getPriorityStyle(c.priority)}`}>
                      {c.priority}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900">{c.status}</td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedComplaintModal(c)}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complaint Modal */}
      {selectedComplaintModal && (
        <ComplaintDetailsModal
          complaint={selectedComplaintModal}
          onClose={() => setSelectedComplaintModal(null)}
          onResolveComplaint={handleResolveComplaint}
        />
      )}

    </div>
  )
}

export default SuperAdminComplaints
