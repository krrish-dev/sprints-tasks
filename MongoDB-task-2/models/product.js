const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
});

module.exports = mongoose.model('Product', productSchema);