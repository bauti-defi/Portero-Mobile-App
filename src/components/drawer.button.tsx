import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function DrawerButton() {
  const navigation = useNavigation();

  return (
    <Button
      type="clear"
      icon={<Icon name="user-circle" size={24} color="black" />}
      onPress={navigation.openDrawer}
    />
  );
}

export default DrawerButton;
