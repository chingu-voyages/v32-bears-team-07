import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import GrapesJS from "./components/GrapesJS";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import Products from "./components/Products";
import Product from "./components/Product";
import PrivateRoute from "./components/Utils/PrivateRoute";
import PublicRoute from "./components/Utils/PublicRoute";
import CheckoutForm from "./components/CheckoutForm";

const App = () => {
  // const [displayLogin, setDisplayLogin] = useState(true);

  // const toggleDisplayLogin = () => {
  //   setDisplayLogin(!displayLogin);
  // };

  return (
    <div>
      <Header />
      <main className="py-3">
        {/* <Container>
          <h1>Welcome to popup shop</h1>

          <GrapesJS />
        </Container> */}

        {/* {displayLogin ? (
          <Login toggleDisplayLogin={toggleDisplayLogin} />
        ) : (
          <SignUp />
        )} */}

        <Switch>
          <PublicRoute exact path="/" component={Products} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={SignUp} />
          <PublicRoute exact path="/product" component={Product} />
          <PublicRoute exact path="/checkout" component={CheckoutForm} />
        </Switch>
      </main>

      <Footer />
    </div>
  );
};

export default App;
