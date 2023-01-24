import {createContext} from 'react';
import React from 'react';
import Socket from '../../Helper/SocketHandler';

export const Context = createContext({
  messages: [],
  sendMessages: () => {},
  listenMessages: () => {},
});

const socket = new Socket();

function SocketProvider({children}) {
  const [messages, setMessages] = React.useState([]);

  function sendMessages(text) {
    const messageObject = {
      message: text,
      time: new Date().toISOString(),
      source: '7084324572',
      target: '7084324572',
    };
    socket.sendMessage(messageObject);
    setMessages(previous => [...previous, messageObject]);
  }
  const listener = React.useCallback(() => {
    console.log('listening');
    socket.addListener(setMessages);
  }, []);

  React.useEffect(() => {
    listener();

    return () => {
      socket.removeListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    messages: messages,
    sendMessages: sendMessages,
    listenMessages: () => {},
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default SocketProvider;
