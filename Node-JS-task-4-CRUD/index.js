import express, { json } from "express";
import {
  validateProduct,
  validateProductUpdate,
} from "./services/validate-product.js";
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "./controllers/products.js";
import { categorizeProducts } from "./services/product-categorization.js";

const app = express();
app.use(json());

// GET /products route for categorizing products
app.get("/products", async (req, res) => {
  const cur = req.query.cur;
  if (cur) {
    return res.json(await categorizeProducts(cur));
  }
  // Handle other cases or return an appropriate response
  res.status(400).send("you must add Query string /products/?cur=EGP , for list product /products/all");
});

// GET /products route for fetching all products
app.get("/products/all", getProductsController);

// GET /products/:id route for fetching a single product
app.get("/products/:id", getProductController);

// POST /products route for creating a new product
app.post("/products", validateProduct, createProductController);

// PUT /products/:id route for updating a product
app.put("/products/:id", validateProductUpdate, updateProductController);

// DELETE /products/:id route for deleting a product
app.delete("/products/:id", deleteProductController);

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
