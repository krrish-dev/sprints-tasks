const axios = require('axios');

// Fetches the exchange rate between USD and EGP
async function fetchExchangeRate() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const exchangeRate = response.data.rates.EGP;
    return exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
}

// Updates the prices of products based on the exchange rate
function updateProductPrices(products, exchangeRate) {
  products.forEach((product) => {
    product.price *= exchangeRate;
  });
}

// Fetches the products from the API
async function fetchProducts() {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=5');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Categorizes the products based on their category
function categorizeProducts(products) {
  const categorizedProducts = {};

  products.forEach((product) => {
    const { category } = product;
    if (!categorizedProducts[category.name]) {
      categorizedProducts[category.name] = {
        category: {
          id: category.id,
          name: category.name,
        },
        products: [],
      };
    }
    categorizedProducts[category.name].products.push(product);
  });

  return Object.values(categorizedProducts);
}

// Main function for fetching, categorization, and updating of products
async function main() {
  try {
    const products = await fetchProducts(); // Fetch products from the API
    const categorizedProducts = categorizeProducts(products); // Categorize the products
    const exchangeRate = await fetchExchangeRate(); // Fetch the exchange rate

    updateProductPrices(products, exchangeRate); // Update the product prices based on the exchange rate

    categorizedProducts.forEach((category) => {
      console.log('Category:', category.category);
      console.log('Products:', category.products);
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();  
