import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) return next();

  // Hash the password using bcrypt
  this.password = bcrypt.hashSync(this.password, 5);

  return next();
});

// Method to check if a provided password matches the user's hashed password
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Create and export the User model
export default mongoose.model('users', userSchema);
