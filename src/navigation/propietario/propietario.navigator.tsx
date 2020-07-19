import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {DynamicModuleLoader} from 'redux-dynamic-modules';
import DrawerContent from '../../components/home.drawer.content';
import InviteModule from '../../storage/invite.module';
import LoteModule from '../../storage/lote.module';
import InviteNavigator from './invite.navigator';
import LotesNavigator from './lotes.navigator';
import PropietarioQRScannerNavigator from './qr.scanner.navigator';

const Drawer = createDrawerNavigator();

const PropietarioNavigator = () => {
  return (
    <DynamicModuleLoader modules={[LoteModule, InviteModule]}>
      <Drawer.Navigator
        lazy={true}
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Invitaciones">
        <Drawer.Screen name="Invitaciones" component={InviteNavigator} />
        <Drawer.Screen name="Lotes" component={LotesNavigator} />
        <Drawer.Screen
          name="Escanear QR"
          component={PropietarioQRScannerNavigator}
          options={{unmountOnBlur: true}}
        />
      </Drawer.Navigator>
    </DynamicModuleLoader>
  );
};

export default PropietarioNavigator;
