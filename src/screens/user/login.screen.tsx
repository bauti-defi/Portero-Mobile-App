import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {login} from '../../requests/login.request';
import {saveCookie} from '../../secure.storage';
import {UserAction} from '../../storage/user.reducer';

const validator = new Validator();

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  function logIn() {
    if (!validator.isEmail(email) || validator.isEmpty(password)) {
      setMessage('Email o Contrasena invalidad');
    } else {
      login(email, password, email) //DeviceInfo.getMacAddressSync()
        .then((response) => response.data)
        .then((cookie) => {
          dispatch({type: UserAction.STORE_COOKIE, cookie});
          saveCookie(email, cookie);
        })
        .catch((error) => {
          console.log(error);
          setMessage(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder=" Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCapitalize="none"
          leftIcon={<Icon name="envelope" size={24} color="black" />}
          containerStyle={styles.input}
        />
        <Input
          placeholder=" Contrasena"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setPassword}
          errorMessage={message}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          containerStyle={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ingresar" type="clear" onPress={logIn} />
        <Button
          title="Registrar"
          type="clear"
          onPress={() => navigation.navigate('register')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 25,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    paddingBottom: 30,
  },
  inputContainer: {
    padding: 15,
    justifyContent: 'space-around',
  },
});

export default LoginScreen;
