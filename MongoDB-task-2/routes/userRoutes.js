const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout/:userId', authenticateUser, logoutUser);

module.exports = router;
