import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';

const SERVER = 'APP';

let token = undefined;

export const getToken = async (): Promise<Keychain.UserCredentials | false> => {
  if (!token) {
    token = await Keychain.getInternetCredentials(SERVER);
  }
  return token;
};

export const saveToken = async (newToken: string) => {
  token = newToken;
  axios.defaults.headers['Authorization'] = newToken;
  return await Keychain.setInternetCredentials(
    SERVER,
    DeviceInfo.getUniqueId(),
    token,
  );
};

export const hasToken = async (): Promise<boolean> =>
  (await Keychain.hasInternetCredentials(SERVER)) === false ? false : true;

export const deleteToken = async (): Promise<void> => {
  await Keychain.resetInternetCredentials(SERVER);
  token = undefined;
  axios.defaults.headers['Authorization'] = null;
};
