import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/home.drawer.content';

const Drawer = createDrawerNavigator();

const GuardiaNavigator = () => {
  return (
    <Drawer.Navigator
      lazy={true}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={null} />
    </Drawer.Navigator>
  );
};
export default GuardiaNavigator;
