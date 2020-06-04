import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {register} from '../../../requests/register.request';

const validator = new Validator();

function AccountInput({route, navigation}) {
  const {payload} = route.params;

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  function onRegister() {
    if (!validator.isEmail(email)) {
      setEmailMessage('Email Invalido');
    } else if (validator.isEmpty(password)) {
      setPasswordMessage('Contrasena Invalida');
    } else if (password !== confirmPassword) {
      setPasswordMessage('Contrasenas distintas');
    } else {
      setLoading(true);
      let body = {
        ...payload,
        email,
        password,
      };
      register(body)
        .then(() => {
          setLoading(false);
          navigation.navigate('login');
        })
        .catch((error) => {
          setLoading(false);
          console.log(`Login error: ${error}`);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder=" Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          errorMessage={emailMessage}
          leftIcon={<Icon name="envelope" size={24} color="black" />}
          containerStyle={styles.input}
        />
        <Input
          placeholder=" Contrasena"
          autoCapitalize="none"
          onChangeText={setPassword}
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          containerStyle={styles.input}
        />
        <Input
          placeholder=" Repetir Contrasena"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          errorMessage={passwordMessage}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          containerStyle={styles.input}
        />
      </View>
      <Button
        type="outline"
        title="Registrar"
        onPress={onRegister}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  input: {
    paddingBottom: 30,
  },
  inputContainer: {
    padding: 15,
    justifyContent: 'space-around',
  },
});

export default AccountInput;
