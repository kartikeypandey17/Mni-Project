import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, CreditCard, Radio, FileText, Navigation, Star, 
  ShieldAlert, Settings, Sparkles, ShieldCheck, CheckCircle2, Trash2, Clock
} from 'lucide-react'

/**
 * NotificationItem Component
 * Renders individual notification card with icon, priority badge, and actions.
 */
function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  compact = false
}) {
  if (!notification) return null

  const { id, type, title, message, status, priority, createdAt, link } = notification
  const isUnread = status === 'unread'

  // Icon mapping by notification type
  const getTypeIcon = () => {
    switch (type) {
      case 'booking': return { icon: Calendar, color: 'bg-blue-100 text-blue-600 border-blue-200' }
      case 'payment': return { icon: CreditCard, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' }
      case 'tracking': return { icon: Radio, color: 'bg-rose-100 text-rose-600 border-rose-200' }
      case 'document': return { icon: FileText, color: 'bg-purple-100 text-purple-600 border-purple-200' }
      case 'drone': return { icon: Navigation, color: 'bg-teal-100 text-teal-600 border-teal-200' }
      case 'review': return { icon: Star, color: 'bg-amber-100 text-amber-600 border-amber-200' }
      case 'complaint': return { icon: ShieldAlert, color: 'bg-rose-100 text-rose-600 border-rose-200' }
      case 'promotion': return { icon: Sparkles, color: 'bg-indigo-100 text-indigo-600 border-indigo-200' }
      case 'security': return { icon: ShieldCheck, color: 'bg-slate-100 text-slate-700 border-slate-200' }
      default: return { icon: Settings, color: 'bg-slate-100 text-slate-600 border-slate-200' }
    }
  }

  const { icon: TypeIcon, color: iconStyle } = getTypeIcon()

  // Priority formatting
  const getPriorityBadge = () => {
    if (priority === 'critical') {
      return <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">Critical</span>
    }
    if (priority === 'important') {
      return <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">Important</span>
    }
    return null
  }

  // Format date / relative time
  const timeFormatted = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const ContentWrapper = link ? Link : 'div'

  return (
    <div
      className={`p-4 rounded-2xl border transition-all relative overflow-hidden group ${
        isUnread
          ? 'bg-blue-50/60 border-blue-200 shadow-2xs'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Unread dot indicator bar */}
      {isUnread && (
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600" />
      )}

      <div className="flex items-start gap-3.5">
        
        {/* Type Icon */}
        <div className={`p-2.5 rounded-xl border shrink-0 ${iconStyle}`}>
          <TypeIcon className="w-4 h-4" />
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <ContentWrapper to={link} className="flex items-center gap-2 min-w-0">
              <h4 className={`text-xs font-black truncate ${isUnread ? 'text-slate-900' : 'text-slate-700'}`}>
                {title}
              </h4>
              {getPriorityBadge()}
            </ContentWrapper>

            <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {timeFormatted}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {message}
          </p>

          {/* Bottom Actions Row */}
          <div className="pt-2 flex items-center justify-between text-[11px]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {type}
            </span>

            <div className="flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
              {isUnread && onMarkAsRead && (
                <button
                  type="button"
                  onClick={() => onMarkAsRead(id)}
                  className="text-blue-600 hover:text-blue-800 text-[10px] font-extrabold inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Mark Read</span>
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default NotificationItem
