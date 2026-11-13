import React from 'react'
import { FileText, Download, Eye, Calendar, Sparkles } from 'lucide-react'

/**
 * ReportCard Component
 * Displays a report template card with View Report & Download CSV actions.
 */
function ReportCard({
  title = "Report Title",
  description = "Detailed report summary and telemetry analytics breakdown.",
  type = "Executive Summary",
  date = "Updated Today",
  onView,
  onDownload
}) {
  return (
    <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-4 transition-all hover:shadow-md hover:border-blue-300 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {type}
          </span>
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {date}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 leading-snug">
          {title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={onView}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold py-2 px-3 rounded-xl transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Report</span>
        </button>

        <button
          type="button"
          onClick={onDownload}
          title="Download CSV"
          className="inline-flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ReportCard
