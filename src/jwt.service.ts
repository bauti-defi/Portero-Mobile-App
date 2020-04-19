import DeviceInfo from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';

const SERVER = 'APP';

let token = undefined;

export const getToken = async (): Promise<Keychain.UserCredentials | false> => {
  if (!token) {
    token = await Keychain.getInternetCredentials(SERVER).then(
      (state) => (state as Keychain.UserCredentials).password,
    );
  }
  return token;
};

export const saveToken = async (newToken: string) => {
  token = newToken;
  return await Keychain.setInternetCredentials(
    SERVER,
    DeviceInfo.getUniqueId(),
    token,
  );
};

export const hasToken = async (): Promise<boolean> =>
  (await Keychain.hasInternetCredentials(SERVER)) === false ? false : true;

export const deleteToken = () => {
  Keychain.resetInternetCredentials(SERVER);
  token = undefined;
};
