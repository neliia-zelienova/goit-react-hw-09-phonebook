import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./ContactItem.module.css";
import { contactsOperations } from "../../redux/contacts";
import { ListGroup, Button } from "react-bootstrap";

const ContactItem = ({ contact, startEdit }) => {
  const dispatch = useDispatch();

  const deleteContact = useCallback(
    (id) => dispatch(contactsOperations.deleteContact(id)),
    [dispatch]
  );
  return (
    <ListGroup.Item as="li" min-width="400">
      <span className={styles.contacts__name}>{contact.name}</span>
      <span className={styles.contacts__number}>{contact.number}</span>
      <Button
        variant="danger"
        type="button"
        onClick={() => deleteContact(contact.id)}
      >
        Delete
      </Button>{" "}
      <Button
        variant="info"
        type="button"
        onClick={() => startEdit(contact.id)}
      >
        Edit
      </Button>
    </ListGroup.Item>
  );
};

export default ContactItem;
