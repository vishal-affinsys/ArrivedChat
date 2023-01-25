import {createSlice} from '@reduxjs/toolkit';
import User from '../../Models/User';

const initialState = {
  contacts: [] as Array<User>,
  backupContact: [] as Array<User>,
  renderContact: [] as Array<User>,
};
const contact = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    setContact: (state, action) => {
      const sorted = action.payload.sort(
        (a: User, b: User) => a.name.toLowerCase() > b.name.toLowerCase(),
      );
      state.contacts = sorted;
      state.backupContact = sorted;
      state.renderContact = sorted.slice(0, 10);
    },
    loadMore: state => {
      state.renderContact = state.contacts.slice(
        0,
        state.renderContact.length + 10,
      );
    },
    searchContact: (state, action) => {
      const searchWord = action.payload.toLowerCase();
      state.renderContact = state.contacts.filter(ele =>
        ele.name.toLowerCase().startsWith(searchWord),
      );
    },
    resetContact: state => {
      state.contacts = state.backupContact;
    },
  },
});

export default contact.reducer;
export const setContact = contact.actions.setContact;
export const searchContact = contact.actions.searchContact;
export const resetContact = contact.actions.resetContact;
export const loadMore = contact.actions.loadMore;
