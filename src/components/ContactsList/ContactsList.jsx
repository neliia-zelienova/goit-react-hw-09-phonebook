import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../Notification";
import { contactsSelectors, contactsOperations } from "../../redux/contacts";
import ContactItem from "../ContactItem/ContactItem";

import EditForm from "../EditForm";

import { Container, Row, Col, ListGroup } from "react-bootstrap";

const ContactsList = () => {
  const contacts = useSelector((state) =>
    contactsSelectors.getVisibleContacts(state)
  );
  const isLoading = useSelector((state) =>
    contactsSelectors.getIsLoading(state)
  );

  const [edit, setEdit] = useState(false);
  const [editingID, setEditingID] = useState(null);

  const dispatch = useDispatch();

  const saveEdit = useCallback(
    (id, name, number) =>
      dispatch(contactsOperations.editContact(id, name, number)),
    [dispatch]
  );

  const startEdit = (id) => {
    setEdit(true);
    setEditingID(id);
  };

  const handleSave = (formName, fromNumber) => {
    saveEdit(editingID, formName, fromNumber);
    resetEditor();
  };

  const handleCancel = () => {
    resetEditor();
  };

  const resetEditor = () => {
    setEdit(false);
    setEditingID(null);
  };

  const showNotification = contacts.length === 0;

  return (
    <Container fluid>
      <Row>
        <Col>
          {showNotification && (
            <Notification message="No contacts here yet..." />
          )}
          <ListGroup as="ul">
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                startEdit={startEdit}
              ></ContactItem>
            ))}
          </ListGroup>
        </Col>

        {edit && (
          <EditForm
            nameInit={contacts.find((item) => item.id === editingID).name}
            numberInit={contacts.find((item) => item.id === editingID).number}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        )}
      </Row>
    </Container>
  );
};

export default ContactsList;
