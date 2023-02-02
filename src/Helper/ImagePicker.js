import {launchImageLibrary} from 'react-native-image-picker';
import {outLog} from './Logger';

async function getBase64() {
  const options = {
    title: 'Select Picture',
    includeBase64: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.5,
  };
  const image = await launchImageLibrary(options);
  if (image.didCancel) {
    outLog.red(image.errorMessage);
    return null;
  }
  const data = 'data:image/png;base64,' + image.assets[0].base64;
  // outLog.magenta('Message from image picker-->', data.length);
  return data;
  //   console.log(image.assets[0].base64);
}
export const getImage = getBase64;
