// Shop Owner Isolated Mock Data & Filtering Helpers (Phase 7)

import { dronesData } from './drones'
import { shopProfiles } from './shops'

/*
  DEVELOPER NOTE:
  Frontend shop-level filtering is only a prototype.
  Real authorization and data isolation must be enforced
  by the backend and database.
  A frontend application cannot provide secure authorization by itself.
*/

// Map dronesData to shopId: 101 (SkyRent Bengaluru) and shopId: 102 (AeroTech Mumbai)
export const initialOwnerDrones = dronesData.map((drone) => {
  // Even IDs -> shopId 102 (AeroTech Mumbai), Odd IDs -> shopId 101 (SkyRent Bengaluru)
  const shopId = (drone.id % 2 === 0) ? 102 : 101
  const shopName = shopId === 101 ? "SkyRent Bengaluru" : "AeroTech Mumbai"
  return {
    ...drone,
    shopId,
    shopName,
    totalRentalsCount: Math.floor(10 + drone.id * 3),
    currentCustomer: drone.availability === "Currently Rented" ? "Rahul Sharma" : null,
    status: drone.availability === "Available" ? "Available" : drone.availability === "Currently Rented" ? "Rented" : "Maintenance"
  }
})

// Shop Bookings List
export const initialOwnerBookings = [
  // Shop 101 Bookings
  {
    bookingId: "DRN-10452",
    shopId: 101,
    customerName: "Rahul Sharma",
    customerEmail: "rahul@example.com",
    customerPhone: "+91 98765 11111",
    droneId: 1,
    droneName: "Mavic 3 Pro",
    model: "Mavic 3 Pro Hasselblad",
    bookingDate: "2026-08-28",
    startDate: "2026-09-01",
    endDate: "2026-09-04",
    durationDays: 4,
    amount: 10000,
    securityDeposit: 10000,
    status: "Pending", // Pending, Confirmed, Active, Completed, Cancelled
    documentsStatus: "Verified"
  },
  {
    bookingId: "DRN-10453",
    shopId: 101,
    customerName: "Priya Patel",
    customerEmail: "priya@example.com",
    customerPhone: "+91 98765 22222",
    droneId: 11,
    droneName: "Avata 2 FPV Goggles 3 Kit",
    model: "Avata 2 CineWhoop FPV",
    bookingDate: "2026-08-29",
    startDate: "2026-09-05",
    endDate: "2026-09-08",
    durationDays: 4,
    amount: 11200,
    securityDeposit: 10000,
    status: "Confirmed",
    documentsStatus: "Verified"
  },
  {
    bookingId: "DRN-10454",
    shopId: 101,
    customerName: "Vikram Malhotra",
    customerEmail: "vikram@example.com",
    customerPhone: "+91 98765 33333",
    droneId: 15,
    droneName: "Mavic 3 Enterprise Multispectral",
    model: "Mavic 3 Multispectral NDVI",
    bookingDate: "2026-08-30",
    startDate: "2026-09-10",
    endDate: "2026-09-12",
    durationDays: 3,
    amount: 11400,
    securityDeposit: 15000,
    status: "Active",
    documentsStatus: "Verified"
  },
  {
    bookingId: "DRN-10455",
    shopId: 101,
    customerName: "Ananya Roy",
    customerEmail: "ananya@example.com",
    customerPhone: "+91 98765 44444",
    droneId: 18,
    droneName: "DJI Neo Ultralight Starter",
    model: "DJI Neo AI Subject Tracking",
    bookingDate: "2026-08-15",
    startDate: "2026-08-20",
    endDate: "2026-08-22",
    durationDays: 3,
    amount: 2970,
    securityDeposit: 4000,
    status: "Completed",
    documentsStatus: "Verified"
  },
  // Shop 102 Bookings
  {
    bookingId: "DRN-20101",
    shopId: 102,
    customerName: "Karan Verma",
    customerEmail: "karan@example.com",
    customerPhone: "+91 98123 11111",
    droneId: 2,
    droneName: "Inspire 3 Cinema 8K",
    model: "Inspire 3 X9-8K Air",
    bookingDate: "2026-08-29",
    startDate: "2026-09-02",
    endDate: "2026-09-06",
    durationDays: 5,
    amount: 42500,
    securityDeposit: 35000,
    status: "Pending",
    documentsStatus: "Verified"
  },
  {
    bookingId: "DRN-20102",
    shopId: 102,
    customerName: "Sneha Reddy",
    customerEmail: "sneha@example.com",
    customerPhone: "+91 98123 22222",
    droneId: 8,
    droneName: "DJI Mini 4 Pro Fly More",
    model: "Mini 4 Pro Sub-249g",
    bookingDate: "2026-08-30",
    startDate: "2026-09-08",
    endDate: "2026-09-10",
    durationDays: 3,
    amount: 4500,
    securityDeposit: 6000,
    status: "Confirmed",
    documentsStatus: "Verified"
  }
]

// Shop Customers List
export const initialOwnerCustomers = [
  // Shop 101 Customers
  {
    id: "CUST-101",
    shopId: 101,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 11111",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    totalRentals: 6,
    activeRental: "Mavic 3 Pro (DRN-10452)",
    totalSpent: 48500,
    lastRentalDate: "2026-08-28",
    status: "Active Renter",
    documentsStatus: "Verified"
  },
  {
    id: "CUST-102",
    shopId: 101,
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 98765 22222",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    totalRentals: 4,
    activeRental: "Avata 2 FPV Kit (DRN-10453)",
    totalSpent: 32000,
    lastRentalDate: "2026-08-29",
    status: "Active Renter",
    documentsStatus: "Verified"
  },
  {
    id: "CUST-103",
    shopId: 101,
    name: "Vikram Malhotra",
    email: "vikram@example.com",
    phone: "+91 98765 33333",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    totalRentals: 3,
    activeRental: "Mavic 3 Enterprise (DRN-10454)",
    totalSpent: 26500,
    lastRentalDate: "2026-08-30",
    status: "Active Renter",
    documentsStatus: "Verified"
  },
  // Shop 102 Customers
  {
    id: "CUST-201",
    shopId: 102,
    name: "Karan Verma",
    email: "karan@example.com",
    phone: "+91 98123 11111",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80",
    totalRentals: 5,
    activeRental: "Inspire 3 Cinema 8K (DRN-20101)",
    totalSpent: 74000,
    lastRentalDate: "2026-08-29",
    status: "Active Renter",
    documentsStatus: "Verified"
  }
]

// Shop Reviews List
export const initialOwnerReviews = [
  // Shop 101 Reviews
  {
    id: "REV-101",
    shopId: 101,
    customerName: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    droneName: "Mavic 3 Pro",
    rating: 5,
    date: "2 days ago",
    comment: "Pristine drone condition and super fast pickup process at SkyRent Bengaluru! Batteries were 100% charged.",
    ownerReply: "Thank you Rahul! Looking forward to hosting your next shoot mission."
  },
  {
    id: "REV-102",
    shopId: 101,
    customerName: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    droneName: "Avata 2 FPV Goggles 3 Kit",
    rating: 5,
    date: "1 week ago",
    comment: "The FPV kit was calibrated to perfection. Appreciated the quick safety briefing provided by the shop team.",
    ownerReply: null
  },
  {
    id: "REV-103",
    shopId: 101,
    customerName: "Vikram Malhotra",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    droneName: "Mavic 3 Enterprise Multispectral",
    rating: 4,
    date: "2 weeks ago",
    comment: "Great survey gear. Smooth deposit refund process after returning the equipment.",
    ownerReply: "Thanks Vikram! Glad the multispectral scanner worked well for your agricultural survey."
  },
  // Shop 102 Reviews
  {
    id: "REV-201",
    shopId: 102,
    customerName: "Karan Verma",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80",
    droneName: "Inspire 3 Cinema 8K",
    rating: 5,
    date: "3 days ago",
    comment: "AeroTech Mumbai provided top tier 8K cinema gear for our commercial film set. Unbeatable service!",
    ownerReply: "Thank you Karan! Happy to supply your production team anytime."
  }
]

// Shop Documents List
export const initialOwnerDocuments = [
  // Shop 101 Documents
  {
    id: "DOC-101",
    shopId: 101,
    type: "Shop License",
    title: "Commercial Drone Operating Permit",
    fileName: "skyrent_bengaluru_operating_permit.pdf",
    uploadDate: "2025-01-10",
    status: "Verified",
    forCategory: "Shop Operations"
  },
  {
    id: "DOC-102",
    shopId: 101,
    type: "Business Registration",
    title: "GST & Commercial Trade Certificate",
    fileName: "gst_registration_skyrent.pdf",
    uploadDate: "2025-01-12",
    status: "Verified",
    forCategory: "Shop Operations"
  },
  // Shop 102 Documents
  {
    id: "DOC-201",
    shopId: 102,
    type: "Shop License",
    title: "AeroTech Mumbai Operations License",
    fileName: "aerotech_mumbai_permit.pdf",
    uploadDate: "2025-02-01",
    status: "Verified",
    forCategory: "Shop Operations"
  }
]

// Shop Payments List
export const initialOwnerPayments = [
  // Shop 101 Payments
  {
    transactionId: "TXN-OWN-101",
    shopId: 101,
    bookingId: "DRN-10452",
    customerName: "Rahul Sharma",
    droneName: "Mavic 3 Pro",
    date: "2026-08-28",
    amount: 10000,
    securityDeposit: 10000,
    paymentMethod: "UPI (Google Pay)",
    status: "Paid"
  },
  {
    transactionId: "TXN-OWN-102",
    shopId: 101,
    bookingId: "DRN-10453",
    customerName: "Priya Patel",
    droneName: "Avata 2 FPV Goggles 3 Kit",
    date: "2026-08-29",
    amount: 11200,
    securityDeposit: 10000,
    paymentMethod: "Credit Card (HDFC **** 4812)",
    status: "Paid"
  },
  {
    transactionId: "TXN-OWN-103",
    shopId: 101,
    bookingId: "DRN-10454",
    customerName: "Vikram Malhotra",
    droneName: "Mavic 3 Enterprise",
    date: "2026-08-30",
    amount: 11400,
    securityDeposit: 15000,
    paymentMethod: "Net Banking (ICICI)",
    status: "Pending"
  },
  // Shop 102 Payments
  {
    transactionId: "TXN-OWN-201",
    shopId: 102,
    bookingId: "DRN-20101",
    customerName: "Karan Verma",
    droneName: "Inspire 3 Cinema 8K",
    date: "2026-08-29",
    amount: 42500,
    securityDeposit: 35000,
    paymentMethod: "UPI (PhonePe)",
    status: "Paid"
  }
]
