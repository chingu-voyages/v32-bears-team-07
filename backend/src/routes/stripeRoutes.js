const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.Stripe_Secret_Key);

const calculateOrderAmount = (items) => {
  // Actually calculate the total
  // Temp returning the price of $10
  // Everything is in cent
  return 1500;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
