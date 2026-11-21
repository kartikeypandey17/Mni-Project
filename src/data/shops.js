// Shop Profiles Data for Shop Owner Dashboard (Phase 7)

export const shopProfiles = [
  {
    shopId: 101,
    name: "SkyRent Bengaluru",
    description: "Premier camera drone rentals, FPV setups, and licensed commercial pilot assistance for film, real estate, and agricultural surveying.",
    location: "Bengaluru, Karnataka",
    address: "42 Indiranagar 100ft Road, Bengaluru",
    phone: "+91 98765 43210",
    email: "owner@dronehub.com",
    website: "https://skyrentbengaluru.com",
    operatingHours: "09:00 AM - 08:00 PM (Mon-Sat)",
    status: "Open", // Open, Closed, Temporarily Unavailable
    verified: true,
    rating: 4.9,
    reviewsCount: 142,
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    stats: {
      totalDrones: 24,
      availableDrones: 16,
      activeRentals: 5,
      pendingBookings: 7,
      totalCustomers: 142,
      monthlyRevenue: 184500
    },
    monthlyRevenueChart: [
      { month: "Jan", revenue: 85000 },
      { month: "Feb", revenue: 110000 },
      { month: "Mar", revenue: 125000 },
      { month: "Apr", revenue: 148000 },
      { month: "May", revenue: 167000 },
      { month: "Jun", revenue: 184500 }
    ]
  },
  {
    shopId: 102,
    name: "AeroTech Mumbai",
    description: "Specialized industrial thermal inspection, heavy-lift agricultural rigs, and 8K cinema drone fleet rentals across Maharashtra.",
    location: "Mumbai, Maharashtra",
    address: "18 Bandra Kurla Complex, Mumbai",
    phone: "+91 98123 45678",
    email: "owner2@dronehub.com",
    website: "https://aerotechmumbai.com",
    operatingHours: "09:30 AM - 07:30 PM (Mon-Sat)",
    status: "Open",
    verified: true,
    rating: 4.8,
    reviewsCount: 98,
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    stats: {
      totalDrones: 18,
      availableDrones: 12,
      activeRentals: 4,
      pendingBookings: 3,
      totalCustomers: 98,
      monthlyRevenue: 142000
    },
    monthlyRevenueChart: [
      { month: "Jan", revenue: 65000 },
      { month: "Feb", revenue: 88000 },
      { month: "Mar", revenue: 95000 },
      { month: "Apr", revenue: 112000 },
      { month: "May", revenue: 130000 },
      { month: "Jun", revenue: 142000 }
    ]
  }
]
