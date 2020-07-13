import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

const PropietarioFormScreen = ({navigation, route}) => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  function next() {
    if (validator.isEmpty(nickname)) {
      setMessage('Sobrenombre invalido!');
    } else {
      navigation.navigate('Propietario Registration Feedback', {
        nickname,
        ...route.params,
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder=" Sobrenombre de Lote"
          autoCapitalize="words"
          errorMessage={message}
          onChangeText={setNickname}
        />
      </View>
      <Button
        type="outline"
        onPress={next}
        containerStyle={styles.button}
        icon={<Icon name="arrow-right" size={24} color="black" />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 50,
  },
  inputContainer: {
    paddingBottom: 40,
  },
});

export default PropietarioFormScreen;
