import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/home.drawer.content';
import InviteNavigator from './invite.navigator';
import LotesNavigator from './lotes.navigator';
import QRScannerNavigator from './qr.scanner.navigator';

const Drawer = createDrawerNavigator();

function UserNavigator() {
  return (
    <Drawer.Navigator
      lazy={true}
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Lotes">
      <Drawer.Screen name="Invitaciones" component={InviteNavigator} />
      <Drawer.Screen name="Lotes" component={LotesNavigator} />
      <Drawer.Screen name="Escanear QR" component={QRScannerNavigator} />
    </Drawer.Navigator>
  );
}

export default UserNavigator;
