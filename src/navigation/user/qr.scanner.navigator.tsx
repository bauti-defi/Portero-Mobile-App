import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button, Text} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import GuardiaRegistrationFeedbackScreen from '../../screens/guardia/guardia.registration.feedback.screen';
import PropietarionRegistrationFeedbackScreen from '../../screens/propietario/prop.registration.feedback.screen';
import PropietarioFormScreen from '../../screens/propietario/propietario.form.screen';

const Stack = createStackNavigator();

const UserQRScannerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Escanear QR"
      screenOptions={{header: (props) => null}}>
      <Stack.Screen
        name="Escanear QR"
        component={ScannerScreen('Solicitar codigo QR en la guardia')}
      />
      <Stack.Screen
        name="propietario/register"
        component={PropietarioFormScreen}
        options={{header: (props) => null}}
      />
      <Stack.Screen
        name="guardia/register"
        component={GuardiaRegistrationFeedbackScreen}
        options={{title: '', headerLeft: null}}
      />
      <Stack.Screen
        name="Propietario Registration Feedback"
        component={PropietarionRegistrationFeedbackScreen}
        options={{header: (props) => null}}
      />
    </Stack.Navigator>
  );
};

const ScannerScreen = (message: string) => ({navigation}) => {
  const onRead = (event) => {
    let qrData = JSON.parse(event.data);
    navigation.navigate(qrData.path, {
      message: qrData.message,
      id: qrData.id,
    });
  };

  return (
    <QRCodeScanner
      onRead={onRead}
      topContent={topConent(message)}
      bottomContent={bottomContent(navigation)}
    />
  );
};

const topConent = (message) => (
  <Text
    h3
    adjustsFontSizeToFit={true}
    numberOfLines={2}
    style={{textAlign: 'center', paddingBottom: 30}}>
    {message}
  </Text>
);

const bottomContent = ({goBack}) => (
  <Button type="clear" title="Cerrar" onPress={goBack} />
);

export default UserQRScannerNavigator;
