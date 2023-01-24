import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Animated, PermissionsAndroid} from 'react-native';
import {
  Avatar,
  List,
  MD3Colors,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Chat from '../../chatData.json';
import Header from '../Components/Header';
import HorizontalList from '../Components/HorizontalList';
import {outLog} from '../Helper/Logger';

const LeftElement = item => {
  return <Avatar.Image source={{uri: item.picture}} />;
};

const RightElement = item => {
  return <Text style={style.timeStamp}>{item.latest_timestamp}</Text>;
};
const HEADER_HEIGHT = 250;

const HomeScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT * 2],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 1.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const navigate = useNavigation();

  React.useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    ).then(data => {
      outLog.green('--> Permission ', data);
    });
  });

  return (
    <View style={style.body}>
      <Animated.View
        style={[
          style.header,
          {transform: [{translateY: translateY}]},
          {opacity: opacity},
        ]}>
        <Header />
        <HorizontalList onPress={item => {}} />
      </Animated.View>
      <Animated.View style={{opacity: textOpacity}}>
        <Text variant="bodyLarge" style={style.hiddenText}>
          Friends
        </Text>
      </Animated.View>
      <Animated.FlatList
        contentContainerStyle={{
          marginTop: HEADER_HEIGHT,
          backgroundColor: MD3Colors.neutral20,
          paddingBottom: HEADER_HEIGHT,
        }}
        style={style.verticalList}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={10}
        showsVerticalScrollIndicator={false}
        data={Chat.profile.friends}
        renderItem={({item}) => {
          return (
            <TouchableRipple
              rippleColor={MD3Colors.neutral50}
              onPress={() => {
                navigate.navigate('chat');
              }}>
              <List.Item
                style={style.chatItem}
                title={item.name}
                description={item.lastChat}
                titleStyle={style.titleStyle}
                left={() => {
                  return LeftElement(item);
                }}
                right={() => {
                  return RightElement(item);
                }}
                descriptionStyle={style.descriptionStyle}
              />
            </TouchableRipple>
          );
        }}
      />
    </View>
  );
};
export default HomeScreen;

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: MD3Colors.neutral10,
  },
  header: {
    position: 'absolute',
    zIndex: 500,
  },

  verticalList: {
    flex: 1,
    borderRadius: 50,
  },
  hiddenText: {
    color: 'white',
    fontFamily: 'Roboto-black',
    letterSpacing: 5,
    fontSize: 23,
    padding: 12,
    fontWeight: 'bold',
  },
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
