import { React, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AuthApiService from '../Api-Service';
import "./signup.css";

const SignUp = () => {

  // const {error, setError} = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const { username, email, password } = event.target

    // setError({ error: null })
    AuthApiService.postUser({
      username: username.value,
      email: email.value,
      password: password.value,
    })
      .then(user => {
        username.value = ''
        password.value = ''
        // this.props.onRegistrationSuccess()
      })
    // .catch(res => {
    //   setError({ error: res.error })
    // })
  }

  return (
    <div>
      <Container className="signUpContainer">
        <Row md={1.5} lg={2} className="justify-content-center">
          <Col className="text-center">
            <Form onSubmit={handleSubmit} >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="username" type="username" placeholder="Enter name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group> */}
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
