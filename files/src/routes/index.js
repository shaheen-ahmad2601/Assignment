import { Router } from 'express'
import register from './register/controller.js'
import login from './login/controller.js'

/**
 * Creates and configures the routes for register and login.
 * @param {Object} database - Database object or connection
 * @returns {Object} - Express router object with register and login routes
 */
export default function (database) {
  const router = Router()

  // Register route
  // Calls the register controller passing the database object
  router.post('/register', register(database))

  // Login route
  // Calls the login controller passing the database object
  router.post('/login', login(database))

  return router
}
