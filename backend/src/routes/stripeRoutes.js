const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.Stripe_Secret_Key);
const { v4: uuidv4 } = require("uuid");

router.post("/", (req, res) => {
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);
  // Created to ensure that the customer is only charged once
  const idempotencyKey = uuidv4();

  // First create customer
  return (
    stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      // When customer is created successfully, charge the customer
      .then((customer) => {
        stripe.charges.create(
          {
            // Refer to doc to determine what is required and what is optional
            // Everything is in cent so multiply by 100
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            // Sends client an email after the charge goes through
            receipt_email: token.email,
            description: `Thanks for buying ${product.name}`,
            shipping: {
              name: token.card.name,
              address: {
                country: token.card.address_country,
              },
            },
          },
          { idempotencyKey }
        );
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err))
  );
});

module.exports = router;
