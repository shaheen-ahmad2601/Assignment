import { createToken } from '../../utility/encryption.js'

/**
 * Controller function for the login route.
 * Authenticates a user by checking their email and password against the stored user data.
 * Generates a JWT token upon successful authentication.
 * @param {Object} database - Database object or connection
 * @returns {Function} - Express middleware function
 */
export default function (database) {
  return async (req, res) => {
    const { usersModel } = database

    try {
      // Find the user in the database based on their email
      const rawUser = await usersModel.findOne({ email: req.body.email })

      // Check if user exists
      if (!rawUser) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      // Check if the provided password matches the user's password
      const match = rawUser.checkPassword(req.body.password)

      // Check if passwords match
      if (!match) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      // Convert the user object to a plain JavaScript object
      const user = fixJson(rawUser)

      // Generate a JWT token for the authenticated user
      const token = createToken(user)

      // Return the user and token as a response
      res.status(200).json({ user, token })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
}

/**
 * Helper function to fix JSON serialization/deserialization issues.
 * Converts an object to JSON and then parses it back to ensure it's a plain JavaScript object.
 * @param {Object} object - Object to be fixed
 * @returns {Object} - Fixed object
 */
const fixJson = (object) => JSON.parse(JSON.stringify(object))
