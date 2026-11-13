import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ShopOwnerSidebar from '../components/owner/ShopOwnerSidebar'
import ShopOwnerHeader from '../components/owner/ShopOwnerHeader'

// Shop Owner Layout Component
function ShopOwnerLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <ProtectedRoute allowedRoles={['shop-owner']}>
      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
        
        {/* Sidebar */}
        <ShopOwnerSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          
          <ShopOwnerHeader
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

export default ShopOwnerLayout
