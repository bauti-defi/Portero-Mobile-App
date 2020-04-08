import React, { useEffect } from 'react';
import { deleteToken } from '.././jwt.service';
import { useDispatch } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Action } from '../storage/dispatch.actions'
import InviteScreen from '../screens/invite.screen';

const Drawer = createDrawerNavigator();

function HomeNavigator({navigation}){

    

    return (
        <Drawer.Navigator 
        drawerContent={props => <DrawerContent {...props}/>}
        initialRouteName='invitation'
        >
            <Drawer.Screen name='invitation' component={InviteScreen} />
        </Drawer.Navigator>
    );
}


function DrawerContent(props){

    const dispatch = useDispatch()

    async function logOut(){
        await deleteToken()
        dispatch({type: Action.DELETE_COOKIE})
    }
    

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem 
            label='Salir'
            onPress={logOut}
            />
        </DrawerContentScrollView>
    );
}

export default HomeNavigator;
