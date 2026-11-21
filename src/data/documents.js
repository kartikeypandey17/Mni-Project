// Mock Documents Data for Customer Dashboard (Phase 6)

export const customerDocuments = [
  {
    id: "doc-1",
    type: "Identity Proof",
    title: "Aadhaar Card / Govt Photo ID",
    fileName: "aadhaar_card_kartikey.pdf",
    fileSize: "2.4 MB",
    fileType: "PDF",
    uploadDate: "2026-08-15",
    status: "Verified", // Verified, Pending, Rejected
    required: true,
    note: "Verified by DroneHub Compliance Team"
  },
  {
    id: "doc-2",
    type: "Address Proof",
    title: "Electricity Bill / Utility Statement",
    fileName: "utility_address_proof.jpg",
    fileSize: "1.8 MB",
    fileType: "JPG",
    uploadDate: "2026-08-16",
    status: "Verified",
    required: true,
    note: "Address matches rental delivery details"
  },
  {
    id: "doc-3",
    type: "Drone Certification",
    title: "DGCA Remote Pilot License (RPC)",
    fileName: "dgca_pilot_certificate.pdf",
    fileSize: "3.1 MB",
    fileType: "PDF",
    uploadDate: "2026-08-20",
    status: "Verified",
    required: false,
    note: "Commercial flying permission granted"
  },
  {
    id: "doc-4",
    type: "Other Documents",
    title: "Commercial Drone Insurance Policy",
    fileName: "drone_insurance_policy_2026.pdf",
    fileSize: "4.2 MB",
    fileType: "PDF",
    uploadDate: "2026-08-25",
    status: "Pending",
    required: false,
    note: "Under compliance review"
  }
]
