import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {login} from '../../requests/login.request';
import {saveCredentials} from '../../secure.storage';
import {UserAction} from '../../storage/storage.actions';

const validator = new Validator();

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const refContainer = [];

  const focusInput = (index: number) => refContainer[index].focus();

  const dispatch = useDispatch();

  const logIn = () => {
    if (!validator.isEmail(email) || validator.isEmpty(password)) {
      setMessage('Email o Contrasena invalidad');
    } else {
      setLoading(true);
      login(email, password, email) //deviceId should be DeviceInfo.getMacAddressSync()
        .then((response) => response.data)
        .then((data) => {
          dispatch(saveUserToDevice(data));
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setMessage(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder=" Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          blurOnSubmit={false}
          autoCapitalize="none"
          leftIcon={<Icon name="envelope" size={24} color="black" />}
          containerStyle={styles.input}
          onSubmitEditing={() => focusInput(1)}
          ref={(input) => (refContainer[0] = input)}
        />
        <Input
          placeholder=" Contrasena"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setPassword}
          errorMessage={message}
          blurOnSubmit={false}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          containerStyle={styles.input}
          onSubmitEditing={logIn}
          ref={(input) => (refContainer[1] = input)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Ingresar"
          type="clear"
          onPress={logIn}
          loading={loading}
        />
        <Button
          title="Registrar"
          type="clear"
          onPress={() => navigation.navigate('register')}
        />
      </View>
    </View>
  );
}

const saveUserToDevice = (data) => (dispatch) => {
  return saveCredentials(data.user.email, data.token).then(() =>
    dispatch({type: UserAction.LOG_IN, data}),
  );
};

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
