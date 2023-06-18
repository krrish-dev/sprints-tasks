const http = require('http');
const axios = require('axios');
const url = require('url');

//first  GET endpoint  =>  http://localhost:3000/products?CUR=EGP   EGP can be change to any currency 
//second  POST endpoint => http://localhost:3000/products  you can post any product  by this schema 
/*
{
  "title": "New Product title ",
  "price": 100,
  "description": "A description ",
  "categoryId": 1,
  "images": ["https://placeimg.com/640/480/any"]
}
*/
// Fetches the exchange rate between USD and the provided currency code
async function fetchExchangeRate(currencyCode) {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
    const exchangeRate = response.data.rates[currencyCode];
    return exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
}

// Updates the prices of products based on the exchange rate and currency code
function updateProductPrices(products, exchangeRate) {
  products.forEach((product) => {
    product.price *= exchangeRate;
  });
}

// Fetches the products from the API
async function fetchProducts(currencyCode) {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=5');
    const data = response.data;

    if (currencyCode) {
      const exchangeRate = await fetchExchangeRate(currencyCode);
      updateProductPrices(data, exchangeRate);
    }

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

// Create the server
const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/products' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      const newProduct = JSON.parse(body);
      try {
        // Validate the new product here...

        const response = await axios.post('https://api.escuelajs.co/api/v1/products/', newProduct);
        const createdProduct = response.data;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(createdProduct));
      } catch (error) {
        console.error('An error occurred:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'An error occurred' }));
      }
    });
  } else if (pathname === '/products') {
    const { CUR } = query;
    try {
      const products = await fetchProducts(CUR);
      const categorizedProducts = categorizeProducts(products);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(categorizedProducts));
    } catch (error) {
      console.error('An error occurred:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'An error occurred' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
