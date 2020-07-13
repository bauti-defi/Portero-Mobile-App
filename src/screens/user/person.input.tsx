import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

const today = new Date();

const PersonInput = ({navigation}) => {
  const [first_name, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [last_name, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');
  const [doc_id, setDoc] = useState('');
  const [docMessage, setDocMessage] = useState('');
  const [datePickerData, setDatePickerData] = useState({
    show: false,
    date: today,
    style: {},
  });

  const refContainer = [];
  const focusInput = (index: number) => refContainer[index].focus();

  const next = () => {
    if (validator.isEmpty(first_name)) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name)) {
      setLastNameMessage('Apellido Vacio');
    } else if (validator.isEmpty(doc_id)) {
      setDocMessage('Documento Vacio');
    } else if (!validDate(datePickerData.date)) {
      setDatePickerData({...datePickerData, style: {color: 'red'}});
    } else {
      navigation.push('account', {
        payload: {
          first_name,
          last_name,
          doc_id,
          birth_date: datePickerData.date.toISOString(),
        },
      });
    }
  };

  const datePickerEvent = (e, date) => {
    if (date && validDate(date)) {
      setDatePickerData({date, show: false, style: {}});
    } else {
      setDatePickerData({date, show: false, style: {color: 'red'}});
    }
  };

  const validDate = (date: Date) =>
    today.getFullYear() - date.getFullYear() >= 6;

  const dateButtonTitle = () =>
    datePickerData.date !== today
      ? datePickerData.date.toDateString()
      : 'Fecha de Nacimiento';

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder=" Nombre Completo"
          autoCapitalize="words"
          onChangeText={setFirstName}
          blurOnSubmit={false}
          errorMessage={firstNameMessage}
          containerStyle={styles.input}
          onSubmitEditing={() => focusInput(1)}
          ref={(input) => (refContainer[0] = input)}
        />
        <Input
          placeholder=" Apellido"
          autoCapitalize="words"
          onChangeText={setLastName}
          blurOnSubmit={false}
          errorMessage={lastNameMessage}
          containerStyle={styles.input}
          onSubmitEditing={() => focusInput(2)}
          ref={(input) => (refContainer[1] = input)}
        />
        <Input
          placeholder=" Numero de Documento"
          autoCapitalize="none"
          onChangeText={setDoc}
          blurOnSubmit={false}
          errorMessage={docMessage}
          leftIcon={<Icon name="id-card" size={24} color="black" />}
          onSubmitEditing={() =>
            setDatePickerData({...datePickerData, show: true})
          }
          ref={(input) => (refContainer[2] = input)}
        />
      </View>
      {datePickerData.show ? (
        <RNDateTimePicker
          value={datePickerData.date}
          mode="date"
          display="spinner"
          onChange={datePickerEvent}
        />
      ) : (
        <Button
          type="outline"
          titleStyle={datePickerData.style}
          title={dateButtonTitle()}
          onPress={(e) => setDatePickerData({...datePickerData, show: true})}
        />
      )}
      <Button
        type="outline"
        icon={<Icon name="arrow-right" size={24} color="black" />}
        onPress={next}
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
    paddingBottom: 30,
  },
});

export default PersonInput;
