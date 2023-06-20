import {
  createProduct,
  fetchProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
} from "../models/products.js";

export const createProductController = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.send({ newProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await fetchProduct(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProduct(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
