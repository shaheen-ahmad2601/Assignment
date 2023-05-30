import jwt from 'jsonwebtoken'

// Set the private key for JWT token generation and verification
const privateKey = process.env.ENCRYPTION_KEY || 'some random salt'

/**
 * Creates a JWT token using the provided data and private key.
 * @param {Object} data - Data to be included in the token
 * @returns {string} - Generated JWT token
 */
export function createToken (data) {
  return jwt.sign(data, privateKey)
}

/**
 * Verifies and decodes a JWT token using the provided private key.
 * @param {string} token - JWT token to be verified
 * @returns {Object} - Decoded token payload
 */
export function verifyToken (token) {
  return jwt.verify(token, privateKey)
}

// Export the functions as default
export default { createToken, verifyToken }
