import React from 'react'
import { Search, Filter, Radio, Bell } from 'lucide-react'

/**
 * NotificationFilters Component
 * Filter bar for notification status, type, and search queries.
 */
function NotificationFilters({
  searchTerm = '',
  onSearchChange,
  statusFilter = 'All',
  onStatusChange,
  typeFilter = 'All',
  onTypeChange
}) {
  const typesList = ['All', 'booking', 'payment', 'rental', 'tracking', 'document', 'system', 'promotion']

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notifications by keyword, title, or ID..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all outline-hidden"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        
        {/* Read / Unread Status Filter */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
          <Bell className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer w-full"
          >
            <option value="All">All Statuses</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer w-full uppercase text-[11px]"
          >
            {typesList.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All Types' : t.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  )
}

export default NotificationFilters
