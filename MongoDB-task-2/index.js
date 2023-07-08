const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

 
// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // Log when MongoDB is connected
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  
  // Log if there's an error connecting to MongoDB
  mongoose.connection.on('error', (error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
  
// Create Express app
const app = express();
app.use(express.json());

// Define routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

