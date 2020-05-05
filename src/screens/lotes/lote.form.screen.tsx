import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

const LoteFormScreen = ({navigation, route}) => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  function next() {
    if (validator.isEmpty(nickname)) {
      setMessage('Sobrenombre invalido!');
    } else {
      navigation.navigate('Add Lote Feedback', {
        nickname,
        ...route.params,
      });
    }
  }

  return (
    <React.Fragment>
      <Input
        placeholder=" Sobrenombre de Lote"
        autoCapitalize="words"
        errorMessage={message}
        onChangeText={setNickname}
      />
      <Button
        type="outline"
        onPress={next}
        icon={<Icon name="arrow-right" size={24} color="black" />}
      />
    </React.Fragment>
  );
};

export default LoteFormScreen;
