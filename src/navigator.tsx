import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login.screen';

const Stack = createStackNavigator();

function AppNavigator(){

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Ingresar'>
                <Stack.Screen name='Ingresar' component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;