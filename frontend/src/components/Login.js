import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AuthApiService from "../Api-Service";
import "./login.css";
import { Switch, Route, Link } from "react-router-dom";
import SignUp from "./SignUp";

const Login = () => {
  function handleSubmit(event) {
    event.preventDefault();

    const { username, password } = event.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    }).then((res) => {
      username.value = "";
      password.value = "";
      // TokenService.saveAuthToken(res.authToken)
      // this.props.onLoginSuccess()
    });
    // .catch(res => {
    //   this.setState({ error: res.error })
    // })
  }

  return (
    <div>
      <Container className="loginContainer">
        <Row md={1.5} lg={2} className="justify-content-center">
          <Col className="text-center">
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
                <Link to="/signup">
                  <Button variant="light" size="sm" type="button">
                    Create New Account
                  </Button>
                </Link>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
      <Switch>
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

export default Login;
