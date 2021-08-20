import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import GrapesJS from "./components/GrapesJS";

const App = () => {
  // const [displayLogin, setDisplayLogin] = useState(true);

  // const toggleDisplayLogin = () => {
  //   setDisplayLogin(!displayLogin);
  // };

  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to popup shop</h1>

          <GrapesJS />
        </Container>

        {/* {displayLogin ? (
          <Login toggleDisplayLogin={toggleDisplayLogin} />
        ) : (
          <SignUp />
        )} */}

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
        </Switch>
      </main>

      <Footer />
    </div>
  );
};

export default App;
