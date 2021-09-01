import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AuthApiService from "../Api-Service";
import TokenService from "../token-service";
import "./login.css";

const Login = (props) => {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const { username, password } = event.target;
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        console.log(res.authToken);
        props.history.push("/cart");
      })

      .catch((res) => {
        setError(res);
        console.log(res);
      });
  }

  return (
    <div className="loginPage">
      
        <Row md={1.5} lg={2} className="justify-content-center">
          <Col className="text-center">
            <div className="errorMessage">{error}</div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="username"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Col className="mt-4">
                <Link to="/register">
                  <Button variant="light" size="sm" type="button">
                    Create New Account
                  </Button>
                </Link>
              </Col>
            </Form>
          </Col>
        </Row>

    </div>
  );
};

export default Login;
