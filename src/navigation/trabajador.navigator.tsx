import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteCookie} from '../secure.storage';
import {UserAction} from '../storage/user.reducer';

const Drawer = createDrawerNavigator();

const TrabajadorNavigator = () => {
  return (
    <Drawer.Navigator lazy={true} drawerContent={DrawerContent}>
      <Drawer.Screen name="Root" component={null} />
    </Drawer.Navigator>
  );
};

function DrawerContent(props) {
  const dispatch = useDispatch();

  async function logOut() {
    await deleteCookie();
    dispatch({type: UserAction.LOG_OUT});
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Salir" inactiveTintColor="red" onPress={logOut} />
    </DrawerContentScrollView>
  );
}

export default TrabajadorNavigator;
