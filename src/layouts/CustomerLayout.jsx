import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import CustomerSidebar from '../components/dashboard/CustomerSidebar'
import DashboardHeader from '../components/dashboard/DashboardHeader'

// Customer Dashboard Layout Component
function CustomerLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
        
        {/* Sidebar Navigation */}
        <CustomerSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Dashboard Header */}
          <DashboardHeader
            onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />

          {/* Dynamic Page Outlet */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
            {children || <Outlet />}
          </main>

        </div>

      </div>
    </ProtectedRoute>
  )
}

export default CustomerLayout
