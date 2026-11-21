import React from 'react'
import { Printer, Download, X, Navigation, Building2, CheckCircle2, ShieldCheck, FileText } from 'lucide-react'
import { exportToCSV } from '../../utils/exportCsv'
import { printReport } from '../../utils/printReport'
import ReportTable from './ReportTable'
import ReportSummary from './ReportSummary'

/**
 * ReportPreview Component
 * Displays printable document modal preview of generated analytics reports.
 */
function ReportPreview({
  isOpen,
  onClose,
  reportTitle = "DroneHub Executive Analytics Report",
  dateRange = "This Month",
  generatedDate = new Date().toLocaleDateString(),
  summaryCards = [],
  tableHeaders = [],
  tableRows = []
}) {
  if (!isOpen) return null

  const handleDownloadCSV = () => {
    exportToCSV(tableRows, `${reportTitle.toLowerCase().replace(/\s+/g, '-')}.csv`)
  }

  const handlePrint = () => {
    printReport(reportTitle)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header Bar (Hidden during printing) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 print:hidden">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <FileText className="w-3.5 h-3.5" />
            Document Preview Mode
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download CSV</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT DOCUMENT BODY */}
        <div className="space-y-6">
          
          {/* BRAND HEADER */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
                <Navigation className="w-6 h-6 transform rotate-45" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  DRONE<span className="text-blue-600">HUB</span>
                </span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Analytics & Reports Module
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <div className="font-mono font-bold text-slate-800">{generatedDate}</div>
              <div className="text-slate-400 font-medium">Date Range: <strong className="text-slate-700">{dateRange}</strong></div>
            </div>
          </div>

          {/* REPORT METADATA TITLE */}
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">{reportTitle}</h2>
            <p className="text-xs text-slate-500">
              Verified platform analytics report compiled for multi-tenant monitoring.
            </p>
          </div>

          {/* SUMMARY METRICS GRID */}
          {summaryCards && summaryCards.length > 0 && (
            <ReportSummary cards={summaryCards} />
          )}

          {/* MAIN DATA TABLE */}
          <ReportTable headers={tableHeaders} rows={tableRows} />

          {/* DOCUMENT FOOTER */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
            <div>DroneHub Analytics & Reports Module • System Verified</div>
            <div>Confidential & Proprietary Document</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ReportPreview
