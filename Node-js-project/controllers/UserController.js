const AuthService = require('../services/AuthService');

const registerUser = (req, res) => {
  AuthService.registerUser(req, res);
};

const loginUser = (req, res) => {
  AuthService.loginUser(req, res);
};

const logoutUser = (req, res) => {
  AuthService.logoutUser(req, res);
};

 

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
 
};
