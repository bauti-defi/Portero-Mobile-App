import * as Keychain from 'react-native-keychain';

const API_TOKEN = 'api/v3/cookie';

export const getCredentials = (): Promise<any | false> => {
  return Keychain.getInternetCredentials(API_TOKEN)
    .then((state) => state as Keychain.UserCredentials)
    .catch((error) =>
      console.log(`Error fetching cookie from storage: ${error}`),
    );
};

export const saveCredentials = (email: string, token: string) => {
  return Keychain.setInternetCredentials(API_TOKEN, email, token, {
    rules: Keychain.SECURITY_RULES.NONE,
    storage: Keychain.STORAGE_TYPE.AES,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  }).catch((error) => console.log(`Error saving cookie to storage: ${error}`));
};

export const deleteCredentials = () => {
  Keychain.resetInternetCredentials(API_TOKEN);
};
