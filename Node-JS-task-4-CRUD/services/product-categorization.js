import { fetchProducts } from "../models/products.js";
import { fetchRate } from "../models/rates.js";

const groupWithCategory = (products) => {
  const categorized = {};

  products.forEach((element) => {
    if (categorized[element.category.id]) {
      categorized[element.category.id].products.push(element);
    } else {
      categorized[element.category.id] = {
        category: {
          id: element.category.id,
          name: element.category.name,
        },
        products: [element],
      };
    }
  });

  return Object.values(categorized);
};

const transferCurrency = (products, rate) => {
  return products.map((el) => ({ ...el, price: el.price * rate }));
};

export const categorizeProducts = async (curr) => {
  const [products, rate] = await Promise.all([
    fetchProducts(),
    fetchRate(curr),
  ]);

  const transformedPrices = transferCurrency(products, rate);
  return groupWithCategory(transformedPrices);
};
