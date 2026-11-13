/**
 * Consistent API Response Helper Functions
 * Standardizes success and error payloads across all endpoints.
 */

export const sendSuccess = (
  res,
  { statusCode = 200, message = 'Success', data = null, meta = null } = {}
) => {
  const responsePayload = {
    success: true,
    message,
    ...(data !== null && { data }),
    ...(meta !== null && { meta })
  };

  return res.status(statusCode).json(responsePayload);
};

export const sendError = (
  res,
  { statusCode = 500, message = 'Internal Server Error', errors = null, stack = null } = {}
) => {
  const responsePayload = {
    success: false,
    message,
    ...(errors !== null && { errors }),
    ...(stack !== null && process.env.NODE_ENV !== 'production' && { stack })
  };

  return res.status(statusCode).json(responsePayload);
};

