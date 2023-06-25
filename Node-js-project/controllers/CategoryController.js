const { z } = require('zod');
const { categories } = require('../models/Category');
 

const createCategory = (req, res) => {
  try {
    const { name } = req.body;

    const nameValidation = z.string().min(3).safeParse(name);

    if (!nameValidation.success) {
      res.status(400).json({ error: 'Invalid category name, name must be a string with at least 3 characters' });
      return;
    }

    const newCategory = { id: categories.length + 1, name };
    categories.push(newCategory);

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCategory = (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { name } = req.body;

    const nameValidation = z.string().min(3).safeParse(name);

    if (!nameValidation.success) {
      res.status(400).json({ error: 'Invalid category name, name must be a string with at least 3 characters' });
      return;
    }

    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    category.name = name;

    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllCategories = (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryById = (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategory = (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
    if (categoryIndex === -1) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const deletedCategory = categories.splice(categoryIndex, 1)[0];

    res.json({ success: true, category: deletedCategory });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
