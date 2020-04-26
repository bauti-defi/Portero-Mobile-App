import * as Keychain from 'react-native-keychain';
import {Cookie} from './storage/user.reducer';

const SERVER = 'api/v1';

export const getCookie = (): Promise<Cookie | false> => {
  return Keychain.getInternetCredentials(SERVER)
    .then((state) => (state as Keychain.UserCredentials).password)
    .then(JSON.parse)
    .catch((error) =>
      console.log(`Error fetching cookie from storage: ${error}`),
    );
};

export const saveCookie = (user: string, cookie: Cookie) => {
  return Keychain.setInternetCredentials(SERVER, user, JSON.stringify(cookie), {
    rules: Keychain.SECURITY_RULES.NONE,
    storage: Keychain.STORAGE_TYPE.AES,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  }).catch((error) => console.log(`Error saving cookie to storage: ${error}`));
};

export const deleteCookie = () => {
  Keychain.resetInternetCredentials(SERVER);
};
