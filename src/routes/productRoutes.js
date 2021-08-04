const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");

// Create product
router.post("/", async (req, res) => {
  const { name, description, price, stock, digitalProduct, ownerId } = req.body;
  let newProduct = { name, description, price, stock, digitalProduct, ownerId };
  for (const [key, value] of Object.entries(newProduct)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }
  try {
    await User.findById(req.body.ownerId);
    try {
      newProduct = new Product(newProduct);

      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(404).json("User not found");
  }
});

// Get product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json("Product not found");
  }
});

// Update Product
router.patch("/:productId", async (req, res) => {
  const { ownerId } = req.body;
  let newProduct = { ownerId };
  for (const [key, value] of Object.entries(newProduct)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }
  try {
    const product = await Product.findById(req.params.productId);
    if (product.ownerId == ownerId) {
      try {
        const productInfoToUpdate = await Product.findByIdAndUpdate(
          req.params.productId,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(productInfoToUpdate);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You do not have permission to update this product");
    }
  } catch (err) {
    res.status(404).json("Product not found");
  }
});

// Delete product
router.delete("/:productId", async (req, res) => {
  const { ownerId } = req.body;
  let newProduct = { ownerId };
  for (const [key, value] of Object.entries(newProduct)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }
  try {
    const product = await Product.findById(req.params.productId);
    if (product.ownerId == ownerId) {
      try {
        await Product.findById(req.params.productId);
        try {
          await Product.findByIdAndDelete(req.params.productId);
          res.status(200).json("Product deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("Product not found");
      }
    } else {
      res.status(401).json("You do not have permission to update this product");
    }
  } catch (err) {
    res.status(404).json("Product not found");
  }
});

// Get all products by owner
router.get("/owner-products/:ownerId", async (req, res) => {
  try {
    await User.findById(req.params.ownerId);
    try {
      let ownerId = req.params.ownerId;
      const allProducts = await Product.find({ ownerId });
      res.status(200).json(allProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(404).json("User not found");
  }
});

module.exports = router;
