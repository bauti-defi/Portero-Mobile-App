import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteCookie} from '../secure.storage';
import {UserAction} from '../storage/user.reducer';

const DrawerContent = (props) => {
  const dispatch = useDispatch();

  const logOut = () => {
    deleteCookie();
    dispatch({type: UserAction.LOG_OUT});
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Salir" inactiveTintColor="red" onPress={logOut} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
