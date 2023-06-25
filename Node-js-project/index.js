const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');

// Register routes
app.use('/', authRoutes);

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});

 