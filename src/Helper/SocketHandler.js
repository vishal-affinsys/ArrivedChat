import {encrypt, decrypt} from 'react-native-simple-encryption';
import {outLog} from './Logger';

const encryption_key = 'VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaVVishal1703200';
// const socket_url =
//   'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';

const socket_url = 'wss://echo.websocket.org/';

const CHANNEL_NAME = 'cryto@0.0.1';

export const createRoomId = ({source, target}) => {
  if (source.includes('+91') && target.includes('+91')) {
    return [source, target].sort().join('');
  } else if (!source.includes('+91') && target.includes('+91')) {
    return ['+91' + source, target].sort().join('');
  } else if (source.includes('+91') && !target.includes('+91')) {
    return [source, '+91' + target].sort().join('');
  } else if (!source.includes('+91') && !target.includes('+91')) {
    return ['+91' + source, '+91' + target].sort().join('');
  }
};

const BUFFER_SLICE = 20;

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
  sendMessage({message, time, source, target, isImage, image}) {
    if (isImage) {
      for (let i = 0; i < image.length; i = i + image.length / BUFFER_SLICE) {
        this.sendPayload({
          message,
          time,
          source,
          target,
          isImage,
          image: image.slice(i, i + image.length / BUFFER_SLICE),
        });
      }
      this.sendPayload({
        message,
        time,
        source,
        target,
        isImage: false,
        image: null,
      });
    } else {
      this.sendPayload({message, time, source, target, isImage, image});
    }
  }

  sendPayload({message, time, source, target, isImage, image}) {
    const payload = {
      channel: CHANNEL_NAME,
      isImage: isImage,
      image: image === undefined ? null : this.encryptMessage(image),
      message: message === undefined ? null : this.encryptMessage(message),
      time: this.encryptMessage(time),
      source: this.encryptMessage(source),
      target: this.encryptMessage(target),
    };

    // outLog.magenta(
    //   'SOCKET EVENT: Message sent',
    //   JSON.stringify(payload, null, 2),
    // );
    this.connection.send(JSON.stringify(payload));
  }

  addListener(callback) {
    this.connection.addEventListener('message', message => {
      if (message.data.includes('channel')) {
        const payload = JSON.parse(message.data);
        if (payload.channel !== undefined) {
          // console.log(payload.isImage);
          const data = {
            isImage: payload.isImage,
            image: this.decryptMessage(payload.image),
            message: this.decryptMessage(payload.message),
            time: this.decryptMessage(payload.time),
            source: this.decryptMessage(payload.source),
            target: this.decryptMessage(payload.target),
            isSentByMe: false,
          };
          // outLog.magenta(
          //   'SOCKET EVENT: Message received',
          //   JSON.stringify(data, null, 2),
          // );
          callback(data);
        }
      }
    });
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
