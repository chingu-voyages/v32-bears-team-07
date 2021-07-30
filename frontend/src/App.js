import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  const [displayLogin, setDisplayLogin] = useState(true);

  const toggleDisplayLogin = () => {
    setDisplayLogin(!displayLogin);
  };

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to popup shop</h1>
        </Container>

        {displayLogin ? (
          <Login toggleDisplayLogin={toggleDisplayLogin} />
        ) : (
          <SignUp />
        )}
      </main>

      <Footer />
    </>
  );
};

export default App;
