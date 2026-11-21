import React, { useState, useMemo } from 'react'
import { Star, MessageSquare, CheckCircle2, CornerDownRight, Send } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { initialOwnerReviews } from '../../data/ownerData'

function ShopOwnerReviews() {
  const { currentUser } = useAuth()
  const shopId = currentUser?.shopId || 101

  const [reviewsList, setReviewsList] = useState(() =>
    initialOwnerReviews.filter((r) => r.shopId === shopId)
  )

  const [replyingId, setReplyingId] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handlePostReply = (reviewId) => {
    if (!replyText.trim()) return
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, ownerReply: replyText } : r))
    )
    setReplyingId(null)
    setReplyText('')
    showToast('Reply posted successfully!')
  }

  // Calculate rating stats
  const averageRating = useMemo(() => {
    if (reviewsList.length === 0) return 5.0
    const sum = reviewsList.reduce((acc, r) => acc + r.rating, 0)
    return (sum / reviewsList.length).toFixed(1)
  }, [reviewsList])

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Customer Reviews & Feedback ({reviewsList.length})
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Reviews written by customers who rented drones from your shop.
        </p>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* RATING DISTRIBUTION SUMMARY */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row items-center gap-8">
        
        <div className="text-center sm:border-r border-slate-200 pr-0 sm:pr-8">
          <div className="text-4xl font-black text-slate-900">{averageRating}</div>
          <div className="flex items-center justify-center gap-1 text-amber-400 my-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <div className="text-xs text-slate-500 font-medium">Based on {reviewsList.length} reviews</div>
        </div>

        <div className="flex-1 w-full space-y-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-12 font-bold text-slate-700">5 Stars</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-4/5" />
            </div>
            <span className="w-8 text-right font-mono text-slate-500">85%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 font-bold text-slate-700">4 Stars</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-1/5" />
            </div>
            <span className="w-8 text-right font-mono text-slate-500">15%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 font-bold text-slate-700">3 Stars</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-0" />
            </div>
            <span className="w-8 text-right font-mono text-slate-500">0%</span>
          </div>
        </div>

      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-4">
        {reviewsList.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.customerName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{review.customerName}</h3>
                  <div className="text-xs text-slate-400 font-medium">Rented: {review.droneName} • {review.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{review.rating}.0</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "{review.comment}"
            </p>

            {/* Owner Reply Section */}
            {review.ownerReply ? (
              <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-1 text-xs">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <CornerDownRight className="w-4 h-4 text-purple-600" />
                  <span>Shop Owner Response</span>
                </div>
                <p className="text-purple-900/90 pl-5 leading-relaxed font-medium">
                  {review.ownerReply}
                </p>
              </div>
            ) : (
              replyingId === review.id ? (
                <div className="space-y-2 pt-2">
                  <textarea
                    rows={3}
                    placeholder="Write your public shop response..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none"
                  />
                  <div className="flex justify-end gap-2 text-xs">
                    <button
                      onClick={() => setReplyingId(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handlePostReply(review.id)}
                      className="inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2 rounded-xl transition-all shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Reply</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setReplyingId(review.id); setReplyText(''); }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl border border-purple-200 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reply to Review</span>
                </button>
              )
            )}

          </div>
        ))}
      </div>

    </div>
  )
}

export default ShopOwnerReviews
