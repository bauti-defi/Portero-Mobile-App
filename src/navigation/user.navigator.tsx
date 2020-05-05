import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {useDispatch} from 'react-redux';
import InviteNavigator from '../screens/invite.screen';
import {deleteCookie} from '../secure.storage';
import {UserAction} from '../storage/user.reducer';
import LotesNavigator from './lotes.navigator';
import QRScannerNavigator from './qr.scanner.navigator';

const Drawer = createDrawerNavigator();

function UserNavigator() {
  return (
    <Drawer.Navigator
      lazy={true}
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Invitaciones">
      <Drawer.Screen name="Invitaciones" component={InviteNavigator} />
      <Drawer.Screen name="Lotes" component={LotesNavigator} />
      <Drawer.Screen name="Escanear QR" component={QRScannerNavigator} />
    </Drawer.Navigator>
  );
}

function DrawerContent(props) {
  const dispatch = useDispatch();

  function logOut() {
    deleteCookie();
    dispatch({type: UserAction.LOG_OUT});
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Salir" inactiveTintColor="red" onPress={logOut} />
    </DrawerContentScrollView>
  );
}

export default UserNavigator;
