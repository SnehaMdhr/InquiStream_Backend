// authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization'); // Use `get` instead of `header` in Express.js

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server error: JWT_SECRET is not defined.' });
    }

    // Verify token and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object

    // Log the decoded token to check user data
    console.log('Decoded user data:', req.user);

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token. Authentication failed.' });
    } else {
      // Catch all errors and return a generic message
      return res.status(500).json({ message: 'Server error: Authentication failed.' });
    }
  }
};

// Optional middleware to check user role
export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
    }
    next();
  };
};