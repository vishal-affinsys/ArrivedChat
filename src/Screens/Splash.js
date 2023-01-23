import React from 'react';
import {View, StatusBar, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigate = useNavigation();
  const init = async () => {
    navigate.reset({
      routes: [{name: 'home'}],
    });
  };
  React.useEffect(() => {
    init();
  });
  return (
    <View>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        // resizeMode={'stretch'}
        source={require('../../assets/images/splash.png')}
        alt="splash"
      />
    </View>
  );
};

export default Splash;
