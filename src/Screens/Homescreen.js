import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import {MD3Colors, Text, ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../Components/Header';
import Contacts from 'react-native-contacts';
import {loadMore, setContact} from '../Store/Reducers/Contact';
import User from '../Models/User';
import ChatTile from '../Components/ChatTile';

const HEADER_HEIGHT = 130;

const HomeScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const userRdx = useSelector(state => state.user);
  const contact = useSelector(state => state.contactInfo.renderContact);
  const dispatch = useDispatch();

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

  React.useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);
        Contacts.getAllWithoutPhotos()
          .then(contacts => {
            dispatch(setContact(User.createUserFromContacts(contacts)));
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Media',
        message: 'This app would like to view your media files.',
        buttonPositive: 'Please accept bare mortal',
      },
    ).then(console.log);
  }, [dispatch]);

  return (
    <View style={style.body}>
      <StatusBar backgroundColor={MD3Colors.neutral10} />
      <Animated.View
        style={[
          style.header,
          {transform: [{translateY: translateY}]},
          {opacity: opacity},
        ]}>
        <Header name={userRdx.user.name} />
        {/* <HorizontalList onPress={item => {}} /> */}
      </Animated.View>
      <Animated.View style={{opacity: textOpacity}}>
        <Text variant="bodyLarge" style={style.hiddenText}>
          Friends
        </Text>
      </Animated.View>
      <Animated.FlatList
        keyExtractor={item => {
          return item.number;
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => {
          return (
            <View style={style.emptyList}>
              <ActivityIndicator />
            </View>
          );
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          marginTop: HEADER_HEIGHT,
          backgroundColor: MD3Colors.neutral10,
          paddingTop: 12,
          paddingBottom: HEADER_HEIGHT,
        }}
        style={style.verticalList}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={1}
        onEndReachedThreshold={0.2}
        onEndReached={() => dispatch(loadMore())}
        showsVerticalScrollIndicator={false}
        data={contact}
        renderItem={({item}) => {
          return <ChatTile item={item} />;
        }}
        bounces
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
    height: 550,
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
  emptyList: {
    flex: 1,
    height: 550,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
