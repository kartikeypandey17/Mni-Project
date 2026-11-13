import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuthUsers } from '../data/authUsers';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize user from localStorage for persistent sessions
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('dronehub_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Error loading stored auth user from localStorage:', e);
      return null;
    }
  });

  // Verify backend session validity on app mount if token exists
  useEffect(() => {
    const token = localStorage.getItem('dronehub_token');
    if (token && currentUser) {
      authService
        .getProfile()
        .then((dbUser) => {
          if (dbUser) {
            setCurrentUser((prev) => ({
              ...prev,
              id: dbUser._id || dbUser.id,
              name: dbUser.name,
              email: dbUser.email,
              role: dbUser.role,
              avatar: dbUser.profileImage || prev?.avatar
            }));
          }
        })
        .catch(() => {
          // If token verification fails, keep stored session or let user re-login
        });
    }
  }, []);

  // Synchronize state with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('dronehub_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('dronehub_user');
      localStorage.removeItem('dronehub_token');
    }
  }, [currentUser]);

  // Login handler: Authenticates against Express backend API with graceful offline fallback
  const login = async (email, password, selectedRole) => {
    // 1. Basic validation
    if (!email || !email.trim()) {
      return { success: false, error: 'Please enter your email address.' };
    }
    if (!password || !password.trim()) {
      return { success: false, error: 'Please enter your password.' };
    }

    try {
      // Real backend API authentication
      const data = await authService.login(email.trim(), password.trim(), selectedRole);
      const apiUser = data.user;

      const sessionUser = {
        id: apiUser._id || apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        role: apiUser.role,
        shopId:
          apiUser.shopId ||
          (apiUser.role === 'shop-owner' || apiUser.role === 'owner' ? 101 : null),
        avatar:
          apiUser.profileImage ||
          apiUser.avatar ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        shopName:
          apiUser.shopName ||
          (apiUser.role === 'shop-owner' || apiUser.role === 'owner'
            ? 'SkyRent Bengaluru'
            : null),
        loginTimestamp: new Date().toISOString()
      };

      setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    } catch (apiError) {
      // Fallback verification for offline development / pre-seeded demo testing
      const matchedUser = mockAuthUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      const localUsers = JSON.parse(
        localStorage.getItem('dronehub_registered_users') || '[]'
      );
      const matchedLocalUser = localUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      const targetUser = matchedUser || matchedLocalUser;

      if (targetUser && targetUser.password === password) {
        if (selectedRole && targetUser.role !== selectedRole) {
          return {
            success: false,
            error: `Account found, but role mismatch! This account is registered as a '${targetUser.role}'. Please select the correct role option.`
          };
        }

        const sessionUser = {
          id: targetUser.id,
          name: targetUser.name,
          email: targetUser.email,
          role: targetUser.role,
          shopId:
            targetUser.shopId ||
            (targetUser.role === 'shop-owner' || targetUser.role === 'owner'
              ? 101
              : null),
          avatar:
            targetUser.avatar ||
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          shopName: targetUser.shopName || null,
          loginTimestamp: new Date().toISOString()
        };

        setCurrentUser(sessionUser);
        return { success: true, user: sessionUser };
      }

      return {
        success: false,
        error:
          apiError.message ||
          'Invalid email or password. Please verify credentials.'
      };
    }
  };

  // Register handler: Creates user in backend with fallback
  const register = async (userData) => {
    const { fullName, email, phone, password, role } = userData;

    if (!fullName || !email || !password) {
      return { success: false, error: 'Please complete all required fields.' };
    }

    if (role === 'super-admin' || role === 'admin') {
      return {
        success: false,
        error: 'Super Admin accounts cannot be created publicly.'
      };
    }

    try {
      await authService.register({
        name: fullName,
        email,
        phone,
        password,
        role: role || 'customer'
      });

      return { success: true, message: 'Account Created Successfully!' };
    } catch (apiError) {
      // Local fallback for offline simulation
      const newUser = {
        id: Date.now(),
        name: fullName,
        email,
        phone,
        password,
        role: role || 'customer',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        registeredAt: new Date().toISOString()
      };

      const localUsers = JSON.parse(
        localStorage.getItem('dronehub_registered_users') || '[]'
      );
      localUsers.push(newUser);
      localStorage.setItem(
        'dronehub_registered_users',
        JSON.stringify(localUsers)
      );

      return {
        success: true,
        message: 'Account Created Successfully! (Local Fallback)'
      };
    }
  };

  // Logout handler: clears session and token
  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || null,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
