import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

function LoteAssociationScreen({route, navigation}) {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  function scanQR() {
    if (validator.isEmpty(nickname)) {
      setMessage('Sobrenombre invalido!');
    } else {
      navigation.navigate('Lote QR Scanner', nickname);
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
        onPress={scanQR}
        icon={<Icon name="qrcode" size={24} color="black" />}
      />
    </React.Fragment>
  );
}

export default LoteAssociationScreen;
