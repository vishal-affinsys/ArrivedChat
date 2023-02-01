import {configureStore, combineReducers} from '@reduxjs/toolkit';
import Contact from './Reducers/Contact';
import {api} from './Reducers/MessageReducers';
import UserInfo from './Reducers/UserInfo';

const reducer = combineReducers({
  contactInfo: Contact,
  user: UserInfo,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(api.middleware),
});
