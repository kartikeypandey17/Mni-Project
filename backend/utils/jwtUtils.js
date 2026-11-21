import jwt from 'jsonwebtoken';

/**
 * Generate a cryptographically signed JWT access token
 *
 * @param {Object} payload - User identification payload { id, role, email }
 * @returns {string} Signed JWT token
 */
export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'dronehub_fallback_secret_key_2026';
  const expiresIn = process.env.JWT_EXPIRE || '7d';

  return jwt.sign(payload, secret, {
    expiresIn,
    issuer: 'DRONEHUB-API'
  });
};

/**
 * Verify a JWT access token
 *
 * @param {string} token - Raw JWT string
 * @returns {Object} Decoded token payload
 */
export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || 'dronehub_fallback_secret_key_2026';
  return jwt.verify(token, secret);
};

