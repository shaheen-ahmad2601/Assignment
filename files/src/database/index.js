import mongoose from 'mongoose'
import usersModel from './model/users.js'

/**
 * Connects to the MongoDB database using Mongoose.
 * Returns an object with the users model.
 * @returns {Object} - Object with the users model
 */
export default async function () {
  // Connect to the MongoDB database
  await mongoose.connect('mongodb+srv://m74:jerry123@cluster0.pm0jwkh.mongodb.net/facebook?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // Return an object with the users model
  return { usersModel }
}
