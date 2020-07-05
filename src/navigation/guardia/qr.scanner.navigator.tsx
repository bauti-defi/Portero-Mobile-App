import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import InviteValidationScreen from '../../screens/guardia/invite.validation.screen';

const Stack = createStackNavigator();

const GuardiaQRScannerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen name="Escanear QR" component={ScannerScreen} />
      <Stack.Screen
        name="invite"
        component={InviteValidationScreen}
        options={{title: 'Invitacion', headerLeft: null}}
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

const bottomContent = ({goBack}) => (
  <Button type="clear" title="Cerrar" onPress={goBack} />
);

export default GuardiaQRScannerNavigator;
