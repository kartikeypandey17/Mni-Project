import React from 'react'

/**
 * ReportTable Component
 * Generic formatted data table for reports.
 */
function ReportTable({ headers = [], rows = [] }) {
  if (!rows || !rows.length) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-400">
        No report records match the selected parameters.
      </div>
    )
  }

  // Derive headers from first row if headers prop is empty
  const tableHeaders = headers.length > 0 ? headers : Object.keys(rows[0])

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
          <tr>
            {tableHeaders.map((header, idx) => (
              <th key={idx} className="py-3 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-slate-700 bg-white">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
              {tableHeaders.map((header, colIdx) => {
                const val = row[header] !== undefined ? row[header] : row[colIdx]
                const isAmount = typeof val === 'string' && val.includes('₹')
                const isMono = isAmount || (typeof val === 'string' && (val.includes('DRN-') || val.includes('RNT-') || val.includes('PAY-')))

                return (
                  <td
                    key={colIdx}
                    className={`py-3 px-4 ${isMono ? 'font-mono font-bold text-slate-900' : ''}`}
                  >
                    {val}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTable
