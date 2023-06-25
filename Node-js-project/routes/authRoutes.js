const express = require('express');
const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');
const { verifyToken } = require('../services/AuthService');
const router = express.Router();

router.post('/registration', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);



//  categories routes
router.post('/category', verifyToken, CategoryController.createCategory);
router.put('/category/:id', verifyToken, CategoryController.updateCategory);
router.get('/category', verifyToken, CategoryController.getAllCategories);
router.get('/category/:id', verifyToken, CategoryController.getCategoryById);
router.delete('/category/:id', verifyToken, CategoryController.deleteCategory);


// Product routes
router.post('/products', verifyToken, ProductController.createProduct);
router.put('/products/:id', verifyToken, ProductController.updateProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.delete('/products/:id', verifyToken, ProductController.deleteProduct);

module.exports = router;