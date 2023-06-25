const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const app = express();
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[!@#$%^&*()]/);


const users = {};

app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    if (!emailValidation.success) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    if (!passwordValidation.success) {
      res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character' });
      return;
    }

    const user = users[email];
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret');

    res.json({ email, password, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/registration', (req, res) => {
  try {
    const { email, password, passwordRepeat } = req.body;

    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    const errors = {};

    if (!emailValidation.success) {
      errors.email = 'Invalid email format';
    }

    if (!passwordValidation.success) {
      errors.password = 'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character';
    }

    if (password !== passwordRepeat) {
      errors.passwordRepeat = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ error: errors });
      return;
    }

    if (users[email]) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    users[email] = { email, password: hashedPassword };

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Middleware to check if user is logged in
const checkLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/category', checkLoggedIn, (req, res) => {
  try {
    const { name } = req.body;

    const nameValidation = z.string().min(3).safeParse(name);

    if (!nameValidation.success) {
      res.status(400).json({ error: 'Name must be a string with at least 3 characters' });
      return;
    }

    // Create and save the category
    const categoryId = generateCategoryId();
    const category = { id: categoryId, name };
    categories[categoryId] = category;

    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/category/:id', checkLoggedIn, (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const nameValidation = z.string().min(3).safeParse(name);

    if (!nameValidation.success) {
      res.status(400).json({ error: 'Name must be a string with at least 3 characters' });
      return;
    }

    // Check if the category exists
    if (!categories[id]) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    // Update the category name
    categories[id].name = name;

    res.json(categories[id]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/category', checkLoggedIn, (req, res) => {
  try {
    // Get the list of categories
    const categoryList = Object.values(categories);

    res.json(categoryList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/category/:id', checkLoggedIn, (req, res) => {
  try {
    const { id } = req.params;

    // Check if the category exists
    if (!categories[id]) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    // Get the category with the specified id
    const category = categories[id];

    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/category/:id', checkLoggedIn, (req, res) => {
  try {
    const { id } = req.params;

    // Check if the category exists
    if (!categories[id]) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    // Delete the category
    const deletedCategory = categories[id];
    delete categories[id];

    res.json(deletedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
