const router = require("express").Router();
const Product = require("../models/Product")

// Create product
router.post("/",async (req,res) => {
    try{
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            digitalProduct: req.body.digitalProduct
        })

        const product = await newProduct.save();
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err)
    }
})

// Get product
router.get("/:productId", async (req,res) => {
    try{
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    }catch(err){
        res.status(404).json("Product not found")
    }
})

// Delete product
router.delete("/:productId", async (req,res) => {
    try{
        await Product.findById(req.params.productId);
        try{
            await Product.findByIdAndDelete(req.params.productId);
            res.status(200).json("Product deleted")
        }catch(err){
            res.status(404).json(err)
        }
    }catch(err){
        res.status(404).json("Product not found")
    }
})

module.exports = router;