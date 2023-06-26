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
    console.log(req.user); // Log the req.user object
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Unauthenticated' });
  }
};

const checkRoles = (role) => (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ status: 'error', message: 'Unauthenticated' });

  if (!req.user.roles || !req.user.roles.includes(role))
    return res.status(403).json({ status: 'error', message: 'Unauthorized' });

  next();
};

module.exports = {
  verifyToken,
  checkRoles,
};
