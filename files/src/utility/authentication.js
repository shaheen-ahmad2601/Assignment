import { verifyToken } from './encryption.js'

/**
 * Middleware function to authenticate and authorize requests using a JWT token.
 * It checks for a valid token in the 'Authorization' header and verifies its validity.
 * If the token is valid, it attaches the decoded user object to the request object.
 * Otherwise, it sends an appropriate error response.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export default async function (req, res, next) {
  // Check if 'Authorization' header exists
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: 'Authorization token was not provided or was not valid.'
    })
  }

  // Check if 'Authorization' header starts with 'Bearer '
  if (!req.headers.authorization.startsWith('Bearer ')) {
    return res.status(400).json({
      message: 'Authorization token was not provided or was not valid.'
    })
  }

  // Extract the token from the 'Authorization' header
  const token = req.headers.authorization.split(' ')[1]

  let user
  try {
    // Verify the token and get the user object
    user = await verifyToken(token)
  } catch (err) {
    return res.status(400).json({
      message: 'Authorization token was not provided or was not valid.'
    })
  }

  // Attach the user object to the request object for further processing
  req.user = user.user

  // Proceed to the next middleware or route handler
  return next()
}
