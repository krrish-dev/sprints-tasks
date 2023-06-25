const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

 
const verifyToken = (req, res, next) => {
    const [_, token] = req.headers.authorization?.split(' ');
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
        return res
        .status(401)
        .json({ status: 'error', message: 'Unauthenticated' });
    }
  };

  
module.exports = {
  verifyToken,
};
