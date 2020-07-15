import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../../components/home.drawer.content';
import UserHomeScreen from '../../screens/user/user.home.screen';
import UserQRScannerNavigator from './qr.scanner.navigator';

const Drawer = createDrawerNavigator();

const UserNavigator = () => {
  return (
    <Drawer.Navigator
      lazy={true}
      initialRouteName="Ayuda"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Ayuda" component={UserHomeScreen} />
      <Drawer.Screen
        name="Escanear QR"
        component={UserQRScannerNavigator}
        options={{unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
};

export default UserNavigator;
