// import {createContext} from 'react';
// import React from 'react';
// import Socket from '../../Helper/SocketHandler';
// import {getData, KEYS} from '../../Helper/LocalStorage';
// import UserInfo from '../Reducers/UserInfo';

// export const Context = createContext({
//   messages: {},
//   userInfo: [],
//   sendMessages: () => {},
//   listenMessages: () => {},
//   // updateScreen: () => {},
// });

// const socket = new Socket();

// function SocketProvider({children}) {
//   const [messages, setMessages] = React.useState([]);
//   const [update, setUpdate] = React.useState([]);
//   const [userInfo, setUserInfo] = React.useState([]);

//   function sendMessages({text, source, target}) {
//     const messageObject = {
//       message: text,
//       time: new Date().toISOString(),
//       source: '+91' + source,
//       target: target,
//     };
//     socket.sendMessage(messageObject);
//     messageObject.isSentByMe = true;
//     const roomId = [
//       '+91' + source.split(' ').join(''),
//       target.split(' ').join(''),
//     ]
//       .sort()
//       .join('');
//     setMessages(previous => {
//       console.log(previous[roomId], '<--Send');
//       if (previous[roomId] === undefined) {
//         previous[roomId] = [messageObject];
//         return previous;
//       } else {
//         previous[roomId].push(messageObject);
//         return previous;
//       }
//     });
//     console.log('Sending-->', messages);
//   }
//   const listener = React.useCallback(() => {
//     socket.connection.onmessage = message => {
//       if (message.data.includes('channel')) {
//         const payload = JSON.parse(message.data);
//         if (payload.channel !== undefined) {
//           const data = {
//             message: socket.decryptMessage(payload.message),
//             time: socket.decryptMessage(payload.time),
//             source: socket.decryptMessage(payload.source),
//             target: socket.decryptMessage(payload.target),
//             isSentByMe: false,
//           };
//           // outLog.magenta(
//           //   'SOCKET EVENT: Message received',
//           //   JSON.stringify(data, null, 2),
//           // );
//           // const roomId = [data.target, data.source].sort().join('');
//           const roomId = [
//             data.target.split(' ').join(''),
//             data.source.split(' ').join(''),
//           ]
//             .sort()
//             .join('');

//           console.log(data.source, userInfo.number);
//           if (data.source !== userInfo.number) {
//             setMessages(previous => {
//               if (previous[roomId] === undefined) {
//                 previous[roomId] = [data];
//                 return previous;
//               } else {
//                 previous[roomId].push(data);
//                 return previous;
//               }
//             });
//           }
//         }
//       }
//     };
//   }, [userInfo]);

//   async function getUserInfo() {
//     const user = await getData({keystore: KEYS.adminUser});
//     // console.log('getUserInfo', user);
//     setUserInfo(user);
//     return user;
//   }

//   React.useEffect(() => {
//     getUserInfo().then(() => {
//       listener();
//     });

//     return () => {
//       socket.removeListener();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages]);

//   const value = {
//     messages: messages,
//     userInfo: userInfo,
//     sendMessages: sendMessages,
//     listenMessages: () => {
//       listener();
//     },
//     removeListener: () => {
//       socket.removeListener();
//     },
//   };

//   return <Context.Provider value={value}>{children}</Context.Provider>;
// }

// export default SocketProvider;
