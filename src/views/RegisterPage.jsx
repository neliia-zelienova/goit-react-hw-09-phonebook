import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors } from "../redux/auth";
import { Jumbotron, Button, Form, Row, Col, Toast } from "react-bootstrap";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage = useSelector((state) =>
    authSelectors.getErrorMessage(state)
  );

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const sendData = useCallback(
    (name, email, password) =>
      dispatch(authOperations.register({ name, email, password })),
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Jumbotron>
      <Form action="">
        <Form.Group as={Row} controlId="newUserName">
          <Form.Label column sm={2} htmlFor="name">
            Name
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleName}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newUserEmail">
          <Form.Label column sm={2} htmlFor="email">
            Email
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newUserPassword">
          <Form.Label column sm={2} htmlFor="password">
            Create password
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
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Register
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <Toast show={errorMessage}>
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </Jumbotron>
  );
};
export default RegisterPage;
