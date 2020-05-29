import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createInvite} from '../../requests/invite.requests';

const validator = new Validator();

const CreateInviteScreen = () => {
  const [doc_id, setDoc] = useState('');
  const [docMessage, setDocMessage] = useState('');
  const [first_name, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [last_name, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');

  const create = () => {
    if (validator.isEmpty(first_name)) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name)) {
      setLastNameMessage('Apellido Vacio');
    } else if (validator.isEmpty(doc_id)) {
      setDocMessage('Documento Vacio');
    } else {
      createInvite();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          placeholder=" Nombre Completo"
          autoCapitalize="words"
          onChangeText={setFirstName}
          errorMessage={firstNameMessage}
          containerStyle={styles.input}
        />
        <Input
          placeholder=" Apellido"
          autoCapitalize="words"
          onChangeText={setLastName}
          errorMessage={lastNameMessage}
          containerStyle={styles.input}
        />
        <Input
          placeholder=" Numero de Documento"
          autoCapitalize="none"
          onChangeText={setDoc}
          errorMessage={docMessage}
          leftIcon={<Icon name="id-card" size={24} color="black" />}
        />
        <Button
          type="outline"
          icon={<Icon name="arrow-right" size={24} color="black" />}
          onPress={create}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  input: {
    paddingBottom: 30,
  },
});

export default CreateInviteScreen;
