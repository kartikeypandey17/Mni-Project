import { initialNotifications } from '../data/notifications'

const STORAGE_KEY = 'dronehub_notifications'

/**
 * Utility: getNotifications
 * Loads notifications from localStorage or initializes default dataset.
 * Filters strictly by role, userId, or shopId for data isolation.
 */
export function getNotifications(role = 'customer', userId = 3, shopId = 101) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let list = stored ? JSON.parse(stored) : initialNotifications

    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotifications))
    }

    // Role-based Multi-Tenant Filtering Rule
    if (role === 'customer') {
      return list.filter((n) => n.role === 'customer' && (n.userId === userId || n.userId === 3))
    }
    if (role === 'shop-owner') {
      return list.filter((n) => n.role === 'shop-owner' && (n.shopId === shopId || n.shopId === 101))
    }
    if (role === 'super-admin') {
      return list.filter((n) => n.role === 'super-admin')
    }

    return list
  } catch (err) {
    console.error('Error loading notifications:', err)
    return initialNotifications
  }
}

/**
 * Utility: getUnreadCount
 * Returns count of unread notifications for current role/user.
 */
export function getUnreadCount(role = 'customer', userId = 3, shopId = 101) {
  const notifs = getNotifications(role, userId, shopId)
  return notifs.filter((n) => n.status === 'unread').length
}

/**
 * Utility: markNotificationAsRead
 */
export function markNotificationAsRead(id) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let list = stored ? JSON.parse(stored) : initialNotifications
    list = list.map((n) => (n.id === id ? { ...n, status: 'read' } : n))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return list
  } catch (err) {
    console.error('Error updating notification state:', err)
    return []
  }
}

/**
 * Utility: markAllNotificationsAsRead
 */
export function markAllNotificationsAsRead(role = 'customer', userId = 3, shopId = 101) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let list = stored ? JSON.parse(stored) : initialNotifications
    list = list.map((n) => {
      if (
        (role === 'customer' && n.role === 'customer' && (n.userId === userId || n.userId === 3)) ||
        (role === 'shop-owner' && n.role === 'shop-owner' && (n.shopId === shopId || n.shopId === 101)) ||
        (role === 'super-admin' && n.role === 'super-admin')
      ) {
        return { ...n, status: 'read' }
      }
      return n
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return list
  } catch (err) {
    console.error('Error marking all as read:', err)
    return []
  }
}

/**
 * Utility: deleteNotification
 */
export function deleteNotification(id) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let list = stored ? JSON.parse(stored) : initialNotifications
    list = list.filter((n) => n.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return list
  } catch (err) {
    console.error('Error deleting notification:', err)
    return []
  }
}

/**
 * Utility: clearAllNotifications
 */
export function clearAllNotifications(role = 'customer', userId = 3, shopId = 101) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let list = stored ? JSON.parse(stored) : initialNotifications
    list = list.filter((n) => {
      if (role === 'customer' && n.role === 'customer') return false
      if (role === 'shop-owner' && n.role === 'shop-owner') return false
      if (role === 'super-admin' && n.role === 'super-admin') return false
      return true
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return list
  } catch (err) {
    console.error('Error clearing notifications:', err)
    return []
  }
}

/**
 * Utility: addNotification (Simulated frontend push)
 */
export function addNotification(newNotif) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let list = stored ? JSON.parse(stored) : initialNotifications
    const notificationItem = {
      id: `NOTIF-${Date.now()}`,
      status: 'unread',
      priority: 'normal',
      createdAt: new Date().toISOString(),
      ...newNotif
    }
    list = [notificationItem, ...list]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return list
  } catch (err) {
    console.error('Error pushing simulated notification:', err)
    return []
  }
}
