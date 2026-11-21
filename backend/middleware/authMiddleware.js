import { verifyToken } from '../utils/jwtUtils.js';
import User from '../models/User.js';
import { sendError } from '../utils/apiResponse.js';

/**
 * Protect routes: Authenticates the JWT access token and attaches the database user
 */
export const protect = async (req, res, next) => {
  let token;

  // Extract Bearer token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, {
      statusCode: 401,
      message: 'Access denied. No authentication token provided.'
    });
  }

  try {
    // Verify JWT
    const decoded = verifyToken(token);

    // Retrieve active user from database (role is sourced from DB, not from user input)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, {
        statusCode: 401,
        message: 'The user belonging to this token no longer exists.'
      });
    }

    if (!user.isActive) {
      return sendError(res, {
        statusCode: 403,
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    // Attach validated user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, {
        statusCode: 401,
        message: 'Session has expired. Please log in again.'
      });
    }

    return sendError(res, {
      statusCode: 401,
      message: 'Invalid authorization token.'
    });
  }
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces role restrictions based on database-backed user identity.
 * Supports aliases: 'owner' <-> 'shop-owner', 'admin' <-> 'super-admin'
 *
 * @param  {...string} roles - Permitted roles (e.g. 'admin', 'owner', 'customer')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, {
        statusCode: 401,
        message: 'Authentication required before checking permissions.'
      });
    }

    const userRole = req.user.role;

    // Expand role aliases for seamless compatibility
    const expandedPermittedRoles = new Set();
    roles.forEach((r) => {
      expandedPermittedRoles.add(r);
      if (r === 'owner') expandedPermittedRoles.add('shop-owner');
      if (r === 'shop-owner') expandedPermittedRoles.add('owner');
      if (r === 'admin') expandedPermittedRoles.add('super-admin');
      if (r === 'super-admin') expandedPermittedRoles.add('admin');
    });

    if (!expandedPermittedRoles.has(userRole)) {
      return sendError(res, {
        statusCode: 403,
        message: `Forbidden: Role '${userRole}' is not authorized to access this resource.`
      });
    }

    next();
  };
};

/**
 * Optional authentication: Attaches user if valid token exists, but does not block requests without token
 */
export const optionalAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    if (user && user.isActive) {
      req.user = user;
    }
  } catch (err) {
    req.user = null;
  }
  next();
};

