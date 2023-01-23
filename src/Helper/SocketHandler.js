import {encrypt, decrypt} from 'react-native-simple-encryption';
import {outLog} from './Logger';

const encryption_key = 'VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaVVishal1703200';
const socket_url =
  'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';

const CHANNEL_NAME = 'cryto@0.0.1';

class Socket {
  constructor(url = socket_url, key = encryption_key) {
    this.url = url === null ? socket_url : url;
    this.key = key === null ? encryption_key : key;
    this.connection = new WebSocket(url);
    this.status = 'connecting';

    this.connection.onopen = event => {
      outLog.green('CONNECTTED: ping');
      this.status = 'connected';
      this.connection.send('ping');
    };

    outLog.green('🚀 Connecting to:', this.url);
  }
  encryptMessage(value) {
    return encrypt(this.key, value);
  }
  decryptMessage(value) {
    return decrypt(this.key, value);
  }
  sendMessage({message, time, source, target}) {
    const payload = {
      channel: CHANNEL_NAME,
      message: this.encryptMessage(message),
      time: this.encryptMessage(time),
      source: this.encryptMessage(source),
      target: this.encryptMessage(target),
    };
    outLog.magenta(
      'SOCKET EVENT: Message sent',
      JSON.stringify(payload, null, 2),
    );
    this.connection.send(JSON.stringify(payload));
  }
  addListener(setState) {
    this.connection.onmessage = message => {
      if (message.data.includes('channel')) {
        const payload = JSON.parse(message.data);
        if (payload.channel !== undefined) {
          const data = {
            message: this.decryptMessage(payload.message),
            time: this.decryptMessage(payload.time),
            source: this.decryptMessage(payload.source),
            target: this.decryptMessage(payload.target),
          };
          outLog.magenta(
            'SOCKET EVENT: Message received',
            JSON.stringify(data, null, 2),
          );
          setState(previous => [...previous, data]);
        }
      }
    };
  }
  removeListener() {
    outLog.cyan('Connection closed');
    this.connection.close();
  }
  onError() {
    this.connection.onerror = e => {
      // an error occurred
      console.log(e.message);
    };
  }

  onClose() {
    this.connection.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }
}
export default Socket;

// USAGE
// React.useEffect(() => {
//   const socket = new Socket({});
//   socket.sendMessage({
//     message: 'Hello',
//     source: '7084324572',
//     target: '7084324572',
//     time: new Date().toDateString(),
//   });

//   socket.addListener();
//   return () => {
//     socket.removeListener();
//   };
// });
