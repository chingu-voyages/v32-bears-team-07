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

module.exports = router;