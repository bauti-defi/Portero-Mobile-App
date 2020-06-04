import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../../components/home.drawer.content';
import QRScannerNavigator from '../qr.scanner.navigator';
import ActivityFeedNavigator from './activity.feed.navigator';

const Drawer = createDrawerNavigator();

const GuardiaNavigator = () => {
  return (
    <Drawer.Navigator
      lazy={true}
      initialRouteName="Actividad"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Actividad" component={ActivityFeedNavigator} />
      <Drawer.Screen
        name="Escanear QR"
        component={QRScannerNavigator}
        options={{unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
};
export default GuardiaNavigator;
