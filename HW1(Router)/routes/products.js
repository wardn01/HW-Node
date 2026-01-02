// ward najjar 325523017
// mohammed ryan 327640835
// 50/2

const express = require("express");
const router = express.Router();
const data = require("../data");

// Middleware
// This function checks the validity of data before creating a new product
const validateProduct = (req, res, next) => {
  const { id, name, price, stock } = req.body;
  // Check if ID is provided
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  // Check if ID already exists (to prevent duplicates)
  if (data.products.some((p) => p.id === id)) {
    return res.status(400).json({ message: "ID already exists" });
  }
  // Check if Name is provided
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  // Check that Price is a positive number
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }
  // Check that Stock is a positive number or zero
  if (typeof stock !== "number" || stock < 0) {
    return res
      .status(400)
      .json({ message: "Stock must be a positive number or zero" });
  }
  // If everything is valid, proceed to the next function (controller)
  next();
};

// Middleware
// It checks values only if they are provided in the request body
const validateUpdate = (req, res, next) => {
  const { price, stock } = req.body;
  // Check price only if provided by the user
  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }
  // Check stock only if provided by the user
  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return res
      .status(400)
      .json({ message: "Stock must be a positive number or zero" });
  }
  next();
};

// GET /api/products
// Return a list of all products
router.get("/", (req, res) => {
  res.json({ products: data.products });
});

// GET /api/products/:id
// Return a specific product by its ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((item) => item.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: `Product with ID: ${id} not found` });
  }
});

// POST /api/products
// Add a new product , Uses the validateProduct middleware
router.post("/", validateProduct, (req, res) => {
  const { id, name, price, stock } = req.body;
  const newProduct = { id, name, price, stock };
  data.products.push(newProduct);
  res
    .status(201)
    .json({ message: "Product added successfully", product: newProduct });
});

// PUT /api/products/:id
// Update an existing product ,  Uses the validateUpdate middleware
router.put("/:id", validateUpdate, (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );
  if (productInd !== -1) {
    const currentProduct = data.products[productInd];
    // Update Name if provided
    currentProduct.name = productData.name || currentProduct.name;
    // Update Price if provided (Validation handled by middleware)
    currentProduct.price =
      productData.price !== undefined
        ? productData.price
        : currentProduct.price;
    // Update Stock if provided (Validation handled by middleware)
    currentProduct.stock =
      productData.stock !== undefined
        ? productData.stock
        : currentProduct.stock;
    res.json({
      message: `Product with ID: ${id} updated`,
      product: currentProduct,
    });
  } else {
    res.status(404).json({ message: `Product with ID: ${id} not found` });
  }
});

// DELETE /api/products/:id
// Delete a product by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );
  if (productInd !== -1) {
    // Remove the product from the array
    const deletedProduct = data.products[productInd];
    data.products.splice(productInd, 1);
    res.json({
      message: `Product with ID: ${id} deleted`,
      product: deletedProduct,
    });
  } else {
    res.status(404).json({ message: `Product with ID: ${id} not found` });
  }
});

module.exports = router;


