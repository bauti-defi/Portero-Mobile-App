import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

const AddGuestCard = ({onAddGuest}) => {
  const [doc_id, setDoc] = useState('');
  const [docMessage, setDocMessage] = useState('');
  const [first_name, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [last_name, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');

  const onAdd = () => {
    if (validator.isEmpty(first_name)) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name)) {
      setLastNameMessage('Apellido Vacio');
    } else if (validator.isEmpty(doc_id)) {
      setDocMessage('Documento Vacio');
    } else {
      onAddGuest({
        first_name,
        last_name,
        doc_id,
      });

      reset();
    }
  };

  const reset = () => {
    setFirstName('');
    setFirstNameMessage('');
    setLastName('');
    setLastNameMessage('');
    setDoc('');
    setDocMessage('');
  };

  return (
    <View style={styles.addGuestContainer}>
      <Input
        placeholder=" Nombre Completo"
        autoCapitalize="words"
        onChangeText={setFirstName}
        value={first_name}
        onFocus={() => setFirstNameMessage('')}
        errorMessage={firstNameMessage}
        containerStyle={styles.input}
      />
      <Input
        placeholder=" Apellido"
        autoCapitalize="words"
        value={last_name}
        onChangeText={setLastName}
        errorMessage={lastNameMessage}
        onFocus={() => setLastNameMessage('')}
        containerStyle={styles.input}
      />
      <Input
        placeholder=" Numero de Documento"
        autoCapitalize="none"
        onChangeText={setDoc}
        value={doc_id}
        errorMessage={docMessage}
        containerStyle={styles.input}
        onFocus={() => setDocMessage('')}
        leftIcon={<Icon name="id-card" size={24} color="black" />}
      />
      <Button
        containerStyle={styles.addButtonContainer}
        type="clear"
        title="Agregar"
        onPress={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addGuestContainer: {
    width: '94%',
    //elevation: 2,
    //borderRadius: 2,
    margin: '3%',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonContainer: {paddingBottom: 10},
  dateContainer: {
    margin: 20,
    alignItems: 'center',
  },
});

export default AddGuestCard;
