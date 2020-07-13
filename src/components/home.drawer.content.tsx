import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteCredentials} from '../secure.storage';
import {LoginAction} from '../storage/storage.actions';

const DrawerContent = (props) => {
  const dispatch = useDispatch();

  const logOut = () => {
    deleteCredentials();
    dispatch({type: LoginAction.LOG_OUT});
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Salir" inactiveTintColor="red" onPress={logOut} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
