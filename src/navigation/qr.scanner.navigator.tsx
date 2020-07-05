import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import GuardiaRegistrationFeedbackScreen from '../screens/guardia/guardia.registration.feedback.screen';
import InviteValidationScreen from '../screens/guardia/invite.info.screen';
import PropietarionRegistrationFeedbackScreen from '../screens/propietario/prop.registration.feedback.screen';
import PropietarioFormScreen from '../screens/propietario/propietario.form.screen';
import {useUserSelector} from '../storage/app.selectors';

enum Type {
  USER = 1,
  GUARDIA = 2,
}

const Stack = createStackNavigator();

const QRScannerNavigator = () => {
  const accountType: number = useUserSelector((state) => state.cookie.type);

  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen name="Escanear QR" component={ScannerScreen} />
      {getChildScreens(accountType)}
    </Stack.Navigator>
  );
};

const getChildScreens = (type: number) => {
  switch (type) {
    case Type.USER:
      return (
        <>
          <Stack.Screen
            name="propietario/register"
            component={PropietarioFormScreen}
            options={{title: 'Propietario', headerLeft: null}}
          />
          <Stack.Screen
            name="Propietario Registration Feedback"
            component={PropietarionRegistrationFeedbackScreen}
            options={{title: '', headerLeft: null}}
          />
          <Stack.Screen
            name="guardia/register"
            component={GuardiaRegistrationFeedbackScreen}
            options={{title: '', headerLeft: null}}
          />
        </>
      );
    case Type.GUARDIA:
      return (
        <Stack.Screen
          name="invite"
          component={InviteValidationScreen}
          options={{title: 'Invitacion', headerLeft: null}}
        />
      );
    default:
      throw Error('Invalid account type.');
  }
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

export default QRScannerNavigator;
