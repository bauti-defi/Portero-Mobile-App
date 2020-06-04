import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../../components/home.drawer.content';
import QRScannerNavigator from '../qr.scanner.navigator';
import InviteNavigator from './invite.navigator';
import LotesNavigator from './lotes.navigator';

const Drawer = createDrawerNavigator();

function PropietarioNavigator() {
  return (
    <Drawer.Navigator
      lazy={true}
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Invitaciones">
      <Drawer.Screen name="Invitaciones" component={InviteNavigator} />
      <Drawer.Screen name="Lotes" component={LotesNavigator} />
      <Drawer.Screen
        name="Escanear QR"
        component={QRScannerNavigator}
        options={{unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
}

export default PropietarioNavigator;
