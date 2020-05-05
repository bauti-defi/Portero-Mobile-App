import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import FeedbackScreen from '../screens/lotes/add.lote.feedback.screen';
import LoteFormScreen from '../screens/lotes/lote.form.screen';

const Stack = createStackNavigator();

const QRScannerNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen name="Escanear QR" component={ScannerScreen} />
      <Stack.Screen
        name="prop/to/lote"
        component={LoteFormScreen}
        options={{title: 'Lote'}}
      />
      <Stack.Screen
        name="Add Lote Feedback"
        component={FeedbackScreen}
        options={{title: '', headerLeft: null}}
      />
    </Stack.Navigator>
  );
};

const ScannerScreen = ({navigation}) => {
  const onRead = (event) => {
    let qrData = JSON.parse(event.data);
    navigation.navigate(qrData.path, {
      message: qrData.message,
      id: qrData.id,
    });
  };

  return (
    <QRCodeScanner onRead={onRead} bottomContent={bottomContent(navigation)} />
  );
};

const bottomContent = (navigation) => (
  <Button type="clear" title="Cerrar" onPress={navigation.goBack} />
);

export default QRScannerNavigator;
