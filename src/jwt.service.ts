import * as Keychain from 'react-native-keychain';

const SERVER = 'APP';

export const getToken = async (): Promise<string | false> => {
  return await Keychain.getInternetCredentials(SERVER).then(
    (state) => (state as Keychain.UserCredentials).password,
  );
};

export const saveToken = async (user: string, token: string) => {
  return await Keychain.setInternetCredentials(
    SERVER,
    user,
    token,
  ).catch((error) => console.log(error));
};

export const hasToken = async (): Promise<boolean> =>
  (await Keychain.hasInternetCredentials(SERVER)) === false ? false : true;

export const deleteToken = async () => {
  await Keychain.resetInternetCredentials(SERVER);
};
