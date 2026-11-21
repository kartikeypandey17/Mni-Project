import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, HelpCircle, Search, MessageSquare, ArrowRight } from 'lucide-react'
import { faqData } from '../data/mockData'

// FAQ Component: Interactive accordion FAQ list using React useState hook
function FAQ() {
  // State to track which accordion item is open (null if all closed)
  const [openId, setOpenId] = useState('faq-1')
  
  // Search query filter state
  const [searchQuery, setSearchQuery] = useState('')

  // Toggle accordion item
  const toggleAccordion = (id) => {
    setOpenId((prevOpenId) => (prevOpenId === id ? null : id))
  }

  // Filter FAQs based on search string
  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-16 pb-20 pt-8">
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Knowledge Base & Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about renting drones, host shop policies, and flight safety on DroneHub.
        </p>

        {/* Search Input Bar */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. rental pricing, insurance, cancellation)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Interactive Accordion List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden bg-white ${
                    isOpen
                      ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-base font-bold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                        isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content Body */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No questions found matching "{searchQuery}"</h3>
            <p className="text-sm text-slate-500">Try searching for keywords like "documents", "damage", or "pricing".</p>
          </div>
        )}
      </section>

      {/* Still Have Questions Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
          <p className="text-blue-100 text-sm max-w-xl mx-auto">
            Can't find the answer you're looking for? Reach out to our dedicated support team.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              <span>Contact Customer Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default FAQ
