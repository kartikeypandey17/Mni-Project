import React, { useState, useEffect, useMemo } from 'react'
import { Bell, CheckCircle2, Trash2, Sparkles, Plus, Building2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  deleteNotification, 
  clearAllNotifications, 
  addNotification 
} from '../../utils/notificationUtils'
import NotificationItem from '../../components/notifications/NotificationItem'
import NotificationFilters from '../../components/notifications/NotificationFilters'
import NotificationEmptyState from '../../components/notifications/NotificationEmptyState'
import alertService from '../../services/alertService'

/*
  DATA SECURITY & MULTI-TENANT RULE:
  Shop Owner notifications must be filtered by shopId === currentUser.shopId.
  Shop Owner must NEVER see another shop's notifications.
*/

function OwnerNotifications() {
  const { currentUser } = useAuth()
  const shopId = currentUser?.shopId || 101

  const [notifications, setNotifications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [showClearModal, setShowClearModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const loadData = async () => {
    const list = getNotifications('shop-owner', 2, shopId)
    try {
      const res = await alertService.getAlerts()
      const apiAlerts = res.data?.alerts || res.alerts || []
      if (apiAlerts && apiAlerts.length > 0) {
        const mappedAlerts = apiAlerts.map((a) => ({
          id: a._id || a.id,
          title: `${a.alertType?.toUpperCase() || 'FLEET'} Notification`,
          message: a.message,
          time: a.createdAt ? new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
          status: a.isRead ? 'read' : 'unread',
          type: a.alertType === 'emergency' ? 'emergency' : 'alert',
          role: 'shop-owner',
          shopId
        }))
        const existingIds = new Set(list.map((n) => String(n.id)))
        const newOnes = mappedAlerts.filter((m) => !existingIds.has(String(m.id)))
        setNotifications([...newOnes, ...list])
        return
      }
    } catch (e) {
      console.warn('Alerts notifications sync note:', e.message)
    }
    setNotifications(list)
  }

  useEffect(() => {
    loadData()
  }, [shopId])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.type.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'All' || n.status === statusFilter
      const matchesType = typeFilter === 'All' || n.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [notifications, searchTerm, statusFilter, typeFilter])

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id)
    loadData()
    showToast('Notification marked as read.')
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead('shop-owner', 2, shopId)
    loadData()
    showToast('All shop notifications marked as read.')
  }

  const handleDelete = (id) => {
    deleteNotification(id)
    loadData()
    showToast('Notification deleted.')
  }

  const handleClearAll = () => {
    clearAllNotifications('shop-owner', 2, shopId)
    loadData()
    setShowClearModal(false)
    showToast('All shop notifications cleared.')
  }

  const handleSimulateNewNotification = () => {
    addNotification({
      userId: 2,
      shopId,
      role: 'shop-owner',
      type: 'booking',
      title: 'New Customer Booking Notification 🚁',
      message: 'A new reservation was placed for your DJI Inspire 3 Cinema 8K.',
      priority: 'important'
    })
    loadData()
    showToast('Simulated shop notification pushed!')
  }

  const unreadCount = notifications.filter((n) => n.status === 'unread').length

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl border border-purple-500 shadow-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECURITY BANNER */}
      <div className="bg-purple-950 text-purple-200 p-3 rounded-2xl border border-purple-800 text-[11px] font-mono flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>🏢 <strong>SHOP OWNER INBOX:</strong> Scoped for storefront #{shopId} ({currentUser?.shopName || "SkyRent Hub"}).</span>
        </div>
        <span className="text-purple-400 hidden sm:inline">{unreadCount} Unread Alerts</span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shop Notifications
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            New customer bookings, payments received, drone return reminders, and tracking alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSimulateNewNotification}
            className="inline-flex items-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-extrabold px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Push</span>
          </button>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearModal(true)}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <NotificationFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
      />

      {/* LIST */}
      {filteredNotifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* CLEAR MODAL */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">Clear all shop notifications?</h3>
            <p className="text-xs text-slate-500">
              This action cannot be undone. All notification logs for your storefront will be cleared.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all shadow-md cursor-pointer"
              >
                Clear Notifications
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default OwnerNotifications
