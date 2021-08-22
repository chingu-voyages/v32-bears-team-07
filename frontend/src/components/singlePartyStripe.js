import React, { useState } from "react";
import "./singlePartyStripe.css";
import StripeCheckout from "react-stripe-checkout";

const SinglePartyStripe = () => {
  const [product, setProduct] = useState({
    name: "Test Product",
    price: 10,
    productBy: "Human437",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    // When hosted using https
    return fetch(`http://localhost:5000/api/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("response", response);
        const { status } = response;
        console.log("status", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* You must have a stripeKey and token */}
        <StripeCheckout
          stripeKey={process.env.REACT_APP_Stripe_Public_Key}
          token={makePayment}
          name="Buy test product"
          amount={product.price * 100}
        >
          <button className="btn-large pink">Buy {product.name}</button>
        </StripeCheckout>
      </header>
    </div>
  );
};

export default SinglePartyStripe;
