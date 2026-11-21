import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ProtectedRoute Component: Restricts access based on authentication status & user roles
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, userRole } = useAuth()

  // 1. Unauthenticated check -> Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  // 2. Role permission check with alias normalization -> Redirect to access-denied if role not authorized
  const normalizedUserRole =
    userRole === 'owner' ? 'shop-owner' :
    userRole === 'admin' ? 'super-admin' :
    userRole;

  const normalizedAllowedRoles = allowedRoles ? allowedRoles.flatMap(r => {
    if (r === 'shop-owner') return ['shop-owner', 'owner'];
    if (r === 'super-admin') return ['super-admin', 'admin'];
    return [r];
  }) : [];

  if (allowedRoles && allowedRoles.length > 0 && !normalizedAllowedRoles.includes(userRole) && !allowedRoles.includes(normalizedUserRole)) {
    return <Navigate to="/access-denied" replace />
  }

  // 3. Authorized -> Render requested route children
  return children
}

export default ProtectedRoute
