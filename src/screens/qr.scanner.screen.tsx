import React from 'react';
import {RNCamera} from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';

function QRScannerScreen({navigation}) {
  return (
    <QRCodeScanner
      onRead={onRead}
      flashMode={RNCamera.Constants.FlashMode.torch}
      bottomContent={
        <Button type="clear" title="Cerrar" onPress={navigation.goBack} />
      }
    />
  );
}

const onRead = (event) => {
  const url: string = `http://192.168.0.88:3500/${
    event.data
  }&device=${DeviceInfo.getMacAddressSync()}`;
};

export default QRScannerScreen;
