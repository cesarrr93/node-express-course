const express = require("express");
const { products } = require("./data");
const app = express();

//Middleware
app.use(express.static("./public")); //Serve static file (HTML,CSS,etc.)

// API Routes
app.get("/api/v1/test", (req, res) => {
  res.json({
    message: "This is a test API endpoint",
    status: "success",
    data: {
      version: "1.0",
      features: ["static", "api", "404"],
    },
  });
});

// get all products
app.get("/api/v1/products", (req, res) => {
  res.json({ products });
});

// Get single product by ID
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);

  // Check if the ID is a valid number
  if (isNaN(idToFind)) {
    return res.status(400).json({
      message: "Product ID must be a number",
    });
  }

  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({
      message: "That product was not found.",
    });
  }

  res.json({ product });
});

//Product query endpoint
app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice } = req.query; //req variables
  let filteredProducts = [...products]; //deconstructing array

  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  //Filter by maximum price
  if (maxPrice) {
    const maxPriceNum = parseFloat(maxPrice);
    if (!isNaN(maxPriceNum)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPriceNum
      );
    }
  }

  //Limit results
  if (limit) {
    const limitNum = parseInt(limit);
    if (!isNaN(limitNum)) {
      filteredProducts = filteredProducts.slice(0, limitNum);
    }
  }

  if (filteredProducts.length === 0) {
    return res.status(200).json({
      message: "No products match your search criteria",
      products: [],
    });
  }

  res.json({ products: filteredProducts });
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
