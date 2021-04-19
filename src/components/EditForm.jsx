import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const EditForm = ({ nameInit, numberInit, handleSave, handleCancel }) => {
  const [name, setName] = useState(nameInit);
  const [number, setNumber] = useState(numberInit);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    handleSave(name, number);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setName("");
    setNumber("");
    handleCancel();
  };

  const isContactChanged = name !== nameInit || number !== numberInit;

  return (
    <Col>
      <Form action="">
        <Form.Group as={Row} controlId="formGroupEditName">
          <Col sm={8}>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleName}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formGroupEditNumber">
          <Col sm={8}>
            <Form.Control
              type="text"
              name="number"
              value={number}
              onChange={handleNumber}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              variant="secondary"
              type="button"
              onClick={onSave}
              disabled={!isContactChanged}
            >
              Save
            </Button>{" "}
            <Button variant="primary" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default EditForm;
