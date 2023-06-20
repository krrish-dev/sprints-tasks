import { _fetch } from "../utils.js";

export const createProduct = async (product) => {
  return _fetch("https://api.escuelajs.co/api/v1/products", "POST", {
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchProducts = async () =>
  _fetch("https://api.escuelajs.co/api/v1/products");

export const fetchProduct = async (id) =>
  _fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

export const updateProduct = async (id, product) => {
  return _fetch(`https://api.escuelajs.co/api/v1/products/${id}`, "PUT", {
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProduct = async (id) =>
  _fetch(`https://api.escuelajs.co/api/v1/products/${id}`, "DELETE");
