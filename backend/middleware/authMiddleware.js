const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

// Middleware to verify JWT and extract user data
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify JWT token
  jwt.verify(token, config.get('jwtSecret'), async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Add user info to the request object
    req.user = decoded;
    next();
  });
};

// Middleware to check if the user has the required role(s)
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRoles };
