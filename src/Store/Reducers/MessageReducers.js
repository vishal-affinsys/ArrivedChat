import {createSlice} from '@reduxjs/toolkit';

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const socket = [];
const initialState = {
  messages: [],
  status: 'connecting',
};

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: build => ({
    getMessages: build.query({
      query: channel => `messages/${channel}`,
      async onCacheEntryAdded(
        arg,
        {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('ws://localhost:8080');
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = event => {
            const data = JSON.parse(event.data);

            updateCachedData(draft => {
              draft.push(data);
            });
          };

          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
  }),
});

export const {useGetMessagesQuery} = api;

export const messagelice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    addListener: (state, action) => {
      socket.addListener(data => {
        console.log('----state---', data);
        state.messages.push(data);
      });
    },
    removeListener: (state, action) => {
      socket.removeListener();
    },
    sendMessage: (state, action) => {
      console.log('sending..', action);
      socket.sendMessage({
        message: action.payload.message,
        source: '7084324572',
        target: '7084324572',
        time: new Date().toDateString(),
      });
    },
  },
});

export default messagelice.reducer;
export const addListener = messagelice.actions.addListener;
export const removeListener = messagelice.actions.removeListener;
export const sendMessage = messagelice.actions.sendMessage;
