import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NameInput from '../components/name.input';
import DocumentationInput from '../components/dni.input';
import AccountInput from '../components/account.input';

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

export const register = (payload) => {
  return axios({
    method: 'post',
    url: `http://192.168.0.88:3500/${payload.user_type}/register`,
    data: payload,
  });
};

export default RegistrtionScreen;
