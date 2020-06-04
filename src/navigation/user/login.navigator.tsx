import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../../screens/user/login.screen';
import RegistrtionScreen from '../../screens/user/registration/registration.screen';

const Stack = createStackNavigator();

function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{title: 'Ingresar'}}
      />
      <Stack.Screen
        name="register"
        component={RegistrtionScreen}
        options={{title: 'Registrar'}}
      />
    </Stack.Navigator>
  );
}

export default LoginNavigator;
