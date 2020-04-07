import React, { useEffect } from 'react';
import { deleteToken } from '.././jwt.service';
import { useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Action } from '../storage/dispatch.actions'
import InviteScreen from '../screens/invite.screen';

const Drawer = createDrawerNavigator();

function HomeNavigator({navigation}){

    const dispatch = useDispatch()

    async function logOut(){
        await deleteToken()
        dispatch({type: Action.DELETE_COOKIE})
    }
    

    return (
        <Drawer.Navigator initialRouteName='invitation'>
            <Drawer.Screen name='invitation' component={InviteScreen} />
        </Drawer.Navigator>
    );
}

export default HomeNavigator;
