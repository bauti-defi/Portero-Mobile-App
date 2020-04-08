import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function CreateInviteButton({navigation}) {
  return (
    <Button
      type="clear"
      icon={<Icon name="edit" size={24} color="black" />}
      onPress={() => navigation.navigate('Crear Invitacion')}
    />
  );
}

export default CreateInviteButton;
