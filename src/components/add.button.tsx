import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function AddButton({onPress}) {
  return (
    <Button
      type="clear"
      icon={<Icon name="plus" size={24} color="black" />}
      onPress={onPress}
    />
  );
}

export default AddButton;
