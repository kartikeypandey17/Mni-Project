import React from 'react'
import { Download, Calendar, FileText, Sparkles, RefreshCw } from 'lucide-react'

/**
 * AnalyticsHeader Component
 * Page header containing title, description, date range selector, and export/generate report actions.
 */
function AnalyticsHeader({
  title = "Analytics Dashboard",
  subtitle = "Track performance metrics, revenue growth, and rental analytics.",
  dateRange = "This Month",
  onDateRangeChange,
  onExportCSV,
  onGenerateReport,
  isRefreshing = false,
  onRefresh
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-blue-600" />
            Live Analytics
          </span>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          {subtitle}
        </p>
      </div>

      {/* Control Actions Bar */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        
        {/* Date Range Selector */}
        {onDateRangeChange && (
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="bg-transparent focus:outline-hidden cursor-pointer text-slate-800 font-bold"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="This Year">This Year</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>
        )}

        {/* Refresh Data Button */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            title="Refresh analytics data"
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        )}

        {/* Export CSV Button */}
        {onExportCSV && (
          <button
            type="button"
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        )}

        {/* Generate Report Button */}
        {onGenerateReport && (
          <button
            type="button"
            onClick={onGenerateReport}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        )}

      </div>
    </div>
  )
}

export default AnalyticsHeader
