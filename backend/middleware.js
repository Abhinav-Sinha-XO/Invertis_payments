const {JWT_SECRET} =require('dotenv').config()
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if( !authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({
      message: "Authorization header is required"
    })
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(decoded.userId){
      req.userId = decoded.userId
      return next()
    }
    
  } catch (err) {
    return res.status(403).json({})

    
  }
}
module.exports = {authMiddleware}