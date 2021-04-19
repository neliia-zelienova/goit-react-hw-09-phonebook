import axios from "axios";
import actions from "./contacts-actions";

const {
  getContactsRequest,
  getContactsSuccess,
  getContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
} = actions;

const doesContactExist = (contacts, name) => {
  if (contacts && contacts.find((contact) => contact.name === name))
    return true;
  return false;
};

const getContacts = () => async (dispatch) => {
  dispatch(getContactsRequest());
  try {
    const { data } = await axios.get("/contacts");
    dispatch(getContactsSuccess(data));
  } catch (error) {
    dispatch(getContactsError(error.message));
  }
};

const addContact = (name, number) => async (dispatch, getState) => {
  const { contacts } = getState();
  if (!doesContactExist(contacts.contacts, name)) {
    dispatch(addContactRequest());
    try {
      const { data } = await axios.post("/contacts", { name, number });
      dispatch(addContactSuccess(data));
    } catch (error) {
      dispatch(addContactError(error.message));
    }
  } else alert(`${name} is already in contacts`);
};

const deleteContact = (id) => async (dispatch) => {
  dispatch(deleteContactRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error.message));
  }
};

const editContact = (id, name, number) => async (dispatch) => {
  console.log("id, name, number", id, name, number);
  dispatch(editContactRequest());
  try {
    const { data } = await axios.patch(`/contacts/${id}`, { name, number });
    dispatch(editContactSuccess(data));
  } catch (error) {
    dispatch(editContactError(error.message));
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getContacts,
  addContact,
  deleteContact,
  editContact,
};
