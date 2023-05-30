import express from 'express'
import buildRoutes from './routes/index.js'
import buildDatabase from './database/index.js'

/**
 * Builds and configures the Express application.
 * Initializes the database connection and sets up the routes.
 * @returns {Object} - Express application object
 */
export default async function () {
  const app = express()

  // Middleware to parse JSON data
  app.use(express.json())

  // Build the database connection
  const database = await buildDatabase()

  // Build the routes using the database connection
  const routes = buildRoutes(database)

  // Mount the routes in the Express app
  app.use(routes)

  return app
}
