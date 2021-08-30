import React from "react";
import { Switch, Route } from "react-router-dom";
// import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import GrapesJS from "./components/GrapesJS";
// import UserDashboard from "./components/UserDashboard";
import Products from "./components/Products";
import Product from "./components/Product";
import PrivateRoute from "./components/Utils/PrivateRoute";
import PublicRoute from "./components/Utils/PublicRoute";
import CheckoutForm from "./components/CheckoutForm";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";

const App = () => {

  return (
    <div>
      <Header />
      <main className="py-3">

        <Route exact path="/" component={Products} />

        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={SignUp} />
          <PublicRoute exact path="/product" component={Product} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/thank-you" component={ThankYou} />
        </Switch>
      </main>

      <Footer />
    </div>
  );
};

export default App;
