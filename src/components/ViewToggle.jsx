import React from 'react'
import { LayoutGrid, List } from 'lucide-react'

// ViewToggle Component: Toggle switch between Grid layout and List layout
function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-lg transition-all cursor-pointer ${
          viewMode === 'grid'
            ? 'bg-white text-blue-600 shadow-2xs font-bold'
            : 'text-slate-500 hover:text-slate-900'
        }`}
        aria-label="Grid View"
        title="Grid View"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>

      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-lg transition-all cursor-pointer ${
          viewMode === 'list'
            ? 'bg-white text-blue-600 shadow-2xs font-bold'
            : 'text-slate-500 hover:text-slate-900'
        }`}
        aria-label="List View"
        title="List View"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  )
}

export default ViewToggle
