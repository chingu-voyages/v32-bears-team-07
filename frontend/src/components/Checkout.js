import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./checkout.css";

const promise = loadStripe(process.env.REACT_APP_Stripe_Public_Key);
export default function Checkout() {
  return (
    <div className="Checkout">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
