const jwt = require('jsonwebtoken');

const passwordAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' expirsIn')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET); 
   
   req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};


module.exports = { passwordAuth}