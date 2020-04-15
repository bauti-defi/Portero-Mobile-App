import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteToken} from '.././jwt.service';
import LotesNavigator from '../navigation/lotes.navigator';
import InviteNavigator from '../screens/invite.screen';
import QRScannerScreen from '../screens/qr.scanner.screen';
import {Action} from '../storage/dispatch.actions';

const Drawer = createDrawerNavigator();

function HomeNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Invitaciones">
      <Drawer.Screen name="Invitaciones" component={InviteNavigator} />
      <Drawer.Screen name="Lotes" component={LotesNavigator} />
      <Drawer.Screen name="Escanear QR" component={QRScannerScreen} />
    </Drawer.Navigator>
  );
}

function DrawerContent(props) {
  const dispatch = useDispatch();

  async function logOut() {
    await deleteToken();
    dispatch({type: Action.DELETE_COOKIE});
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Salir" inactiveTintColor="red" onPress={logOut} />
    </DrawerContentScrollView>
  );
}

export default HomeNavigator;
