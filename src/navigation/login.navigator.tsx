import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login.screen';
import RegistrtionScreen from '../screens/registration.screen';
import React from 'react';

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
