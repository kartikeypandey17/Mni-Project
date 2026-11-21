const SETTINGS_KEY = 'dronehub_settings'
const THEME_KEY = 'dronehub_theme'
const NOTIF_PREF_KEY = 'dronehub_notification_preferences'

export const defaultSettings = {
  customer: {
    name: "Rahul Sharma",
    email: "user@dronehub.com",
    phone: "+91 98765 43210",
    address: "Indiranagar, Bengaluru, Karnataka",
    language: "English",
    currency: "INR (₹)",
    timeFormat: "12-Hour (AM/PM)",
    theme: "light",
    profileVisibility: "Public",
    activityVisibility: "Friends Only"
  },
  owner: {
    shopName: "SkyRent Bengaluru",
    ownerName: "SkyRent Owner",
    email: "owner@dronehub.com",
    phone: "+91 98765 12345",
    address: "MG Road, Indiranagar, Bengaluru, KA - 560038",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    openingTime: "09:00 AM",
    closingTime: "08:00 PM",
    minDuration: "1 Day",
    maxDuration: "30 Days",
    deposit: "₹5,000",
    lateFee: "₹500 / Hour",
    description: "Premier 4K Cinema & Survey Drone Rental Hub in Bengaluru."
  },
  admin: {
    platformName: "DroneHub Platform",
    supportEmail: "support@dronehub.com",
    supportPhone: "+91 80 1234 5678",
    currency: "INR (₹)",
    timeZone: "Asia/Kolkata (IST)",
    taxPercentage: "18",
    platformFee: "5",
    offlineTimeout: "5 Mins",
    maintenanceInterval: "150 Hours"
  }
}

export const defaultNotificationPreferences = {
  bookingUpdates: true,
  paymentUpdates: true,
  rentalUpdates: true,
  trackingAlerts: true,
  promotionalNotifications: false,
  emailNotifications: true,
  smsNotifications: false
}

/**
 * Utility: getSettings
 */
export function getSettings(role = 'customer') {
  try {
    const stored = localStorage.getItem(`${SETTINGS_KEY}_${role}`)
    return stored ? JSON.parse(stored) : defaultSettings[role] || defaultSettings.customer
  } catch (err) {
    console.error('Error fetching settings:', err)
    return defaultSettings[role] || defaultSettings.customer
  }
}

/**
 * Utility: saveSettings
 */
export function saveSettings(role = 'customer', newSettings = {}) {
  try {
    const current = getSettings(role)
    const updated = { ...current, ...newSettings }
    localStorage.setItem(`${SETTINGS_KEY}_${role}`, JSON.stringify(updated))
    return updated
  } catch (err) {
    console.error('Error saving settings:', err)
    return newSettings
  }
}

/**
 * Utility: getNotificationPreferences
 */
export function getNotificationPreferences() {
  try {
    const stored = localStorage.getItem(NOTIF_PREF_KEY)
    return stored ? JSON.parse(stored) : defaultNotificationPreferences
  } catch (err) {
    return defaultNotificationPreferences
  }
}

/**
 * Utility: saveNotificationPreferences
 */
export function saveNotificationPreferences(prefs) {
  try {
    localStorage.setItem(NOTIF_PREF_KEY, JSON.stringify(prefs))
    return prefs
  } catch (err) {
    console.error('Error saving notification preferences:', err)
    return prefs
  }
}

/**
 * Utility: getTheme / saveTheme
 */
export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light'
}

export function saveTheme(theme = 'light') {
  localStorage.setItem(THEME_KEY, theme)
  return theme
}

/**
 * Utility: resetSettings
 */
export function resetSettings(role = 'customer') {
  localStorage.removeItem(`${SETTINGS_KEY}_${role}`)
  localStorage.removeItem(NOTIF_PREF_KEY)
  return defaultSettings[role]
}
