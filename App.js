import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  configureFonts,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Homescreen from './src/Screens/Homescreen';
import {Platform} from 'react-native';
import ChatScreen from './src/Screens/ChatScreen';
import SocketProvider from './src/Store/Context/socketProvider';
import RegisterScreen from './src/Screens/RegisterScreen';
import Splash from './src/Screens/Splash';
import {Provider} from 'react-redux';
import {store} from './src/Store/store';

const Stack = createNativeStackNavigator();

const fontConfig = {
  customVariant: {
    fontFamily: Platform.select({
      web: 'Roboto, NotoSerif',
      ios: 'Roboto, NotoSerif',
      android: 'Roboto, NotoSerif',
      default: 'sans-serif',
    }),
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  },
};
const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
};

function App() {
  return (
    <SocketProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="splash" component={Splash} />
              <Stack.Screen name="register" component={RegisterScreen} />
              <Stack.Screen name="home" component={Homescreen} />
              <Stack.Screen name="chat" component={ChatScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </SocketProvider>
  );
}

export default App;
