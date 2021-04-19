import React, { useCallback, useEffect } from "react";
import ContactsList from "../components/ContactsList";
import Filter from "../components/Filter";
import ContactForm from "../components/ContactForm";
import { useDispatch } from "react-redux";
import { contactsOperations } from "../redux/contacts";

const PhoneBook = () => {
  const dispatch = useDispatch();
  const getContacts = useCallback(
    () => dispatch(contactsOperations.getContacts()),
    [dispatch]
  );

  useEffect(() => getContacts());

  return (
    <>
      <ContactForm />
      <Filter />
      <ContactsList />
    </>
  );
};

export default PhoneBook;
