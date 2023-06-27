const { z } = require('zod');
const { categories } = require('../models/Category'); // Import the categories array
const { products } = require('../models/Product'); // Import the products array

const productSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  category_id: z.number().refine((value) =>
    categories.some((category) => category.id === value)
  ),
});

const createProduct = (req, res) => {
  try {
    const { name, price, category_id } = req.body;

    const productValidation = productSchema.safeParse({
      name,
      price,
      category_id,
    });

    if (!productValidation.success) {
      res.status(400).json({ error: 'Invalid product data', details: productValidation.error });
      return;
    }

    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = {
      id: lastProductId + 1,
      name: productValidation.data.name,
      price: productValidation.data.price,
      category_id: productValidation.data.category_id,
    };

    products.push(newProduct);

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the product', details: error.message });
  }
};


const updateProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, price, category_id } = req.body;

    const productValidation = productSchema.safeParse({
      name,
      price,
      category_id,
    });

    if (!productValidation.success) {
      res.status(400).json({ error: 'Invalid product data', details: productValidation.error });
      return;
    }

    const product = products.find((prod) => prod.id === productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    product.name = productValidation.data.name;
    product.price = productValidation.data.price;
    product.category_id = productValidation.data.category_id;

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the product', details: error.message });
  }
};

const getAllProducts = (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the products', details: error.message });
  }
};

const getProductById = (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = products.find((prod) => prod.id === productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the product', details: error.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const productIndex = products.findIndex((prod) => prod.id === productId);
    if (productIndex === -1) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    res.json({ success: true, product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the product', details: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
