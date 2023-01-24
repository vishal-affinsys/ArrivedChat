import {createSlice} from '@reduxjs/toolkit';
import Contacts from 'react-native-contacts';

const initialState = {
  contacts: [],
};
const contact = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    getContacts: (state, action) => {
      Contacts.getAll(data => {
        state.contacts = data;
      });
    },
  },
});

export default contact.reducer;
export const getContacts = contact.actions.getContacts;
