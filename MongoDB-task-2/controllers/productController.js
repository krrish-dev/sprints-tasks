const Product = require('../models/product');
const User = require('../models/user');


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  const { name, price, rating } = req.body;

  try {
    // Create a new product
    const newProduct = new Product({ name, price, rating });

    await newProduct.save();

    res.json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, rating } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product
    product.name = name;
    product.price = price;
    product.rating = rating;
    await product.save();

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product
    await Product.deleteOne({ _id: productId });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// const purchaseProduct = async (req, res) => {
//   const { userId, productId } = req.params;

//   try {
//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     // Check if the user has already purchased the product
//     if (user.products.includes(productId)) {
//       return res.status(400).json({ error: 'Product already purchased' });
//     }

//     // Add the product to the user's purchased products
//     user.products.push(productId);
//     await user.save();

//     res.json({ message: 'Product purchased successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
const purchaseProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the user has already purchased the product
    if (user.products && user.products.includes(productId)) {
      return res.status(400).json({ error: 'Product already purchased' });
    }

    // Add the product to the user's purchased products
    if (!user.products) {
      user.products = [];
    }
    user.products.push(productId);
    await user.save();

    res.json({ message: 'Product purchased successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  purchaseProduct,
};
