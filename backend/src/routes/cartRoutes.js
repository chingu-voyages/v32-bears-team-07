const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const requireAuth = require('../middleware/jwt-auth');

// Get all cart products by customer
router.get("/", requireAuth, async (req, res) => {
    try {
        let customerId = req.params._id;
        const allCartProducts = await Cart.find({ customerId });
        res.status(200).json(allCartProducts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Add product to cart
router.post("/", async (req, res) => {
    const { name, img, description, company, price, stock, digitalProduct, rating, ownerId, customerId } = req.body;
    let newCartProduct = { name, img, description, company, price, stock, digitalProduct, rating, ownerId, customerId };
    for (const [key, value] of Object.entries(newCartProduct)) {
        if (value == null) {
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body` },
            });
        }
    }
    try {
        await User.findById(req.body.customerId);
        try {
            newCartProduct = new Cart(newCartProduct);

            const product = await newCartProduct.save();
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(404).json("User not found");
    }
});

// Delete product in cart
router.delete("/:productCartId", async (req, res) => {
    try {
        try {
            await Product.findById(req.params.productId);
            try {
                await Product.findByIdAndDelete(req.params.productCartId);
                res.status(200).json("Product deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("Product not found");
        }

    } catch (err) {
        res.status(404).json("Product not found");
    }
});

module.exports = router;