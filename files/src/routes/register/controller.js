import { createToken } from '../../utility/encryption.js'

/**
 * Controller function for the register route.
 * Registers a new user by creating a user document in the database.
 * Generates a JWT token for the registered user.
 * @param {Object} database - Database object or connection
 * @returns {Function} - Express middleware function
 */
export default function (database) {
  return async (req, res) => {
    const { usersModel } = database

    try {
      // Check if the user already exists in the database
      const existing = await usersModel.findOne({ email: req.body.email }).lean().exec()

      if (existing) {
        return res.status(400).send({ message: 'User is already registered' })
      }

      // Create a new user document in the database
      const rawUser = await usersModel.create(req.body)
      const user = fixJson(rawUser)

      // Generate a JWT token for the registered user
      const token = createToken(user)

      // Return the user and token as a response
      res.status(200).json({
        user,
        token
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: err.message
      })
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
