import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {register} from '../../requests/register.request';

const validator = new Validator();

function AccountInput({route, navigation}) {
  const {payload} = route.params;

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  async function onRegister() {
    setLoading(true);
    if (!validator.isEmail(email)) {
      setEmailMessage('Email Invalido');
    } else if (validator.isEmpty(password)) {
      setPasswordMessage('Contrasena Invalida');
    } else if (password !== confirmPassword) {
      setPasswordMessage('Contrasenas distintas');
    } else {
      let body = {
        ...payload,
        email,
        password,
      };
      delete body.user_type;
      await register(body, payload.user_type).then(
        navigation.navigate('login'),
      );
    }
  }

  return (
    <View>
      <Input
        placeholder=" Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        errorMessage={emailMessage}
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />
      <Input
        placeholder=" Contrasena"
        autoCapitalize="none"
        onChangeText={setPassword}
        secureTextEntry={true}
        leftIcon={<Icon name="lock" size={24} color="black" />}
      />
      <Input
        placeholder=" Repetir Contrasena"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        errorMessage={passwordMessage}
        leftIcon={<Icon name="lock" size={24} color="black" />}
      />
      <Button
        type="outline"
        title="Registrar"
        onPress={onRegister}
        loading={isLoading}
      />
    </View>
  );
}

export default AccountInput;
