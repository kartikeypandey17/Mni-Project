// DroneHub Mock Tracking System Data (Phase 9)
// Provides realistic telemetry and status data for frontend tracking demonstration

/*
  SECURITY NOTE & DEVELOPER WARNING:
  Frontend filtering is only for demonstration.
  Real tracking authorization must be enforced by the backend.
  A customer must only receive telemetry for their authorized rental.
  A shop owner must only receive telemetry for drones belonging to their shop.
  Super Admin can receive platform-wide telemetry.
*/

export const initialTrackingData = [
  {
    id: 1,
    droneId: 101,
    shopId: 101,
    shopName: "SkyRent Bengaluru",
    bookingId: "DRN-10452",
    customerId: 3, // Matches Demo Customer in AuthContext
    customerName: "Rahul Sharma",
    droneName: "DJI Mavic 3 Pro",
    droneImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    status: "in-flight",
    latitude: 12.9716,
    longitude: 77.5946,
    altitude: 85,
    speed: 32,
    battery: 78,
    signal: 94,
    distance: 4.8,
    flightTime: 28,
    eta: "18 min",
    lastUpdated: "Just now",
    startLocation: "Indiranagar Hub, Bengaluru",
    destination: "Whitefield Tech Park, Bengaluru",
    mapCoords: { shopX: 20, shopY: 25, droneX: 52, droneY: 48, destX: 82, destY: 72 },
    batteryHistory: [
      { time: "14:00", battery: 100 },
      { time: "14:05", battery: 95 },
      { time: "14:10", battery: 90 },
      { time: "14:15", battery: 85 },
      { time: "14:20", battery: 81 },
      { time: "14:25", battery: 78 }
    ],
    speedHistory: [
      { time: "14:00", speed: 0 },
      { time: "14:05", speed: 22 },
      { time: "14:10", speed: 34 },
      { time: "14:15", speed: 30 },
      { time: "14:20", speed: 36 },
      { time: "14:25", speed: 32 }
    ],
    alerts: [
      { id: "alt-1", type: "info", title: "GPS Link Stable", message: "19 Satellites connected to flight controller.", timestamp: "14:22" }
    ]
  },
  {
    id: 2,
    droneId: 102,
    shopId: 101,
    shopName: "SkyRent Bengaluru",
    bookingId: "DRN-10454",
    customerId: 502,
    customerName: "Vikram Malhotra",
    droneName: "DJI Mavic 3 Multispectral",
    droneImage: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    status: "in-flight",
    latitude: 12.9352,
    longitude: 77.6245,
    altitude: 120,
    speed: 41,
    battery: 82,
    signal: 89,
    distance: 7.2,
    flightTime: 35,
    eta: "24 min",
    lastUpdated: "Just now",
    startLocation: "Koramangala Station, Bengaluru",
    destination: "Hebbal Agri Zone, Bengaluru",
    mapCoords: { shopX: 15, shopY: 30, droneX: 45, droneY: 55, destX: 78, destY: 80 },
    batteryHistory: [
      { time: "13:50", battery: 100 },
      { time: "14:00", battery: 94 },
      { time: "14:10", battery: 89 },
      { time: "14:20", battery: 84 },
      { time: "14:25", battery: 82 }
    ],
    speedHistory: [
      { time: "13:50", speed: 0 },
      { time: "14:00", speed: 28 },
      { time: "14:10", speed: 44 },
      { time: "14:20", speed: 39 },
      { time: "14:25", speed: 41 }
    ],
    alerts: [
      { id: "alt-2", type: "info", title: "Survey Waypoint 4/12", message: "Automated multispectral grid pass in progress.", timestamp: "14:24" }
    ]
  },
  {
    id: 3,
    droneId: 103,
    shopId: 101,
    shopName: "SkyRent Bengaluru",
    bookingId: "DRN-10499",
    customerId: 503,
    customerName: "Ananya Deshmukh",
    droneName: "DJI Inspire 3 Cinema",
    droneImage: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80",
    status: "idle",
    latitude: 12.9721,
    longitude: 77.6001,
    altitude: 0,
    speed: 0,
    battery: 95,
    signal: 100,
    distance: 0.1,
    flightTime: 0,
    eta: "Standby",
    lastUpdated: "1 min ago",
    startLocation: "MG Road Hub, Bengaluru",
    destination: "Cubbon Park Shoot Zone",
    mapCoords: { shopX: 25, shopY: 20, droneX: 27, droneY: 22, destX: 65, destY: 45 },
    batteryHistory: [
      { time: "14:15", battery: 95 },
      { time: "14:25", battery: 95 }
    ],
    speedHistory: [
      { time: "14:15", speed: 0 },
      { time: "14:25", speed: 0 }
    ],
    alerts: [
      { id: "alt-3", type: "info", title: "Pre-flight Check Passed", message: "Dual batteries fully charged and sensors calibrated.", timestamp: "14:18" }
    ]
  },
  {
    id: 4,
    droneId: 104,
    shopId: 102,
    shopName: "AeroTech Mumbai",
    bookingId: "DRN-7320",
    customerId: 504,
    customerName: "Priya Patel",
    droneName: "DJI Mini 4 Pro Fly More",
    droneImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    status: "in-flight",
    latitude: 19.0760,
    longitude: 72.8777,
    altitude: 65,
    speed: 28,
    battery: 91,
    signal: 96,
    distance: 2.3,
    flightTime: 14,
    eta: "8 min",
    lastUpdated: "Just now",
    startLocation: "Bandra West Depot, Mumbai",
    destination: "Marine Drive Promenade",
    mapCoords: { shopX: 30, shopY: 35, droneX: 58, droneY: 50, destX: 85, destY: 75 },
    batteryHistory: [
      { time: "14:10", battery: 100 },
      { time: "14:15", battery: 97 },
      { time: "14:20", battery: 94 },
      { time: "14:25", battery: 91 }
    ],
    speedHistory: [
      { time: "14:10", speed: 0 },
      { time: "14:15", speed: 26 },
      { time: "14:20", speed: 30 },
      { time: "14:25", speed: 28 }
    ],
    alerts: []
  },
  {
    id: 5,
    droneId: 105,
    shopId: 102,
    shopName: "AeroTech Mumbai",
    bookingId: "DRN-7391",
    customerId: 505,
    customerName: "Karan Johar",
    droneName: "Autel EVO II Dual 640T",
    droneImage: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80",
    status: "in-flight",
    latitude: 19.1197,
    longitude: 72.8464,
    altitude: 110,
    speed: 38,
    battery: 18, // LOW BATTERY SCENARIO
    signal: 68,  // WEAK SIGNAL SCENARIO
    distance: 8.4,
    flightTime: 42,
    eta: "5 min (RTH)",
    lastUpdated: "Just now",
    startLocation: "Andheri East Hub, Mumbai",
    destination: "Juhu Coastal Survey",
    mapCoords: { shopX: 18, shopY: 15, droneX: 68, droneY: 62, destX: 88, destY: 82 },
    batteryHistory: [
      { time: "13:45", battery: 100 },
      { time: "13:55", battery: 75 },
      { time: "14:05", battery: 52 },
      { time: "14:15", battery: 32 },
      { time: "14:25", battery: 18 }
    ],
    speedHistory: [
      { time: "13:45", speed: 0 },
      { time: "13:55", speed: 42 },
      { time: "14:05", speed: 40 },
      { time: "14:15", speed: 35 },
      { time: "14:25", speed: 38 }
    ],
    alerts: [
      { id: "alt-5a", type: "critical", title: "Low Battery Warning", message: "Battery level dropped below 20%. RTH suggested.", timestamp: "14:24" },
      { id: "alt-5b", type: "warning", title: "Weak Signal Threshold", message: "Signal strength 68% near tall structure zone.", timestamp: "14:23" }
    ]
  },
  {
    id: 6,
    droneId: 106,
    shopId: 103,
    shopName: "DroneHub Delhi",
    bookingId: "DRN-30101",
    customerId: 506,
    customerName: "Siddharth Mehta",
    droneName: "DJI Phantom 4 RTK",
    droneImage: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=800&q=80",
    status: "in-flight",
    latitude: 28.6139,
    longitude: 77.2090,
    altitude: 95,
    speed: 30,
    battery: 42,
    signal: 91,
    distance: 5.6,
    flightTime: 31,
    eta: "14 min",
    lastUpdated: "Just now",
    startLocation: "Connaught Place Hub, Delhi",
    destination: "Dwarka Expressway Mapping",
    mapCoords: { shopX: 40, shopY: 20, droneX: 60, droneY: 45, destX: 75, destY: 70 },
    batteryHistory: [
      { time: "13:55", battery: 100 },
      { time: "14:05", battery: 80 },
      { time: "14:15", battery: 60 },
      { time: "14:25", battery: 42 }
    ],
    speedHistory: [
      { time: "13:55", speed: 0 },
      { time: "14:05", speed: 28 },
      { time: "14:15", speed: 32 },
      { time: "14:25", speed: 30 }
    ],
    alerts: [
      { id: "alt-6", type: "warning", title: "Geofence Warning", message: "Approaching restricted airspace (Airport Buffer 5km).", timestamp: "14:21" }
    ]
  },
  {
    id: 7,
    droneId: 107,
    shopId: 103,
    shopName: "DroneHub Delhi",
    bookingId: "DRN-30188",
    customerId: 507,
    customerName: "Neha Kapoor",
    droneName: "DJI Air 3 Fly More",
    droneImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    status: "offline", // OFFLINE SCENARIO
    latitude: 28.5355,
    longitude: 77.3910,
    altitude: 0,
    speed: 0,
    battery: 12,
    signal: 0,
    distance: 11.2,
    flightTime: 48,
    eta: "Lost Link",
    lastUpdated: "8 mins ago",
    startLocation: "Noida Sector 62, NCR",
    destination: "Greater Noida Industrial Zone",
    mapCoords: { shopX: 20, shopY: 40, droneX: 72, droneY: 78, destX: 90, destY: 90 },
    batteryHistory: [
      { time: "13:30", battery: 100 },
      { time: "13:45", battery: 65 },
      { time: "14:00", battery: 30 },
      { time: "14:15", battery: 12 }
    ],
    speedHistory: [
      { time: "13:30", speed: 0 },
      { time: "13:45", speed: 35 },
      { time: "14:00", speed: 20 },
      { time: "14:15", speed: 0 }
    ],
    alerts: [
      { id: "alt-7", type: "critical", title: "Telemetry Lost", message: "No ping response received for > 8 minutes.", timestamp: "14:17" }
    ]
  },
  {
    id: 8,
    droneId: 108,
    shopId: 104,
    shopName: "SkyFleet Hyderabad",
    bookingId: "DRN-50122",
    customerId: 508,
    customerName: "Ramesh Reddy",
    droneName: "DJI Agras T40 Heavy",
    droneImage: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    status: "in-flight",
    latitude: 17.3850,
    longitude: 78.4867,
    altitude: 25,
    speed: 18,
    battery: 64,
    signal: 95,
    distance: 3.1,
    flightTime: 22,
    eta: "12 min",
    lastUpdated: "Just now",
    startLocation: "HITEC City Hub, Hyderabad",
    destination: "Medchal Farm Crop Field",
    mapCoords: { shopX: 22, shopY: 28, droneX: 50, droneY: 42, destX: 80, destY: 65 },
    batteryHistory: [
      { time: "14:00", battery: 100 },
      { time: "14:10", battery: 82 },
      { time: "14:20", battery: 68 },
      { time: "14:25", battery: 64 }
    ],
    speedHistory: [
      { time: "14:00", speed: 0 },
      { time: "14:10", speed: 20 },
      { time: "14:20", speed: 18 },
      { time: "14:25", speed: 18 }
    ],
    alerts: []
  },
  {
    id: 9,
    droneId: 109,
    shopId: 104,
    shopName: "SkyFleet Hyderabad",
    bookingId: "DRN-50199",
    customerId: 509,
    customerName: "Sneha Rao",
    droneName: "DJI Avata Pro View 2",
    droneImage: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80",
    status: "returned",
    latitude: 17.4401,
    longitude: 78.3489,
    altitude: 0,
    speed: 0,
    battery: 45,
    signal: 100,
    distance: 0.0,
    flightTime: 38,
    eta: "Mission Complete",
    lastUpdated: "5 mins ago",
    startLocation: "Gachibowli Hub, Hyderabad",
    destination: "Gachibowli Hub, Hyderabad",
    mapCoords: { shopX: 50, shopY: 50, droneX: 50, droneY: 50, destX: 50, destY: 50 },
    batteryHistory: [
      { time: "13:40", battery: 100 },
      { time: "14:00", battery: 70 },
      { time: "14:20", battery: 45 }
    ],
    speedHistory: [
      { time: "13:40", speed: 0 },
      { time: "14:00", speed: 45 },
      { time: "14:20", speed: 0 }
    ],
    alerts: [
      { id: "alt-9", type: "info", title: "Mission Completed", message: "Drone safely landed at shop pad.", timestamp: "14:20" }
    ]
  }
];

export default initialTrackingData;
