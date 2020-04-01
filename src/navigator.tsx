import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login.screen';
import RegistrtionScreen from './screens/registration/registration.screen';

const Stack = createStackNavigator();

function AppNavigator(){

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='login'>
                <Stack.Screen 
                name='login' 
                component={LoginScreen} 
                options={{title:'Ingresar'}} 
                />
                <Stack.Screen 
                name='register' 
                component={RegistrtionScreen} 
                options={{title:'Registrar'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;