const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  purchaseProduct,
} = require('../controllers/productController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.post('/', authenticateUser, createProduct);
router.put('/:productId', authenticateUser, updateProduct);
router.delete('/:productId', authenticateUser, deleteProduct);
router.post('/:userId/products/:productId', authenticateUser, purchaseProduct);

module.exports = router;
