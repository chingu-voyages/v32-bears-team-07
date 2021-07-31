import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AuthApiService from '../Api-Service';
import "./login.css";

const Login = (props) => {

  function handleSubmit(event) {
    event.preventDefault()
    // this.setState({ error: null })
    const { username, password } = event.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        // TokenService.saveAuthToken(res.authToken)
        // this.props.onLoginSuccess()
      })
      // .catch(res => {
      //   this.setState({ error: res.error })
      // })
  }

  return (
    <div>
      <Container className="loginContainer">
        <Row md={1.5} lg={2} className="justify-content-center">
          <Col className="text-center">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="username" placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Col className="mt-4">
                <Button
                  variant="light"
                  size="sm"
                  type="button"
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
