// DroneHub Mock Authentication Users Data (Phase 5 & Phase 7)
// Frontend simulation user database for role-based testing and multi-shop data isolation

/*
  DEVELOPER NOTE:
  Frontend shop-level filtering is only a prototype.
  Real authorization and data isolation must be enforced
  by the backend and database.
  A frontend application cannot provide secure authorization
  by itself.
*/

export const mockAuthUsers = [
  {
    id: 1,
    name: "Platform Admin",
    email: "admin@dronehub.com",
    password: "admin123",
    role: "super-admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    shopId: null,
    shopName: null
  },
  {
    id: 2,
    name: "SkyRent Owner",
    email: "owner@dronehub.com",
    password: "owner123",
    role: "shop-owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    shopId: 101,
    shopName: "SkyRent Bengaluru"
  },
  {
    id: 4,
    name: "AeroRent Owner",
    email: "owner2@dronehub.com",
    password: "owner123",
    role: "shop-owner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    shopId: 102,
    shopName: "AeroTech Mumbai"
  },
  {
    id: 3,
    name: "Demo Customer",
    email: "user@dronehub.com",
    password: "user123",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    shopId: null,
    shopName: null
  }
]

export default mockAuthUsers
