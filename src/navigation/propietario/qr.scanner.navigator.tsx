import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import PropietarionRegistrationFeedbackScreen from '../../screens/propietario/prop.registration.feedback.screen';
import PropietarioFormScreen from '../../screens/propietario/propietario.form.screen';

const Stack = createStackNavigator();

const PropietarioQRScannerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen name="Escanear QR" component={ScannerScreen} />
      <Stack.Screen
        name="propietario/register"
        component={PropietarioFormScreen}
        options={{header: (props) => null}}
      />
      <Stack.Screen
        name="Propietario Registration Feedback"
        component={PropietarionRegistrationFeedbackScreen}
        options={{header: (props) => null}}
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

export default PropietarioQRScannerNavigator;
