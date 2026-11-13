// Mock Payments & Financial Data for Customer Dashboard (Phase 6)

export const customerPayments = [
  {
    transactionId: "TXN-984021",
    bookingId: "DRN-8492",
    date: "2026-08-28",
    droneName: "Mavic 3 Pro",
    amount: 10000,
    securityDeposit: 10000,
    paymentMethod: "UPI (Google Pay)",
    status: "Paid" // Paid, Pending, Refunded
  },
  {
    transactionId: "TXN-872109",
    bookingId: "DRN-7320",
    date: "2026-08-29",
    droneName: "DJI Mini 4 Pro",
    amount: 4500,
    securityDeposit: 6000,
    paymentMethod: "Credit Card (HDFC **** 4812)",
    status: "Paid"
  },
  {
    transactionId: "TXN-761298",
    bookingId: "DRN-6194",
    date: "2026-08-30",
    droneName: "Inspire 3 Cinema 8K",
    amount: 34000,
    securityDeposit: 35000,
    paymentMethod: "Net Banking (ICICI)",
    status: "Pending"
  },
  {
    transactionId: "TXN-650187",
    bookingId: "DRN-3912",
    date: "2026-08-15",
    droneName: "Phantom 4 RTK Mapper",
    amount: 17500,
    securityDeposit: 15000,
    paymentMethod: "UPI (PhonePe)",
    status: "Refunded" // Security deposit refunded
  },
  {
    transactionId: "TXN-549076",
    bookingId: "DRN-2841",
    date: "2026-07-18",
    droneName: "Avata 2 FPV Goggles 3 Kit",
    amount: 11200,
    securityDeposit: 10000,
    paymentMethod: "Debit Card (SBI **** 9012)",
    status: "Refunded"
  }
]

export const paymentSummaryStats = {
  totalSpent: 77200,
  pendingPayments: 34000,
  securityDepositsHeld: 16000,
  refundsProcessed: 25000
}
