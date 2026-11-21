import React, { useState } from 'react'
import { FileText, ShieldCheck, CheckCircle2, XCircle, Download } from 'lucide-react'

function SuperAdminDocuments() {
  const [activeTab, setActiveTab] = useState('Shop Documents') // Shop Documents, Customer Documents, Drone Documents
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const [documents, setDocuments] = useState([
    { id: 'doc-1', title: 'SkyRent Operating Clearance', type: 'Shop Documents', entity: 'SkyRent Bengaluru', file: 'skyrent_permit.pdf', date: '2026-08-10', status: 'Verified' },
    { id: 'doc-2', title: 'AeroTech Commercial Trade License', type: 'Shop Documents', entity: 'AeroTech Mumbai', file: 'aerotech_gst.pdf', date: '2026-08-15', status: 'Verified' },
    { id: 'doc-3', title: 'GeoSpatial Delhi Trade Permit', type: 'Shop Documents', entity: 'GeoSpatial Fleet Delhi', file: 'geodelhi_permit.pdf', date: '2026-08-20', status: 'Pending' },
    { id: 'doc-4', title: 'Aadhaar Card Photo Clearance', type: 'Customer Documents', entity: 'Rahul Sharma', file: 'rahul_aadhaar.pdf', date: '2026-08-28', status: 'Verified' },
    { id: 'doc-5', title: 'DGCA Remote Pilot License (RPC)', type: 'Customer Documents', entity: 'Vikram Malhotra', file: 'vikram_rpc.pdf', date: '2026-08-30', status: 'Pending' }
  ])

  const filteredDocs = documents.filter((d) => d.type === activeTab)

  const handleUpdateStatus = (id, newStatus) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    )
    showToast(`Document #${id} status changed to '${newStatus}'.`)
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Platform Global Document Verification Desk
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Audit store trade permits, customer identification clearances, and drone insurance policies.
        </p>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        {['Shop Documents', 'Customer Documents', 'Drone Documents'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-4">Document Title</th>
                <th className="py-4 px-4">Associated Entity</th>
                <th className="py-4 px-4">File Name</th>
                <th className="py-4 px-4">Uploaded Date</th>
                <th className="py-4 px-4">Clearance Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{doc.title}</td>
                  <td className="py-3.5 px-4 font-bold text-purple-700">{doc.entity}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{doc.file}</td>
                  <td className="py-3.5 px-4 text-slate-500">{doc.date}</td>
                  
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {doc.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-1">
                    {doc.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(doc.id, 'Verified')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(doc.id, 'Rejected')}
                          className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => alert(`Downloading file: ${doc.file}`)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                      >
                        Download
                      </button>
                    )}
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

export default SuperAdminDocuments
