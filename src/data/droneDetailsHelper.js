// Helper utility to enrich any drone object with realistic specs, image galleries, shop metadata, and reviews

export const getEnrichedDroneDetails = (drone) => {
  if (!drone) return null

  // Generate supplementary high-res gallery images
  const galleryImages = [
    drone.image,
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=1200&q=80"
  ]

  // Complete specs map
  const specifications = [
    { label: "Camera Sensor", value: drone.camera === "8K" ? "8K Full-Frame Cinema Sensor" : drone.camera === "5.1K" ? "5.1K Hasselblad CMOS Sensor" : "4K HDR 1/1.3-inch CMOS", icon: "Camera" },
    { label: "Flight Time", value: `${drone.flightTime} Minutes Max`, icon: "Clock" },
    { label: "Maximum Speed", value: drone.category === "Videography" ? "94 km/h" : "75 km/h", icon: "Zap" },
    { label: "Takeoff Weight", value: drone.category === "Beginner" ? "249 g" : drone.category === "Agriculture" ? "38 kg" : "958 g", icon: "Weight" },
    { label: "GPS Navigation", value: drone.gps ? "Dual GPS + GLONASS + Galileo" : "Basic GPS", icon: "Compass" },
    { label: "Transmission Range", value: "15 km O3+ Transmission", icon: "Radio" },
    { label: "Battery Capacity", value: "5000 mAh LiPo 4S", icon: "Battery" },
    { label: "Payload Capacity", value: drone.category === "Agriculture" ? "40 kg" : "1.2 kg Max Payload", icon: "Package" }
  ]

  // Detailed Description
  const description = `${drone.name} by ${drone.brand} is a premier ${drone.category.toLowerCase()} drone designed to meet demanding commercial and creative aerial missions. Featuring advanced flight stabilization, multi-directional obstacle sensing, and a high-resolution ${drone.camera} camera system, this model delivers unmatched flight autonomy and image precision.`

  const useCases = [
    "Aerial photography & landscape cinematography",
    "Commercial real estate promotional videos",
    "Live event broadcast and outdoor sports coverage",
    "Infrastructure inspections and topographic surveying",
    "Agricultural crop monitoring and mapping"
  ]

  // Included Items Visual Checklist
  const whatsIncluded = [
    { title: "Drone Body & Gimbal", description: "Factory calibrated unit ready to fly" },
    { title: "Smart Remote Controller", description: "Integrated HD screen controller" },
    { title: "Intelligent Flight Batteries", description: "3x High-capacity batteries" },
    { title: "Fast Battery Charging Hub", description: "Multi-battery sequential charger" },
    { title: "Low-Noise Propellers", description: "2x Complete sets (8 blades)" },
    { title: "Weatherproof Carrying Case", description: "Heavy-duty custom foam hard case" },
    { title: "ND Filter Set & Cable Kit", description: "ND4/8/16/32 filters + USB-C data cables" },
    { title: "User Manual & Pre-Flight Checklist", description: "Safety instructions & logbook" }
  ]

  // Rental Policy Details
  const rentalPolicies = {
    securityDeposit: `₹${drone.securityDeposit.toLocaleString('en-IN')} fully refundable security deposit held during rental period.`,
    rules: [
      "Must follow DGCA / FAA airspace regulations and local non-fly zone guidelines.",
      "Operate within visual line-of-sight (VLOS) at all times.",
      "No flying over crowded public gatherings without proper commercial permits."
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before pickup. 50% fee applies for cancellations within 24 hours.",
    lateReturnPolicy: "₹500 per hour charge for unannounced late returns. Full daily rate after 3 hours delay.",
    damagePolicy: "Basic equipment insurance included. Customer deductible is capped at ₹5,000 for accidental damage.",
    minRentalPeriod: "1 Day Minimum Rental"
  }

  // Shop Info
  const shopInfo = {
    name: drone.shopName,
    location: drone.location,
    verified: true,
    rating: 4.9,
    reviewsCount: 142,
    dronesCount: 24,
    responseTime: "< 15 minutes",
    joinedYear: 2022,
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 43210",
    email: `contact@${drone.shopName.toLowerCase().replace(/\s+/g, '')}.com`
  }

  // 6 Realistic Mock Reviews
  const reviewsList = [
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "2 days ago",
      comment: `Rented the ${drone.name} for a weekend wedding video shoot in ${drone.location}. The equipment was in pristine condition, fully charged, and ready to fly!`
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "1 week ago",
      comment: `${drone.shopName} was super helpful! They provided a quick 10-minute briefing on the controller and extra ND filters. Will definitely rent again.`
    },
    {
      id: 3,
      name: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "2 weeks ago",
      comment: `Fantastic drone stability even in windy conditions. Image output from the ${drone.camera} camera was crystal clear. Smooth booking process!`
    },
    {
      id: 4,
      name: "Ananya Roy",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "3 weeks ago",
      comment: "Seamless pickup and return. The security deposit was refunded immediately after inspection. 10/10 experience!"
    },
    {
      id: 5,
      name: "Karan Verma",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "1 month ago",
      comment: "Flight time was awesome—got almost 40+ minutes per battery. Included hard case made transport safe and convenient."
    },
    {
      id: 6,
      name: "Sneha Reddy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "1 month ago",
      comment: "Used this drone for land survey mapping. Precision GPS lock was instant and battery hub charged batteries very quickly."
    }
  ]

  return {
    ...drone,
    galleryImages,
    specifications,
    description,
    useCases,
    whatsIncluded,
    rentalPolicies,
    shopInfo,
    reviewsList
  }
}
