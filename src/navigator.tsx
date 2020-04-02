import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/login.screen';
import RegistrtionScreen from './screens/registration/registration.screen';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}

export default AppNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaea',
        fontWeight: 'bold',
    },
    title: {
        marginTop: 1,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
