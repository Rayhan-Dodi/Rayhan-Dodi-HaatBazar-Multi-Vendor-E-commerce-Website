const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const { sendOtpEmail, verifyOtp } = require('../utils/otpUtils');

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, name, phone } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
      profile: { name, phone },
    });

    // Save user to database
    await user.save();

    // Send OTP for email verification
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false });
    await sendOtpEmail(email, otp);

    // Save OTP and set expiry time
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

    res.status(201).json({ message: 'User registered successfully. Check your email for OTP.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// OTP verification route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Verify OTP
    if (otp !== user.resetPasswordToken) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, allow the user to proceed
    user.isActive = true; // Mark the user as verified
    user.resetPasswordToken = null; // Clear the OTP
    user.resetPasswordExpires = null; // Clear expiry time
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is active (verified through OTP)
    if (!user.isActive) {
      return res.status(400).json({ message: 'Please verify your email using OTP before logging in.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
