import {configureStore, combineReducers} from '@reduxjs/toolkit';
import MessageReducer from './Reducers/MessageReducers';
import Contact from './Reducers/Contact';

const reducer = combineReducers({
  message: MessageReducer,
  contact: Contact,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
