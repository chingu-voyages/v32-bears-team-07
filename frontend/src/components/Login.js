import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./login.css";

const Login = (props) => {
  return (
    <div>
      <Container className="loginContainer">
        <Row md={1.5} lg={2} className="justify-content-center">
          <Col className="text-center">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Col className="mt-4">
                <Button
                  variant="light"
                  size="sm"
                  type="submit"
                  onClick={props.toggleDisplayLogin}
                >
                  Create New Account
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
