import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AccountInput from './account.input';
import DocumentationInput from './dni.input';
import NameInput from './name.input';

const Stack = createStackNavigator();

const axios = require('axios').default;

function RegistrtionScreen() {
  return (
    <Stack.Navigator initialRouteName="name" screenOptions={{headerLeft: null}}>
      <Stack.Screen
        name="name"
        component={NameInput}
        options={{title: 'Nombre'}}
      />
      <Stack.Screen
        name="dni"
        component={DocumentationInput}
        options={{title: 'Documentacion'}}
      />
      <Stack.Screen
        name="account"
        component={AccountInput}
        options={{title: 'Cuenta'}}
      />
    </Stack.Navigator>
  );
}

export const register = (payload, user_type: string) => {
  return axios({
    method: 'post',
    url: `http://192.168.0.101:3500/${user_type}/register`,
    data: payload,
  });
};

export default RegistrtionScreen;
