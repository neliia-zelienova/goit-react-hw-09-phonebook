import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { contactsOperations } from "../../redux/contacts";
import { Jumbotron, Button, Form, Row, Col } from "react-bootstrap";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handelName = (e) => {
    setName(e.target.value);
  };

  const handelNumber = (e) => {
    setNumber(e.target.value);
  };

  const dispatch = useDispatch();

  const sendData = useCallback(
    (name, number) => dispatch(contactsOperations.addContact(name, number)),
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && number) {
      sendData(name, number);
      resetForm();
    } else alert("No contact name or number!");
  };

  const resetForm = () => {
    setName("");
    setNumber("");
  };

  return (
    <Jumbotron>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formGroupName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              size="sm"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handelName}
              value={name}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formGroupNumber">
          <Form.Label column sm={2}>
            Number
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              size="sm"
              type="text"
              name="number"
              placeholder="+380 XX XXX XX XX"
              onChange={handelNumber}
              value={number}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit">
              Add contact
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Jumbotron>
  );
};

export default ContactForm;
