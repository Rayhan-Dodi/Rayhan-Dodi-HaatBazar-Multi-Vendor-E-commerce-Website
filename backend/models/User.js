const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin', 'moderator'],
      default: 'buyer',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profile: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String },
      avatar: { type: String }, // URL to profile image
    },
    sellerProfile: {
      shopName: { type: String },
      shopDescription: { type: String },
      shopLogo: { type: String }, // URL to shop logo
      isVerified: { type: Boolean, default: false },
    },
    wallet: {
      balance: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a JWT token
userSchema.methods.generateAuthToken = function () {
  const payload = {
    id: this._id,
    role: this.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Static method to check role-based access
userSchema.statics.hasAccess = function (userRole, requiredRole) {
  const roles = ['buyer', 'seller', 'moderator', 'admin'];
  return roles.indexOf(userRole) >= roles.indexOf(requiredRole);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
