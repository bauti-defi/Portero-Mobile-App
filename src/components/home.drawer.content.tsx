import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {useDispatch} from 'react-redux';
import {logOutUser} from '../actions/login.actions';

const DrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Salir"
        inactiveTintColor="red"
        onPress={() => dispatch(logOutUser())}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
