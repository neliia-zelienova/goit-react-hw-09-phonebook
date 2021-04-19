import { createSelector } from "@reduxjs/toolkit";

const getIsLoading = (state) => state.contacts.loading;
const getFilter = (state) => state.contacts.filter;
const getContacts = (state) => state.contacts.contacts;

const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return filter.length > 0
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : contacts;
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default { getIsLoading, getFilter, getVisibleContacts };
