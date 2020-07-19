import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AccountInput from '../../screens/user/account.input';
import LoginScreen from '../../screens/user/login.screen';
import PersonInput from '../../screens/user/person.input';
import RegistrationFeedbackScreen from '../../screens/user/registration.feedback.screen';

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    //<DynamicModuleLoader modules={[LoginModule]}>
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{title: 'IngresoFacil'}}
      />
      <Stack.Screen
        name="register"
        component={PersonInput}
        options={{title: 'Registrar Cuenta'}}
      />
      <Stack.Screen
        name="account"
        component={AccountInput}
        options={{title: 'Registrar Cuenta'}}
      />
      <Stack.Screen
        name="registration feedback"
        component={RegistrationFeedbackScreen}
        options={{header: (props) => null}}
      />
    </Stack.Navigator>
    //</DynamicModuleLoader>
  );
};

export default LoginNavigator;
