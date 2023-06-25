const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const { z } = require('zod');
const dotenv = require('dotenv');
dotenv.config();

const emailSchema = z.string().email();
const passwordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/)
  .regex(/[a-z]/)
  .regex(/[!@#$%^&*()]/);

const users = [
  {
    id: 1,
    email: 'krrish1@web.dev',
    password: 'P@asword',
    roles: ['products.read', 'products.list'],
  },
  {
    id: 2,
    email: 'test@test.com',
    password: '12345',
    roles: ['products.list'],
  },
];

const hashPassword = (password) =>
  createHash('sha256').update(password, 'utf-8').digest('hex');

const registerUser = (req, res) => {
  try {
    const { email, password, passwordRepeat } = req.body;

    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    if (!emailValidation.success) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (!passwordValidation.success) {
      return res.status(400).json({
        error:
          'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character',
      });
    }

    if (password !== passwordRepeat) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = hashPassword(password);

    users.push({ email, password: hashedPassword });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    if (!emailValidation.success) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (!passwordValidation.success) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const user = users.find((user) => user.email === email);

    if (!user || user.password !== hashPassword(password)) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Unauthenticated' });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET);

    return res.status(200).json({ email, password, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logoutUser = (req, res) => {
  // Since this is a stateless authentication mechanism, there is no actual "logout" action required.
  // Clients can simply discard or invalidate the token on their side.
  res.status(200).json({ message: 'Logged out successfully' });
};

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
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
};
