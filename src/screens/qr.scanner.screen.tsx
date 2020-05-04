import React from 'react';
import {Button, Text} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';

function QRScannerScreen({navigation, route}) {
  function onRead(event) {
    let response = JSON.parse(event.data);
  }

  return (
    <QRCodeScanner
      onRead={onRead}
      topContent={topConent()}
      //flashMode={RNCamera.Constants.FlashMode.torch}
      bottomContent={bottomContent(navigation)}
    />
  );
}

const topConent = () => <Text>Escanear QR</Text>;

const bottomContent = (navigation) => (
  <Button type="clear" title="Cerrar" onPress={navigation.goBack} />
);

export default QRScannerScreen;
