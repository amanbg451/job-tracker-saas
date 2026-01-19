const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2️⃣ If no token
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Get user from DB (without password)
    req.user = await User.findById(decoded.userId).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = authMiddleware;
