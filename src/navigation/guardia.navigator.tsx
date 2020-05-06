import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/home.drawer.content';
import GuardiaScreen from '../screens/guarida/guardia.screen';

const Drawer = createDrawerNavigator();

const GuardiaNavigator = () => {
  return (
    <Drawer.Navigator
      lazy={true}
      initialRouteName="Root"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={GuardiaScreen} />
    </Drawer.Navigator>
  );
};
export default GuardiaNavigator;
