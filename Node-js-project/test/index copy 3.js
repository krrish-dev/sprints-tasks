// const express = require('express');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express();
// app.use(express.json());

// // Import routes
// const authRoutes = require('../routes/authRoutes');

// // Register routes
// app.use('/', authRoutes);

// app.listen(8080, () => {
//   console.log('Server started on http://localhost:8080');
// });

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const { createHash } = require('crypto');
// const { z } = require('zod');
// dotenv.config();

// const app = express();
// app.use(express.json());

// const users = [
//   {
//     id: 1,
//     email: 'krrish1@web.dev',
//     password: 'P@asword',
//     roles: ['products.read', 'products.list'],
//   },
//   {
//     id: 2,
//     email: 'test@test.com',
//     password: '12345',
//     roles: ['products.list'],
//   },
// ];

// const emailSchema = z.string().email();
// const passwordSchema = z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[!@#$%^&*()]/);



// const hash = (password) =>
//   createHash('sha256').update(password, 'utf-8').digest('hex');

//   app.post('/registration', (req, res) => {
//     try {
//       const { email, password, passwordRepeat } = req.body;
  
//       const emailValidation = emailSchema.safeParse(email);
//       const passwordValidation = passwordSchema.safeParse(password);
  
//       if (!emailValidation.success) {
//         res.status(400).json({ error: 'Invalid email' });
//         return;
//       }
  
//       if (!passwordValidation.success) {
//         res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character' });
//         return;
//       }
  
//       if (password !== passwordRepeat) {
//         res.status(400).json({ error: 'Passwords do not match' });
//         return;
//       }
  
//       const userExists = users.some((user) => user.email === email);
//       if (userExists) {
//         res.status(409).json({ error: 'User already exists' });
//         return;
//       }
  
//       const hashedPassword = hash(password);
  
//       users.push({ email, password: hashedPassword });
  
//       res.json({ success: true });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
  
//   app.post('/login', (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       const emailValidation = emailSchema.safeParse(email);
//       const passwordValidation = passwordSchema.safeParse(password);
  
//       if (!emailValidation.success) {
//         res.status(400).json({ error: 'Invalid email' });
//         return;
//       }
  
//       if (!passwordValidation.success) {
//         res.status(400).json({ error: 'Invalid password' });
//         return;
//       }
  
//       const user = users.find((user) => user.email === email);
  
//       if (!user || user.password !== hash(password)) {
//         return res
//           .status(401)
//           .json({ status: 'error', message: 'Unauthenticated' });
//       }
  
//       const token = jwt.sign(user, process.env.JWT_SECRET);
  
//       return res.status(200).json({ email, password, token });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   app.post('/logout', (req, res) => {
//     res.status(200).json({ message: 'Logged out successfully' });
//   });

// const verifyToken = (req, res, next) => {
//   try {
//     const [_, token] = req.headers.authorization?.split(' ');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ status: 'error', message: 'Unauthenticated' });
//   }
// };

// const checkRoles = (role) => (req, res, next) => {
//   if (!req.user)
//     return res
//       .status(401)
//       .json({ status: 'error', message: 'Unauthenticated' });

//   if (!req.user.roles.includes(role))
//     return res.status(403).json({ status: 'error', message: 'Unauthorized' });

//   next();
// };

// const categories = [
//   { id: 1, name: 'category 1' },
//   { id: 2, name: 'category 2' },
// ];

// // Create a new category
// app.post('/category', verifyToken, (req, res) => {
//   try {
//     const { name } = req.body;

//     const nameValidation = z.string().min(3).safeParse(name);

//     if (!nameValidation.success) {
//       res.status(400).json({ error: 'Invalid category name , name must be string at least 3 min characters ' });
//       return;
//     }

//     const newCategory = { id: categories.length + 1, name };
//     categories.push(newCategory);

//     res.status(201).json({ success: true, category: newCategory });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Update a category by ID
// app.put('/category/:id', verifyToken, (req, res) => {
//   try {
//     const categoryId = parseInt(req.params.id);
//     const { name } = req.body;

//     const nameValidation = z.string().min(3).safeParse(name);

//     if (!nameValidation.success) {
//       res.status(400).json({ error: 'Invalid category name , name must be string at least 3 min characters' });
//       return;
//     }

//     const category = categories.find((cat) => cat.id === categoryId);
//     if (!category) {
//       res.status(404).json({ error: 'Category not found' });
//       return;
//     }

//     category.name = name;

//     res.json({ success: true, category });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get all categories
// app.get('/category', verifyToken, (req, res) => {
//   try {
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get a category by ID
// app.get('/category/:id', verifyToken, (req, res) => {
//   try {
//     const categoryId = parseInt(req.params.id);

//     const category = categories.find((cat) => cat.id === categoryId);
//     if (!category) {
//       res.status(404).json({ error: 'Category not found' });
//       return;
//     }

//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Delete a category by ID
// app.delete('/category/:id', verifyToken, (req, res) => {
//   try {
//     const categoryId = parseInt(req.params.id);

//     const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
//     if (categoryIndex === -1) {
//       res.status(404).json({ error: 'Category not found' });
//       return;
//     }

//     const deletedCategory = categories.splice(categoryIndex, 1)[0];

//     res.json({ success: true, category: deletedCategory });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });





// const products = [
//   { id: 1, name: 'product 1' , price : 10 , category_id : 1},
//   { id: 2, name: 'product 2' , price : 10 , category_id : 2},
// ];

// const productSchema = z.object({
//   name: z.string().min(3),
//   price: z.number().positive(),
//   category_id: z.number().refine((value) =>
//     categories.some((category) => category.id === value)
//   ),
// });
// // Create a new product
// app.post('/products', verifyToken, (req, res) => {
//   try {
//     const { name, price, category_id } = req.body;

//     const productValidation = productSchema.safeParse({
//       name,
//       price,
//       category_id,
//     });

//     if (!productValidation.success) {
//       res.status(400).json({ error: 'Invalid product data' });
//       return;
//     }

//     const newProduct = {
//       id: products.length + 1,
//       name: productValidation.data.name,
//       price: productValidation.data.price,
//       category_id: productValidation.data.category_id,
//     };
//     products.push(newProduct);

//     res.status(201).json({ success: true, product: newProduct });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Update a product by ID
// app.put('/products/:id', verifyToken, (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);
//     const { name, price, category_id } = req.body;

//     const productValidation = productSchema.safeParse({
//       name,
//       price,
//       category_id,
//     });

//     if (!productValidation.success) {
//       res.status(400).json({ error: 'Invalid product data' });
//       return;
//     }

//     const product = products.find((prod) => prod.id === productId);
//     if (!product) {
//       res.status(404).json({ error: 'Product not found' });
//       return;
//     }

//     product.name = productValidation.data.name;
//     product.price = productValidation.data.price;
//     product.category_id = productValidation.data.category_id;

//     res.json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get all products
// app.get('/products', (req, res) => {
//   try {
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get a product by ID
// app.get('/products/:id', (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);

//     const product = products.find((prod) => prod.id === productId);
//     if (!product) {
//       res.status(404).json({ error: 'Product not found' });
//       return;
//     }

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Delete a product by ID
// app.delete('/products/:id', (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);

//     const productIndex = products.findIndex((prod) => prod.id === productId);
//     if (productIndex === -1) {
//       res.status(404).json({ error: 'Product not found' });
//       return;
//     }

//     const deletedProduct = products.splice(productIndex, 1)[0];

//     res.json({ success: true, product: deletedProduct });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.listen(8080, () => {
//   console.log('Server started on http://localhost:8080');
// });
