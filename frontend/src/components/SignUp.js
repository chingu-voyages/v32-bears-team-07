import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AuthApiService from "../Api-Service";
import TokenService from "../token-service";
import "./signup.css";

const SignUp = (props) => {
  const [error, setError] = useState("");
  // const history = useHistory();

  // const routeChange = () => {
  //   let path = '/landing-page';
  //   history.push(path);
  // }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const { username, email, password, passwordConfirm } = event.target;

    if (password.value !== passwordConfirm.value) {
      return setError("Passwords do not match");
    }

    AuthApiService.postUser({
      username: username.value,
      email: email.value,
      password: password.value,
    })
      .then((user) => {
        username.value = "";
        email.value = "";
        password.value = "";
        passwordConfirm.value = "";
        TokenService.saveAuthToken(user.authToken);
        console.log(user.authToken);
        props.history.push("/");
      })
      .catch((res) => {
        setError(res);
      });
  }

  return (
    <div className="signUpContainer">
      <Row md={1.5} lg={2} className="justify-content-center">
        <Col className="text-center">
          <div className="errorMessage">{error}</div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Enter user name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="6-20 characters - number, lower/cap letters required"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
