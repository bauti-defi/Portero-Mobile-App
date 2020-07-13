import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {failedLogInUser, logInUser} from '../../actions/login.actions';
import {useLoginReducer} from '../../storage/app.selectors';

const validator = new Validator();

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {attempting, errorMessage} = useLoginReducer((state) => state);

  const refContainer = [];
  const focusInput = (index: number) => refContainer[index].focus();
  const dispatch = useDispatch();

  const logIn = () => {
    if (!validator.isEmail(email) || validator.isEmpty(password)) {
      dispatch(failedLogInUser('Email o Contrasena invalidad'));
    } else {
      dispatch(logInUser(email, password, email));
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
          errorMessage={errorMessage}
          blurOnSubmit={true}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          containerStyle={styles.input}
          onSubmitEditing={logIn}
          ref={(input) => (refContainer[1] = input)}
        />
        <Button
          title="Ingresar"
          type="clear"
          titleStyle={{fontSize: 28}}
          onPress={logIn}
          loading={attempting}
        />
      </View>
      <Button
        title="Registrar"
        type="clear"
        onPress={() => navigation.navigate('register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  input: {
    paddingBottom: 40,
  },
  inputContainer: {
    marginHorizontal: 15,
    justifyContent: 'space-around',
  },
});

export default LoginScreen;
