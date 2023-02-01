import {createSlice} from '@reduxjs/toolkit';
import User from '../../Models/User';

const initialState = {
  contacts: [] as Array<User>,
  backupContact: [] as Array<User>,
  renderContact: [] as Array<User>,
  isSearchEnabled: false as boolean,
};
const contact = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    setContact: (state, action) => {
      console.log('---SET-CONTACT----');
      const sorted = action.payload.sort(
        (a: User, b: User) => a.name.toLowerCase() > b.name.toLowerCase(),
      );
      state.contacts = sorted;
      state.backupContact = sorted.slice(0, 12);
      state.renderContact = sorted.slice(0, 12);
    },
    loadMore: state => {
      if (!state.isSearchEnabled) {
        state.renderContact = state.contacts.slice(
          0,
          state.renderContact.length + 10,
        );
      }
    },
    searchContact: (state, action) => {
      console.log('---SEARCH-CONTACT----');
      state.isSearchEnabled = true;
      state.renderContact = state.contacts.filter(ele =>
        ele.name.toLowerCase().startsWith(action.payload.toLowerCase()),
      );
    },
    resetContact: state => {
      console.log('---RESET-CONTACT----');
      state.renderContact = state.backupContact;
      state.isSearchEnabled = false;
    },
  },
});

export default contact.reducer;
export const setContact = contact.actions.setContact;
export const searchContact = contact.actions.searchContact;
export const resetContact = contact.actions.resetContact;
export const loadMore = contact.actions.loadMore;
