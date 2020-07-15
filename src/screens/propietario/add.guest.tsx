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
  const [inputFocusIndex, setInputFocusIndex] = useState(0);

  const refContainer = [];

  const focusInput = (index: number) => refContainer[index].focus();

  const onAdd = () => {
    if (validator.isEmpty(first_name.trim())) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name.trim())) {
      setLastNameMessage('Apellido Vacio');
    } else if (validator.isEmpty(doc_id.trim())) {
      setDocMessage('Documento Vacio');
    } else {
      onAddGuest({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        doc_id: doc_id.trim(),
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
        blurOnSubmit={false}
        onSubmitEditing={() => focusInput(1)}
        containerStyle={styles.input}
        ref={(input) => (refContainer[0] = input)}
      />
      <Input
        placeholder=" Apellido"
        autoCapitalize="words"
        value={last_name}
        onChangeText={setLastName}
        errorMessage={lastNameMessage}
        onSubmitEditing={() => focusInput(2)}
        onFocus={() => setLastNameMessage('')}
        blurOnSubmit={false}
        containerStyle={styles.input}
        ref={(input) => (refContainer[1] = input)}
      />
      <Input
        placeholder=" Numero de Documento"
        autoCapitalize="none"
        onChangeText={setDoc}
        value={doc_id}
        errorMessage={docMessage}
        containerStyle={styles.input}
        onFocus={() => setDocMessage('')}
        blurOnSubmit={true}
        onSubmitEditing={onAdd}
        leftIcon={<Icon name="id-card" size={24} color="black" />}
        ref={(input) => (refContainer[2] = input)}
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
