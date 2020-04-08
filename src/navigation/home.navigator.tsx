import React, {useEffect} from 'react';
import {deleteToken} from '.././jwt.service';
import {useDispatch} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Action} from '../storage/dispatch.actions';
import MisLotesScreen from '../screens/mis.lotes.screen';
import HomeScreen from '../screens/home.screen';

const Drawer = createDrawerNavigator();

function HomeNavigator({navigation}) {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="home"
      >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Mis Lotes" component={MisLotesScreen} />
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
      <DrawerItem label="Salir" onPress={logOut} />
    </DrawerContentScrollView>
  );
}

export default HomeNavigator;
