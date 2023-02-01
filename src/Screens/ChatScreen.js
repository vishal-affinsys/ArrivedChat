import {skipToken} from '@reduxjs/toolkit/dist/query';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, MD3Colors, TextInput, Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ChatBox from '../Components/ChatBox';
import {createRoomId} from '../Helper/SocketHandler';
import {
  useGetMessagesQuery,
  useSendMessagesQuery,
} from '../Store/Reducers/MessageReducers';

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

  return (
    <View style={style.body}>
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
      <TextInput
        multiline={true}
        ref={inputRef}
        placeholder={'Message'}
        textColor={'white'}
        onChangeText={value => {
          sendingText.current = value;
        }}
        placeholderTextColor={'white'}
        right={
          <TextInput.Icon
            icon={'send'}
            size={25}
            iconColor={'white'}
            onPress={() => {
              if (sendingText.current !== '') {
                const data = {
                  message: sendingText.current,
                  source: UserRdx.user.number,
                  target: user.number.split(' ').join(''),
                  timestamp: new Date().toDateString(),
                };
                setState(data);
              }
              sendingText.current = '';
              inputRef.current.clear();
            }}
          />
        }
        style={style.textInput}
      />
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
});
