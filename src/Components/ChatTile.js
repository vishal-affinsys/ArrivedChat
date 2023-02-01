import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {MD3Colors, Avatar, Text, List} from 'react-native-paper';
import {Pressable, StyleSheet} from 'react-native';

const LeftElement = item => {
  return <Avatar.Image source={{uri: item.imageUrl}} size={45} />;
};

const RightElement = item => {
  return <Text style={style.timeStamp}>{item.lastMessageTimestamp}</Text>;
};

const ChatTile = React.memo(({item}) => {
  const navigate = useNavigation();
  return (
    <Pressable
      rippleColor={MD3Colors.neutral50}
      onPress={() => {
        navigate.navigate('chat', {item});
      }}>
      <List.Item
        style={style.chatItem}
        title={item.name}
        description={item.lastMessage}
        titleStyle={style.titleStyle}
        left={() => {
          return LeftElement(item);
        }}
        right={() => {
          return RightElement(item);
        }}
        descriptionStyle={style.descriptionStyle}
      />
    </Pressable>
  );
});

const style = StyleSheet.create({
  chatItem: {
    padding: 12,
  },
  titleStyle: {
    color: 'white',
    fontSize: 19,
  },
  descriptionStyle: {
    fontSize: 11,
    color: 'grey',
    fontFamily: 'NotoSerif-Regular',
  },
  timeStamp: {
    fontSize: 11,
    color: 'grey',
    justifyContent: 'center',
  },
});
export default ChatTile;
