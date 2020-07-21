import { getMacAddress } from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';

const API_TOKEN = 'api/v3/cookie';


export const getCredentials = (): Promise<any | false> => {
  return Promise.all([
    Keychain.getInternetCredentials(API_TOKEN),
    getMacAddress(),
  ]).then(values => {
    let secret = values[0]
    let deviceId = JSON.parse(values[1]) as Keychain.UserCredentials
    
  }
  ).then(info => )
    .then((deviceId) => )
    .then((state) => state as Keychain.UserCredentials)
    .catch((error) =>
      console.log(`Error fetching cookie from storage: ${error}`),
    );
};

export const saveCredentials = (email: string, token: string, exp: Date) => {
  return getMacAddress()
    .then((deviceId) => JSON.stringify({token, exp, deviceId}))
    .then((secret) => {
      return Keychain.setInternetCredentials(API_TOKEN, email, secret, {
        rules: Keychain.SECURITY_RULES.NONE,
        storage: Keychain.STORAGE_TYPE.AES,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
    })
    .catch((error) => console.log(`Error saving cookie to storage: ${error}`));
};

export const deleteCredentials = () => {
  Keychain.resetInternetCredentials(API_TOKEN);
};
