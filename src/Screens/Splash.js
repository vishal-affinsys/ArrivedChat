import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import {getData, KEYS} from '../Helper/LocalStorage';
import {useDispatch} from 'react-redux';
import {setUser} from '../Store/Reducers/UserInfo';

const Splash = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function getKey() {
      const check = await getData({keystore: KEYS.adminUser});
      if (check !== null) {
        dispatch(setUser(check));
        navigate.reset({
          routes: [{name: 'home'}],
        });
      } else {
        navigate.reset({
          routes: [{name: 'register'}],
        });
      }
    }
    getKey();
  });

  return (
    <View style={style.body}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ActivityIndicator />
    </View>
  );
};

export default Splash;

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
