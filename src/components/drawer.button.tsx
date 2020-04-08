import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import React from 'react'

function DrawerButton({navigation}) {
  return (
    <Button
      type="clear"
      icon={<Icon name="user-circle" size={24} color="black" />}
      onPress={navigation.toggleDrawer}
    />
  );
}

export default DrawerButton;
