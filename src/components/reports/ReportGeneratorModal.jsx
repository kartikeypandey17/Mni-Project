import React, { useState } from 'react'
import { FileText, Download, Printer, X, CheckCircle2, RefreshCw, Calendar, Layers } from 'lucide-react'
import { exportToCSV } from '../../utils/exportCsv'
import { printReport } from '../../utils/printReport'

/**
 * ReportGeneratorModal Component
 * Interactive modal wizard for generating customized analytics reports.
 */
function ReportGeneratorModal({ isOpen, onClose, defaultRole = 'admin', onReportGenerated }) {
  const [step, setStep] = useState(1)
  const [reportType, setReportType] = useState('Revenue')
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [format, setFormat] = useState('CSV')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handleGenerate = () => {
    setIsGenerating(true)
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false)
      setIsSuccess(true)

      // Execute format action
      if (format === 'CSV') {
        const dummyData = [
          { Report: `${reportType} Summary`, DateRange: dateRange, Generated: new Date().toLocaleDateString(), TotalRecords: 48, Status: "Verified" }
        ]
        exportToCSV(dummyData, `DroneHub-${reportType.toLowerCase()}-report.csv`)
      } else if (format === 'Print') {
        printReport(`${reportType} Executive Report`)
      }

      if (onReportGenerated) {
        onReportGenerated({ reportType, dateRange, format })
      }

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 1800)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Custom Report Generator</h3>
            <p className="text-xs text-slate-500">Configure parameters to compile executive analytics data</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Report Generated Successfully</h4>
            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
              {reportType} Report ({dateRange}) formatted as {format}
            </p>
          </div>
        ) : isGenerating ? (
          <div className="text-center py-10 space-y-4">
            <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
            <h4 className="text-base font-black text-slate-900">Compiling Report Dataset...</h4>
            <p className="text-xs text-slate-500">Aggregating telemetry logs, bookings, and financial metrics.</p>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Step 1 — Select Report Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Step 1 — Select Report Module
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
              >
                <option value="Revenue">Revenue & Gross Billing Report</option>
                <option value="Bookings">Booking & Rental History Report</option>
                <option value="Rentals">Drone Fleet Utilization Report</option>
                <option value="Customers">Customer Activity & Growth Report</option>
                <option value="Drones">Drone Catalog Performance Report</option>
                <option value="Payments">Payment Gateway Audit Report</option>
                {defaultRole === 'admin' && <option value="Shops">Partner Shops Performance Report</option>}
              </select>
            </div>

            {/* Step 2 — Select Date Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Step 2 — Select Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
              >
                <option value="Today">Today</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="This Year">This Year</option>
                <option value="Custom Range">Custom Range</option>
              </select>
            </div>

            {/* Step 3 — Select Output Format */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Step 3 — Output Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('CSV')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    format === 'CSV'
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>CSV Spreadsheet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('Print')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    format === 'Print'
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Printer className="w-4 h-4 text-purple-600" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default ReportGeneratorModal
