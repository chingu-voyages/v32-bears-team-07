const router = require("express").Router();
const Order = require("../models/Order");
const User = reqruie("../models/User");

// Create order
router.post("/", async (req, res) => {
  const { userId, orderItems, total } = req.body;
  let newOrder = { userId, orderItems, total };
  for (const [key, value] of Object.entries(newOrder)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }
  try {
    await User.findById(userId);
    try {
      newOrder = new Order(newOrder);

      const order = await newOrder.save();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(404).json("User not found");
  }
});

// Get order by id
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (err) {
    res.status(404).json("Order not found");
  }
});
