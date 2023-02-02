/* eslint-disable react-native/no-inline-styles */
import {skipToken} from '@reduxjs/toolkit/dist/query';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import {Text, MD3Colors, Avatar} from 'react-native-paper';

import {useSelector} from 'react-redux';
import ChatBox from '../Components/ChatBox';
import {createRoomId} from '../Helper/SocketHandler';
import {
  useGetMessagesQuery,
  useSendMessagesQuery,
} from '../Store/Reducers/MessageReducers';
import {IconButton} from 'react-native-paper';
import {getImage} from '../Helper/ImagePicker';

const {width, height} = Dimensions.get('window');

const ChatScreen = ({route}) => {
  // const [msg, setMsg] = React.useState('');
  const user = route.params.item;
  const UserRdx = useSelector(state => state.user);
  // const roomId = [user.number, '+91' + UserRdx.user.number].sort().join('');

  const roomId = createRoomId({
    target: user.number.split(' ').join(''),
    source: UserRdx.user.number,
  });
  const inputRef = React.useRef();

  const [myState, setState] = React.useState(skipToken); // initialize with skipToken to skip at first
  // eslint-disable-next-line no-unused-vars
  const result = useSendMessagesQuery(myState);

  const receivedMsg = useGetMessagesQuery();
  const sendingText = React.useRef('');
  const imageData = React.useRef(null);

  const [image, setImage] = React.useState(null);

  return (
    <View style={style.body}>
      <View
        style={{
          position: 'absolute',
          display: image === null ? 'none' : 'flex',
          top: height / 4,
          opacity: image === null ? 0 : 1,
          left: width * 0.1,
        }}>
        {image === null ? null : (
          <Image
            source={{uri: image}}
            style={{
              height: height / 2,
              width: width * 0.8,
              borderRadius: 12,
            }}
          />
        )}
      </View>
      <View style={[style.body, {opacity: image === null ? 1 : 0.2}]}>
        <View style={style.header}>
          <Avatar.Image source={{uri: user.imageUrl}} size={45} />
          <Text style={style.headerText} variant="headlineSmall">
            {user.name}
          </Text>
        </View>

        <FlatList
          data={
            receivedMsg.currentData === undefined
              ? []
              : receivedMsg.currentData[roomId]
          }
          renderItem={({item}) => {
            item.isSentByMe = item.source === UserRdx.user.number;
            return <ChatBox message={item} />;
          }}
        />
      </View>
      <View style={style.messageContainer}>
        <TextInput
          multiline={true}
          ref={inputRef}
          placeholder={'Message'}
          style={style.textInput}
          textColor={'white'}
          onChangeText={value => {
            sendingText.current = value;
          }}
          placeholderTextColor={'white'}
        />
        <View
          style={{
            backgroundColor: MD3Colors.neutral30,
            marginBottom: 12,
          }}>
          <IconButton
            type={'contained'}
            icon="image"
            iconColor={MD3Colors.neutral90}
            size={25}
            onPress={async () => {
              const data = await getImage();
              setImage(data);
              imageData.current = data;
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: MD3Colors.neutral30,
            marginBottom: 12,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <IconButton
            type={'contained'}
            icon="send"
            iconColor={MD3Colors.neutral90}
            size={25}
            onPress={() => {
              if (sendingText.current !== '' && imageData.current !== null) {
                const data = {
                  isImage: true,
                  image: imageData.current,
                  message: sendingText.current,
                  source: UserRdx.user.number,
                  target: user.number.split(' ').join(''),
                  time: new Date().toISOString(),
                };
                setState(data);
              } else if (
                sendingText.current === '' &&
                imageData.current !== null
              ) {
                const data = {
                  isImage: true,
                  image: imageData.current,
                  message: null,
                  source: UserRdx.user.number,
                  target: user.number.split(' ').join(''),
                  time: new Date().toISOString(),
                };
                setState(data);
              } else if (
                sendingText.current !== '' &&
                imageData.current === null
              ) {
                const data = {
                  isImage: false,
                  base64: null,
                  message: sendingText.current,
                  source: UserRdx.user.number,
                  target: user.number.split(' ').join(''),
                  time: new Date().toISOString(),
                };
                setState(data);
              }
              sendingText.current = '';
              setImage(null);
              imageData.current = null;
              inputRef.current.clear();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: MD3Colors.neutral10,
  },
  fontStyle: {
    color: 'white',
    fontSize: 20,
  },
  textInput: {
    backgroundColor: MD3Colors.neutral30,
    color: 'white',
    paddingLeft: 20,
    marginLeft: 12,
    marginBottom: 12,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: width - 125,
  },
  headerText: {
    color: 'white',
    marginLeft: 12,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
    backgroundColor: MD3Colors.neutral30,
  },
  messageContainer: {
    flexDirection: 'row',
    width: width,
  },
});
