import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/login.screen';
import RegistrtionScreen from './screens/registration/registration.screen';
import {StyleSheet, View} from 'react-native';
import LandingScreen from './screens/landing.screen';
import HomeScreen from './screens/home.screen';
import { getToken, hasToken } from './jwt.service';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Action } from './storage/dispatch.actions';
import {createSelector} from 'reselect'
import { useRootSelector } from './storage/root.reducer';

const Stack = createStackNavigator();

function AppNavigator() {

    const [loading, setLoading] = useState(true)
    const token = useRootSelector(state => state.rootReducer.token)
    const dispatch = useDispatch()

    useEffect(() =>  {
        getToken().then(response => {
            if(response){
                dispatch({type: Action.STORE_TOKEN, token: response.password})
            }
        })
        setLoading(false)
    })

  if(loading){
    return <LandingScreen />
  }

  const initialRoute = token ? 'home': 'login'
  console.log(token)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                {token? (
                <Stack.Screen 
                    name='home'
                    component={HomeScreen}
                    options={{title:'IngresoFacil'}}
                />
               ) : (
                <>
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
                </>
                )}
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
