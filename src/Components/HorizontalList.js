import React from 'react';
import {
  StyleSheet,
  Animated,
  Pressable,
  Easing,
  useWindowDimensions,
  Image,
} from 'react-native';
import Chat from '../../chatData.json';
import {Avatar, Text, MD3Colors} from 'react-native-paper';

const HorizontalList = ({onPress}) => {
  const scale = React.useRef(new Animated.Value(0)).current;

  // eslint-disable-next-line no-unused-vars
  const animation = Animated.timing(scale, {
    toValue: 1,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: true,
  });

  const translateX = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 0],
    extrapolate: 'clamp',
  });

  const {width, height} = useWindowDimensions();
  return (
    <Animated.FlatList
      style={style.horizontalList}
      data={Chat.profile.friends}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <Pressable key={item.id} onPress={() => {}}>
            <Animated.View style={[style.listItem]}>
              <Avatar.Image
                source={{uri: item.picture}}
                size={100}
                onProgress={event => {
                  console.log(event);
                }}
              />
              <Text style={style.nameStyle} variant="bodyMedium">
                {item.name}
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                {
                  transform: [{scale: scale}, {translateX: translateX}],
                  opacity: scale,
                },
                dialog.container,
                {
                  width: width * 0.8,
                  top: height * 0.5 - 125,
                },
              ]}>
              <Text variant="bodyLarge" style={dialog.name}>
                {item.name}
              </Text>
              <Image source={{uri: item.picture}} style={dialog.image} />
            </Animated.View>
          </Pressable>
        );
      }}
    />
  );
};

export default HorizontalList;

const dialog = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: MD3Colors.neutral40,
    padding: 20,
    paddingHorizontal: 32,
    paddingBottom: 32,
    borderRadius: 20,
  },
  name: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Black',
    fontSize: 23,
    marginBottom: 12,
  },
  image: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 12,
  },
});

const style = StyleSheet.create({
  listItem: {
    margin: 4,
    zIndex: 500,
  },
  pressable: {
    zIndex: 500,
  },
  horizontalList: {
    flexGrow: 0,
    zIndex: 500,
  },
  nameStyle: {
    marginVertical: 10,
    color: 'white',
    fontFamily: 'NotoSerif-Regular',
    textAlign: 'center',
  },
});
