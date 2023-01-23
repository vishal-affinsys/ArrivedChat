import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, MD3Colors, TextInput} from 'react-native-paper';
import {Context} from '../Store/Context/socketProvider';

const ChatScreen = () => {
  const [msg, setMsg] = React.useState('');

  const message = useContext(Context);

  return (
    <View style={style.body}>
      <FlatList
        data={message.messages}
        renderItem={({item}) => {
          return (
            <Text variant="bodyLarge" style={style.fontStyle}>
              {JSON.stringify(item)}
            </Text>
          );
        }}
      />
      <TextInput
        multiline={true}
        placeholder={'Message'}
        textColor={'white'}
        onChangeText={value => {
          console.log(value);
          setMsg(value);
        }}
        placeholderTextColor={'white'}
        right={
          <TextInput.Icon
            icon={'send'}
            size={25}
            iconColor={'white'}
            onPress={() => {
              message.sendMessages(msg);
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
});
