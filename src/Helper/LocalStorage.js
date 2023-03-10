import AsyncStorage from '@react-native-async-storage/async-storage';
import {outLog} from './Logger';

export const KEYS = {
  adminUser: 'adminUser',
};

export const storeData = async ({keystore, value}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(keystore, jsonValue);
  } catch (e) {
    outLog.red(
      `🤖 Storage error on:\n keystore: ${keystore}\n value: ${value}\n with error: ${e}`,
    );
  }
};

export const getData = async ({keystore}) => {
  try {
    const jsonValue = await AsyncStorage.getItem(keystore);
    if (jsonValue !== null) {
      const data = JSON.parse(jsonValue);
      return data;
    } else {
      return null;
    }
  } catch (e) {
    outLog.red(
      `🤖 Storage error on:\n keystore: ${keystore}\n with error: ${e}`,
    );
  }
};
