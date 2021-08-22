const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.Stripe_Secret_Key);
const { v4: uuidv4 } = require("uuid");

// Route for single party stripe integration
router.post("/", (req, res) => {
  const { product, token } = req.body;
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

// Helper function for endpoints to follow
function generateAccountLink(accountID, origin) {
  return stripe.accountLinks
    .create({
      type: "account_onboarding",
      account: accountID,
      refresh_url: `${origin}/onboard-user/refresh`,
      return_url: `${origin}/success.html`,
    })
    .then((link) => link.url);
}

// Multiparty stripe integration with standard connect account
router.post("/onboard-user", async (req, res) => {
  try {
    const account = await stripe.accounts.create({ type: "standard" });
    req.session.accountID = account.id;

    const origin = `${req.headers.origin}`;
    const accountLinkURL = await generateAccountLink(account.id, origin);
    res.send({ url: accountLinkURL });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.get("/onboard-user/refresh", async (req, res) => {
  if (!req.session.accountID) {
    res.redirect("/");
    return;
  }
  try {
    const { accountID } = req.session;
    const origin = `${req.secure ? "https://" : "https://"}${req.headers.host}`;

    const accountLinkURL = await generateAccountLink(accountID, origin);
    res.redirect(accountLinkURL);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = router;
