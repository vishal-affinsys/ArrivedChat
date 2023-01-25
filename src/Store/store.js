import {configureStore, combineReducers} from '@reduxjs/toolkit';
import Contact from './Reducers/Contact';
import UserInfo from './Reducers/UserInfo';

const reducer = combineReducers({
  contactInfo: Contact,
  user: UserInfo,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
