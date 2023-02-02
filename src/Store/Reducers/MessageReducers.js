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
        let imageData = '';
        try {
          ws.addListener(data => {
            const roomId = createRoomId({
              source: data.source,
              target: data.target,
            });
            if (data.isImage) {
              imageData += data.image;
            } else {
              data.image = imageData;
              console.log('Message from RTK-->', data.time);
              updateCachedData(draft => {
                if (draft[roomId] === undefined) {
                  draft[roomId] = [];
                  draft[roomId].push(data);
                } else {
                  draft[roomId].push(data);
                }
              });
              imageData = '';
            }
          });
        } catch {}
      },
    }),
    sendMessages: build.query({
      queryFn: async ({message, time, source, target, isImage, image}) => {
        ws.sendMessage({message, time, source, target, isImage, image});
        return {data: {message, time, source, target, isImage, image}};
      },
    }),
  }),
});

export const {useGetMessagesQuery, useSendMessagesQuery} = api;
