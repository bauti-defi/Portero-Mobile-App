import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EmailInput from "./account.input";
import NameInput from "./name.input";
import DocumentationInput from './dni.input';


const Stack = createStackNavigator();

function RegistrtionScreen(){

    return (
        <Stack.Navigator initialRouteName='name' screenOptions={{headerLeft: null}}>
            <Stack.Screen name='name' component={NameInput} options={{title:'Nombre'}}/>
            <Stack.Screen name='dni' component={DocumentationInput} options={{title:'Documentacion'}}/>
            <Stack.Screen name='account' component={EmailInput} options={{title: 'Cuenta'}} />
        </Stack.Navigator>
    );
}



export default RegistrtionScreen;