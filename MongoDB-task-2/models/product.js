const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   rating: Number,
// });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: Number,
  number_of_stocks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
