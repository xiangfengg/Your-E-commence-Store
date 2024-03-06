import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  // let token;

  // Read JWT from the 'jwt' cookie from the generatetoken file  
 let token = req.cookies.jwt;

  if (token) {
    try {
      //decode and verify , if valid return decoded payload 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //queries the db to find user with matching userId , select(-password )ensure user object do not return password and attach it to req object making it available for the subsequent middleware 
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
