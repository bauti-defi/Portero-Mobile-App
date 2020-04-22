import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function AddButton(props) {
  return (
    <Button
      type="clear"
      icon={<Icon name="plus" size={24} color="black" />}
      onPress={props.onPress}
    />
  );
}

export default AddButton;
