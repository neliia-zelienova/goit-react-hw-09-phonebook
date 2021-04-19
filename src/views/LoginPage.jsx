import React, { useCallback, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors } from "../redux/auth";
import { Jumbotron, Button, Form, Row, Col, Toast } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage = useSelector((state) =>
    authSelectors.getErrorMessage(state)
  );
  
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const sendData = useCallback(
    (email, password) => dispatch(authOperations.login({email, password})),
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <Jumbotron>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="loginEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleEmail}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="loginPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              Login
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <Toast show={errorMessage} animation>
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </Jumbotron>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(authOperations.login(data)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
