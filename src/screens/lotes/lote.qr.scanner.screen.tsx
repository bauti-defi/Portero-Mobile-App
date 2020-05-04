import React from 'react';
import {Button, Text} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';

function LoteQRScannerScreen({navigation, route}) {
  function onRead(event) {
    let response = JSON.parse(event.data);
    navigation.navigate('Feedback', {
      nickname: route.params,
      message: response.message,
      id: response.id,
    });
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

const topConent = () => (
  <Text>Este QR esta emitido por la Guardia del Barrio</Text>
);

const bottomContent = (navigation) => (
  <Button type="clear" title="Cerrar" onPress={navigation.goBack} />
);

export default LoteQRScannerScreen;
