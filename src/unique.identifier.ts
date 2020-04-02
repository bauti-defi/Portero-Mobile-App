import DeviceInfo from 'react-native-device-info';

const getUniqueIdentifier = () => DeviceInfo.getMacAddressSync()+DeviceInfo.getUniqueId()

export default getUniqueIdentifier