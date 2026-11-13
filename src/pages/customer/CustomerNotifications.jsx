import React, { useState, useEffect, useMemo } from 'react'
import { Bell, CheckCircle2, Trash2, ShieldAlert, Sparkles, X, Plus } from 'lucide-react'
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
  Customer notifications must be filtered by userId === currentUser.id.
  Customer must NEVER see another customer's notifications.
*/

function CustomerNotifications() {
  const { currentUser } = useAuth()
  const userId = currentUser?.id || 3

  const [notifications, setNotifications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [showClearModal, setShowClearModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const loadData = async () => {
    const list = getNotifications('customer', userId, 101)
    try {
      const res = await alertService.getAlerts()
      const apiAlerts = res.data?.alerts || res.alerts || []
      if (apiAlerts && apiAlerts.length > 0) {
        const mappedAlerts = apiAlerts.map((a) => ({
          id: a._id || a.id,
          title: `${a.alertType?.toUpperCase() || 'SYSTEM'} Alert`,
          message: a.message,
          time: a.createdAt ? new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
          status: a.isRead ? 'read' : 'unread',
          type: a.alertType === 'emergency' ? 'emergency' : 'alert',
          role: 'customer',
          userId
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
  }, [userId])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Filtered Notifications list
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
    markAllNotificationsAsRead('customer', userId, 101)
    loadData()
    showToast('All notifications marked as read.')
  }

  const handleDelete = (id) => {
    deleteNotification(id)
    loadData()
    showToast('Notification deleted.')
  }

  const handleClearAll = () => {
    clearAllNotifications('customer', userId, 101)
    loadData()
    setShowClearModal(false)
    showToast('All notifications cleared.')
  }

  // Simulated Push Notification Demo Trigger
  const handleSimulateNewNotification = () => {
    addNotification({
      userId,
      shopId: 101,
      role: 'customer',
      type: 'booking',
      title: 'Demo Simulated Notification 🔔',
      message: 'New live rental update pushed via frontend event loop.',
      priority: 'important'
    })
    loadData()
    showToast('Simulated new notification pushed!')
  }

  const unreadCount = notifications.filter((n) => n.status === 'unread').length

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* TOAST BANNER */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl border border-blue-500 shadow-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECURITY BANNER */}
      <div className="bg-slate-900 text-slate-300 p-3 rounded-2xl border border-slate-800 text-[11px] font-mono flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>🔒 <strong>CUSTOMER PRIVATE INBOX:</strong> Scoped for account #{userId} ({currentUser?.name || "Rahul Sharma"}).</span>
        </div>
        <span className="text-slate-500 hidden sm:inline">{unreadCount} Unread Alerts</span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Stay updated with your active drone rentals, booking updates, and tracking safety alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSimulateNewNotification}
            className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Push</span>
          </button>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md cursor-pointer"
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

      {/* FILTERS & SEARCH */}
      <NotificationFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
      />

      {/* NOTIFICATIONS LIST CONTAINER */}
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

      {/* CLEAR ALL CONFIRMATION MODAL */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">Clear all notifications?</h3>
            <p className="text-xs text-slate-500">
              This action cannot be undone. All notification logs will be cleared from your inbox.
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

export default CustomerNotifications
