import DeviceInfo from "react-native-device-info";
import * as Keychain from "react-native-keychain";

const SERVER = 'APP'

export const getToken =  async ():Promise<Keychain.UserCredentials | false> => await Keychain.getInternetCredentials(SERVER)

export const saveToken = async (token:string) => await Keychain.setInternetCredentials(SERVER, DeviceInfo.getUniqueId(), token)

export const hasToken = async (): Promise<boolean> => await Keychain.hasInternetCredentials(SERVER) === false ? false : true

export const deleteToken = async (): Promise<void> => await Keychain.resetInternetCredentials(SERVER)