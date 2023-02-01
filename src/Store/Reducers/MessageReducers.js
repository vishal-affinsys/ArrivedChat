import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Socket, {createRoomId} from '../../Helper/SocketHandler';

const ws = new Socket();
export const api = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: build => ({
    getMessages: build.query({
      queryFn: async () => {
        return {data: {}};
      },
      async onCacheEntryAdded(
        arg,
        {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
      ) {
        await cacheDataLoaded;
        try {
          ws.addListener(data => {
            const roomId = createRoomId({
              source: data.source,
              target: data.target,
            });
            updateCachedData(draft => {
              if (draft[roomId] === undefined) {
                draft[roomId] = [];
                draft[roomId].push(data);
              } else {
                draft[roomId].push(data);
              }
            });
          });
        } catch {}
      },
    }),
    sendMessages: build.query({
      queryFn: async ({message, time, source, target}) => {
        ws.sendMessage({message, time, source, target});
        return {data: {message, time, source, target}};
      },
    }),
  }),
});

export const {useGetMessagesQuery, useSendMessagesQuery} = api;
