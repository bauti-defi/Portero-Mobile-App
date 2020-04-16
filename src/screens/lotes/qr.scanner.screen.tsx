import React from 'react';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';

function QRScannerScreen({navigation, route}) {
  function onRead(event) {
    let response = JSON.parse(event.data);
    navigation.navigate('Confirmation', {
      nickname: route.params,
      invite: response.invite,
      id: response.id,
    });
  }

  return (
    <QRCodeScanner
      onRead={onRead}
      //flashMode={RNCamera.Constants.FlashMode.torch}
      bottomContent={
        <Button type="clear" title="Cerrar" onPress={navigation.goBack} />
      }
    />
  );
}

export default QRScannerScreen;
