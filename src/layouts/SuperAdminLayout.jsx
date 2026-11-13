import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import SuperAdminSidebar from '../components/admin/SuperAdminSidebar'
import SuperAdminHeader from '../components/admin/SuperAdminHeader'

function SuperAdminLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <ProtectedRoute allowedRoles={['super-admin']}>
      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
        
        {/* Sidebar */}
        <SuperAdminSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          
          <SuperAdminHeader
            onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
            {children || <Outlet />}
          </main>

        </div>

      </div>
    </ProtectedRoute>
  )
}

export default SuperAdminLayout
