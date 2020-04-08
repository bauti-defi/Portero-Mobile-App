import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

function QRScannerScreen() {
  return <QRCodeScanner onRead={onRead} />;
}

const onRead = (event) => {
  console.log(event.data);
};

export default QRScannerScreen;
