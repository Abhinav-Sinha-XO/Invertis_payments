const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Authorization header is required"
    });
  }
  
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = { authMiddleware };