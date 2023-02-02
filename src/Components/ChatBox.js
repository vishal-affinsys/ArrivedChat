/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {Avatar, MD3Colors, Text} from 'react-native-paper';
import {friendsImage, userImage} from '../Models/User';

// const {width} = Dimensions.get('window').width;
const width = Dimensions.get('window').width;

const ChatBox = ({message}) => {
  return (
    <View
      style={[
        style.externaleContainer,
        {flexDirection: message.isSentByMe ? 'row-reverse' : 'row'},
      ]}>
      <Avatar.Image
        source={{uri: message.isSentByMe ? userImage : friendsImage}}
        size={35}
        style={style.avatar}
      />
      <View
        style={[
          style.chatBox,
          {
            backgroundColor: message.isSentByMe
              ? 'rgba(120,120,255,0.3)'
              : MD3Colors.neutral60,
            padding: message.image !== '' ? 0 : 12,
          },
        ]}>
        {message.image !== '' ? (
          <View>
            <Image
              source={{uri: message.image}}
              style={{
                height: 300,
                width: width / 1.5,
                alignSelf: 'center',
                borderRadius: 12,
              }}
            />
            <Text style={{color: 'grey', padding: 4, fontSize: 10}}>
              {moment(message.time).format('HH:mm a')}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={style.textStyle}>{message.message}</Text>
            <Text style={{color: 'grey', padding: 4, fontSize: 10}}>
              {moment(message.time).format('HH:mm a')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  externaleContainer: {
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  avatar: {
    marginHorizontal: 5,
  },
  chatBox: {
    maxWidth: width * 0.7,
    borderRadius: 12,
  },
  textStyle: {
    fontFamily: 'NotoSerif-Regular',
    color: 'white',
    fontSize: 12,
  },
});

export default ChatBox;
