const Product = require('../models/product');
const User = require('../models/user');


const getAllProducts = async (req, res) => {
  const { minRating, maxRating, page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  try {
    let query = Product.find();

    // Apply minimum rating filter
    if (minRating) {
      const minRatingNumber = parseInt(minRating);
      query = query.where('rating').gte(minRatingNumber);
    }

    // Apply maximum rating filter
    if (maxRating) {
      const maxRatingNumber = parseInt(maxRating);
      query = query.where('rating').lte(maxRatingNumber);
    }

    // Count total products matching the filter
    const totalProducts = await Product.countDocuments(query);

    // Apply pagination
    query = query.skip(skip).limit(limitNumber);

    // Execute the query
    const products = await query.exec();

    res.json({
      products,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / limitNumber),
    });
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
  const { title, price, rating, number_of_stocks } = req.body;

  try {
    // Create a new product
    const newProduct = new Product({ title, price, rating, number_of_stocks });

    const validationError = newProduct.validateSync();

    if (validationError) {
      const errors = {};
      for (let key in validationError.errors) {
        errors[key] = validationError.errors[key].message;
      }
      return res.status(400).json({ errors });
    }

    await newProduct.save();

    res.json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { title, price, rating, number_of_stocks } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product
    product.title = title;
    product.price = price;
    product.rating = rating;
    product.number_of_stocks = number_of_stocks;

    const validationError = product.validateSync();

    if (validationError) {
      const errors = {};
      for (let key in validationError.errors) {
        errors[key] = validationError.errors[key].message;
      }
      return res.status(400).json({ errors });
    }

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
    if (user.purchased_products && user.purchased_products.includes(productId)) {
      return res.status(400).json({ error: 'Product already purchased' });
    }

    // Check if the product is in stock
    if (product.number_of_stocks <= 0) {
      return res.status(400).json({ error: 'Product out of stock' });
    }

    // Decrement the number of product stocks
    product.number_of_stocks--;
    await product.save();

    // Add the product to the user's purchased products
    if (!user.purchased_products) {
      user.purchased_products = [];
    }
    user.purchased_products.push(productId);
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
